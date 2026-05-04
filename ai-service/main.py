from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
import os
import logging
import tempfile
from pathlib import Path

from services.ocr_processor import OCRProcessor
from services.civic_schema import validate_and_correct, create_fail_safe_output, generate_civic_issue_id
from services.firebase_service import FirebaseService

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "API is running 🚀"}

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RELIX AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:3500", "https://relix-6218b.firebaseapp.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Initialize services
ocr_processor = OCRProcessor(api_key=os.getenv("GOOGLE_AI_STUDIO_API_KEY"))
firebase_service = FirebaseService()

app = FastAPI(
    docs_url="/docs",
    redoc_url=None
)

from fastapi.openapi.docs import get_redoc_html

@app.get("/redoc", include_in_schema=False)
def custom_redoc():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title="RELIX API Docs",
        redoc_js_url="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
    )


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "OK",
        "service": "RELIX AI OCR/LLM",
        "firebase_initialized": firebase_service.initialized,
    }


@app.post("/api/ai/process")
async def process_document(file: UploadFile = File(...)):
    """
    Process a civic issue image and extract structured JSON data.
    
    Endpoint for uploading images with civic issue reports.
    Returns structured civic issue data ready for Firestore.
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error": "Only image files allowed (JPG, PNG, GIF, WebP)",
            },
        )

    # Validate file size (10MB limit)
    file_size = 0
    max_size = 10 * 1024 * 1024  # 10MB

    try:
        # Save file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as tmp:
            content = await file.read()
            file_size = len(content)

            if file_size > max_size:
                raise HTTPException(
                    status_code=413,
                    detail={
                        "success": False,
                        "error": f"File size {file_size} bytes exceeds 10MB limit",
                    },
                )

            tmp.write(content)
            tmp_path = tmp.name

        # Process image with Claude Vision API
        logger.info(f"Processing image: {file.filename} ({file_size} bytes)")
        structured_data, success = ocr_processor.process_image(tmp_path)

        # Clean up temp file
        try:
            Path(tmp_path).unlink()
        except Exception as e:
            logger.warning(f"Failed to delete temp file: {e}")

        if not success:
            logger.error("Claude Vision API processing failed")
            return JSONResponse(
                status_code=502,
                content={
                    "success": False,
                    "error": "AI service failed to process image",
                },
            )

        # Validate and correct structured data
        from datetime import datetime
        current_date = datetime.utcnow().strftime("%Y-%m-%d")
        
        validated_data, is_valid = validate_and_correct(structured_data)

        if not is_valid:
            # Use fail-safe output
            logger.warning("Validation failed, using fail-safe output")
            validated_data = create_fail_safe_output(current_date)

        # Ensure issue_id is present
        if not validated_data.get("issue_id"):
            validated_data["issue_id"] = generate_civic_issue_id()

        # Store in Firestore if initialized
        doc_id = None
        if firebase_service.initialized:
            doc_id = firebase_service.store_civic_issue(
                validated_data, gcs_uri=None
            )
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
                    "extraction_confidence": validated_data.get("_meta", {}).get(
                        "extraction_confidence"
                    ),
                    "fail_safe_triggered": validated_data.get("_meta", {}).get(
                        "fail_safe_triggered"
                    ),
                },
                "full_data": validated_data,
            },
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing document: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": f"Server error: {str(e)}",
            },
        )


@app.post("/api/ai/process-ocr-text")
async def process_ocr_text(request: dict):
    """
    Process raw OCR text from another OCR service.
    
    Endpoint for processing pre-OCR'd text (e.g., from Google Vision).
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

        if not success:
            logger.error("OCR text processing failed")
            return JSONResponse(
                status_code=502,
                content={
                    "success": False,
                    "error": "AI service failed to structure OCR text",
                },
            )

        # Validate and correct
        from datetime import datetime
        current_date = datetime.utcnow().strftime("%Y-%m-%d")
        validated_data, is_valid = validate_and_correct(structured_data)

        if not is_valid:
            logger.warning("Validation failed, using fail-safe output")
            validated_data = create_fail_safe_output(current_date)

        # Ensure issue_id is present
        if not validated_data.get("issue_id"):
            validated_data["issue_id"] = generate_civic_issue_id()

        # Store in Firestore
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
                    "extraction_confidence": validated_data.get("_meta", {}).get(
                        "extraction_confidence"
                    ),
                },
                "full_data": validated_data,
            },
        )

    except Exception as e:
        logger.error(f"Error processing OCR text: {e}")
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )


@app.get("/api/ai/issue/{issue_id}")
async def get_issue(issue_id: str):
    """Retrieve a stored civic issue by ID."""
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

        return JSONResponse(
            status_code=200,
            content={"success": True, "data": issue},
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving issue: {e}")
        raise HTTPException(
            status_code=500,
            detail={"success": False, "error": str(e)},
        )


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
            content={
                "success": True,
                "count": len(issues),
                "data": issues,
            },
        )

    except Exception as e:
        logger.error(f"Error querying issues: {e}")
        raise HTTPException(
            status_code=500,
            detail={"success": False, "error": str(e)},
        )


@app.get("/")
def root():
    return {"message": "API running 🚀"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, timeout_keep_alive=10)
