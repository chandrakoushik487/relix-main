"""
RELIX AI Service — FastAPI entry point
Loads .env before any Google SDK initialization to prevent ADC errors.
"""

import logging
import os
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Optional

# ── 1. Load .env FIRST — before any google-* import ──────────────────────────
from dotenv import load_dotenv

# Resolve .env relative to this file so it works regardless of cwd
_ENV_PATH = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH, override=True)

# ── 2. Now import Google-dependent services ───────────────────────────────────
from fastapi import BackgroundTasks, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from fastapi.responses import JSONResponse

from services.civic_schema import (
    create_fail_safe_output,
    generate_civic_issue_id,
    validate_and_correct,
)
from services.firebase_service import FirebaseService
from services.ocr_processor import OCRProcessor

# ── 3. Configure logging ──────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# ── 4. Single FastAPI instance ────────────────────────────────────────────────
app = FastAPI(
    title="RELIX AI Service",
    description="OCR + LLM pipeline for civic issue extraction",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",
        "http://localhost:3500",
        "https://relix-6218b.firebaseapp.com",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── 5. Initialize services once at startup ───────────────────────────────────
ocr_processor = OCRProcessor(api_key=os.getenv("GOOGLE_AI_STUDIO_API_KEY"))
firebase_service = FirebaseService()


# ── 6. Custom ReDoc ───────────────────────────────────────────────────────────
@app.get("/redoc", include_in_schema=False)
def custom_redoc():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title="RELIX API Docs",
        redoc_js_url="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js",
    )


# ── 7. Health check ───────────────────────────────────────────────────────────
@app.get("/")
@app.get("/health")
def health_check():
    """Health check — reports service readiness."""
    return {
        "status": "OK",
        "service": "RELIX AI OCR/LLM",
        "firebase_initialized": firebase_service.initialized,
        "ocr_api_key_set": bool(os.getenv("GOOGLE_AI_STUDIO_API_KEY")),
    }


# ── 8. Process image endpoint ─────────────────────────────────────────────────
@app.post("/api/ai/process")
async def process_document(file: UploadFile = File(...)):
    """
    Process a civic issue image and extract structured JSON data.
    Supports JPG, PNG, GIF, WebP. Max 10 MB.
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail={"success": False, "error": "Only image files allowed (JPG, PNG, GIF, WebP)"},
        )

    max_size = 10 * 1024 * 1024  # 10 MB

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename or "upload.tmp").suffix) as tmp:
            content = await file.read()
            file_size = len(content)

            if file_size > max_size:
                raise HTTPException(
                    status_code=413,
                    detail={"success": False, "error": f"File {file_size} bytes exceeds 10 MB limit"},
                )

            tmp.write(content)
            tmp_path = tmp.name

        logger.info(f"Processing image: {file.filename} ({file_size} bytes)")
        structured_data, success = ocr_processor.process_image(tmp_path)

        try:
            Path(tmp_path).unlink()
        except Exception as cleanup_err:
            logger.warning(f"Temp file cleanup failed: {cleanup_err}")

        current_date = datetime.utcnow().strftime("%Y-%m-%d")

        if not success:
            logger.warning("OCR API failed — returning fail-safe output")
            validated_data = create_fail_safe_output(current_date)
        else:
            validated_data, is_valid = validate_and_correct(structured_data)
            if not is_valid:
                logger.warning("Schema validation failed — using fail-safe output")
                validated_data = create_fail_safe_output(current_date)

        if not validated_data.get("issue_id"):
            validated_data["issue_id"] = generate_civic_issue_id()

        doc_id = None
        if firebase_service.initialized:
            doc_id = firebase_service.store_civic_issue(validated_data, gcs_uri=None)
            if doc_id:
                logger.info(f"Civic issue stored in Firestore: {doc_id}")

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": {
                    "issue_id": validated_data.get("issue_id"),
                    "firestoreId": doc_id,
                    "problem_type": validated_data.get("problem_type"),
                    "urgency_level": validated_data.get("urgency_level"),
                    "area": validated_data.get("area"),
                    "extraction_confidence": validated_data.get("_meta", {}).get("extraction_confidence"),
                    "fail_safe_triggered": validated_data.get("_meta", {}).get("fail_safe_triggered"),
                },
                "full_data": validated_data,
            },
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing document: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": f"Server error: {str(e)}"},
        )


# ── 9. Process pre-OCR'd text endpoint ───────────────────────────────────────
@app.post("/api/ai/process-ocr-text")
async def process_ocr_text(request: dict):
    """
    Process raw OCR text from another OCR service (e.g. Google Vision).
    Body: { "ocr_text": "..." }
    """
    ocr_text = request.get("ocr_text", "").strip()

    if not ocr_text:
        raise HTTPException(
            status_code=400,
            detail={"success": False, "error": "ocr_text is required"},
        )

    try:
        logger.info(f"Processing OCR text ({len(ocr_text)} chars)")
        structured_data, success = ocr_processor.process_ocr_text(ocr_text)

        current_date = datetime.utcnow().strftime("%Y-%m-%d")

        if not success:
            logger.warning("OCR text processing failed — returning fail-safe output")
            validated_data = create_fail_safe_output(current_date)
        else:
            validated_data, is_valid = validate_and_correct(structured_data)
            if not is_valid:
                logger.warning("Validation failed — using fail-safe output")
                validated_data = create_fail_safe_output(current_date)

        if not validated_data.get("issue_id"):
            validated_data["issue_id"] = generate_civic_issue_id()

        doc_id = None
        if firebase_service.initialized:
            doc_id = firebase_service.store_civic_issue(validated_data)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": {
                    "issue_id": validated_data.get("issue_id"),
                    "firestoreId": doc_id,
                    "problem_type": validated_data.get("problem_type"),
                    "urgency_level": validated_data.get("urgency_level"),
                    "area": validated_data.get("area"),
                    "extraction_confidence": validated_data.get("_meta", {}).get("extraction_confidence"),
                },
                "full_data": validated_data,
            },
        )

    except Exception as e:
        logger.error(f"Error processing OCR text: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )


# ── 10. Firestore retrieval endpoints ─────────────────────────────────────────
@app.get("/api/ai/issue/{issue_id}")
async def get_issue(issue_id: str):
    """Retrieve a stored civic issue by Firestore document ID."""
    if not firebase_service.initialized:
        raise HTTPException(
            status_code=503,
            detail={"success": False, "error": "Firebase not initialized"},
        )

    try:
        issue = firebase_service.get_civic_issue(issue_id)
        if not issue:
            raise HTTPException(
                status_code=404,
                detail={"success": False, "error": f"Issue {issue_id} not found"},
            )
        return JSONResponse(status_code=200, content={"success": True, "data": issue})

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving issue: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail={"success": False, "error": str(e)})


@app.get("/api/ai/issues")
async def list_issues(
    problem_type: Optional[str] = None,
    urgency_level: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 50,
):
    """Query civic issues with optional filters."""
    if not firebase_service.initialized:
        raise HTTPException(
            status_code=503,
            detail={"success": False, "error": "Firebase not initialized"},
        )

    try:
        issues = firebase_service.query_civic_issues(
            problem_type=problem_type,
            urgency_level=urgency_level,
            status=status,
            limit=limit,
        )
        return JSONResponse(
            status_code=200,
            content={"success": True, "count": len(issues), "data": issues},
        )

    except Exception as e:
        logger.error(f"Error querying issues: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail={"success": False, "error": str(e)})


# ── 11. Dev entrypoint ────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, timeout_keep_alive=10)
