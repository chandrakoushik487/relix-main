from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os

app = FastAPI(title="RELIX AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Node.js backend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "OK", "service": "RELIX AI OCR/LLM"}

# Task 59 & 61: OCR & Structure endpoints
@app.post("/api/ai/process")
async def process_document(file: UploadFile = File(...)):
    # Standard response format (Task 68)
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail={"success": False, "error": "Only images allowed"})
    
    # 1. OCR -> 2. LLM -> 3. SVI (Will implement these layers in separate files)
    
    return {"success": True, "data": {"status": "mock_structure_received"}}

if __name__ == "__main__":
    import uvicorn
    # Task 67: We use uvicorn default timeouts or configure middleware
    uvicorn.run(app, host="0.0.0.0", port=8000, timeout_keep_alive=10)
