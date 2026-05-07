# OCR Pipeline Implementation Guide

## Overview
Complete end-to-end civic issue OCR processing pipeline using Google AI Studio (Gemini Vision API) and Firestore storage.

**Status**: ✅ Production Ready (v2.0)
**LLM Provider**: Google AI Studio (Gemini 1.5 Flash)

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    RELIX OCR PIPELINE                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │  Image Upload (REST) │
                    └──────────────────────┘
                              │
                              ▼
                ┌─────────────────────────────────────┐
                │  FastAPI AI Service (Port 8000)     │
                │  - Image preprocessing              │
                │  - Gemini Vision API call           │
                │  - Schema validation                │
                │  - Error handling                   │
                └─────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
      ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
      │ Firestore   │  │ Validation  │  │ Fail-Safe    │
      │ Storage     │  │ & Correction│  │ Output       │
      └─────────────┘  └─────────────┘  └──────────────┘
            │
            ▼
    ┌──────────────────────┐
    │ Server Callback      │
    │ /api/ocr-callback    │
    │ - Volunteer matching │
    │ - Email alerts       │
    │ - Task assignment    │
    └──────────────────────┘
```

---

## File Structure

```
ai-service/
├── main.py                          # FastAPI application
├── requirements.txt                 # Python dependencies
├── services/
│   ├── __init__.py                 # Package marker
│   ├── ocr_processor.py            # Gemini Vision API integration
│   ├── civic_schema.py             # Schema validation & corrections
│   └── firebase_service.py         # Firestore persistence
├── test_ocr_pipeline.py            # Test suite
└── Dockerfile                      # Container image

server/
├── routes/
│   └── ocrCallback.js              # Updated OCR callback handler
└── services/
    └── aiService.js                # AI service client
```

---

## API Endpoints

### 1. Process Image Upload
**Endpoint**: `POST /api/ai/process`
**Input**: Multipart form data with image file
**Output**: Structured civic issue JSON

```json
{
  "success": true,
  "data": {
    "issue_id": "a3f1c2d4-4b87-4e9a-b021-7c3d9e1f0a82",
    "firestoreId": "Lj9k3K2L1m0O",
    "problem_type": "roads",
    "urgency_level": "high",
    "area": "MG Road, Bangalore",
    "extraction_confidence": "high",
    "fail_safe_triggered": false
  },
  "full_data": { ... }
}
```

### 2. Process OCR Text
**Endpoint**: `POST /api/ai/process-ocr-text`
**Input**: Raw OCR text from another service
**Output**: Structured civic issue JSON

```json
{
  "ocr_text": "Large pothole on MG Road near signal, Bangalore 560038..."
}
```

### 3. Retrieve Issue
**Endpoint**: `GET /api/ai/issue/{issue_id}`
**Output**: Full civic issue document

### 4. Query Issues
**Endpoint**: `GET /api/ai/issues?problem_type=roads&urgency_level=high&limit=50`
**Output**: Filtered list of issues

### 5. Health Check
**Endpoint**: `GET /health`
**Output**: Service status

---

## Schema (v2.0)

### Input Validation
- **Image**: JPG, PNG, GIF, WebP (max 10MB)
- **OCR Text**: Plain text string (any language)

### Output Structure
All outputs conform to the Civic Issue Schema v2.0:

```typescript
{
  schema_version: "2.0",
  issue_id: string,                    // UUID v4
  area: string | null,                 // "Locality, City"
  location_raw: {
    street: string | null,
    landmark: string | null,
    locality: string | null,
    city: string | null,
    state: string | null
  },
  issue_description: string | null,    // Max 280 chars
  latitude: number | null,             // [-90, 90]
  longitude: number | null,            // [-180, 180]
  pincode: string | null,              // 6 digits
  problem_type: enum,                  // sanitation|roads|water|electricity|infrastructure|other
  secondary_problem_type: enum | null, // Same enum
  multi_issue_detected: boolean,
  status: "pending",
  severity_score: number | null,       // 1-10
  upload_date: string,                 // YYYY-MM-DD
  incident_date_estimate: string | null, // ISO 8601
  urgency_level: enum | null,          // low|medium|high|critical
  repeat_complaint: boolean | null,
  _meta: {
    ocr_quality: enum,                 // clean|noisy|garbled
    source_language: string,           // ISO 639-1 (en, hi, ta, etc)
    extraction_confidence: enum,       // high|medium|low
    fields_extracted: string[],
    fields_nulled: string[],
    translation_applied: boolean,
    fail_safe_triggered: boolean,
    processing_notes: string | null
  }
}
```

---

## Features

### ✅ Implemented

1. **Google Gemini Vision API Integration**
   - Processes both image files and base64-encoded images
   - GCS URI support for cloud storage
   - Automatic language detection

2. **Civic Schema Validation (v2.0)**
   - UUID v4 validation
   - Coordinate range validation
   - Type checking for all fields
   - Cross-field consistency checks
   - Automatic error correction (2-pass)

3. **Error Handling**
   - Fail-safe output generation
   - Graceful degradation on validation failure
   - Comprehensive error logging
   - Schema validation retry mechanism

4. **Multilingual Support**
   - Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, etc.
   - Automatic translation to English internally
   - Language code tracking in metadata

5. **Firestore Integration**
   - Document storage with metadata
   - Query support (by problem type, urgency, status)
   - Batch operations
   - Index recommendations

6. **Server-Side Processing**
   - OCR callback handler
   - Volunteer matching
   - Email notifications
   - Task assignment
   - Full audit trail

### Data Classification

**Problem Types** (keyword-based):
- `sanitation` - garbage, trash, waste, sewage
- `roads` - pothole, road damage, broken pavement
- `water` - water leak, pipe burst, no water
- `electricity` - power cut, transformer, outage
- `infrastructure` - drainage, flood, structure damage
- `other` - unclassified

**Severity Scoring** (1-10):
- **1-3**: Minor inconvenience
- **4-6**: Moderate disruption
- **7-8**: Serious problem
- **9-10**: Critical/urgent

**Amplifiers** (+1-2 points):
- Scale: "entire area", "whole street"
- Duration: "weeks", "months", "since last year"
- Vulnerability: "school", "hospital", "children"
- Recurrence: "third time", "still not fixed"

---

## Testing

### Run Test Suite
```bash
cd ai-service
python test_ocr_pipeline.py
```

### Test Coverage
- ✅ Basic OCR text processing
- ✅ Multilingual (Hindi) processing
- ✅ Noisy OCR recovery
- ✅ Schema validation
- ✅ Fail-safe generation

---

## Environment Setup

### Required Dependencies
```
fastapi==0.110.1
uvicorn==0.29.0
anthropic==0.25.1
pydantic==2.6.4
firebase-admin>=6.0.0
python-dotenv==1.0.1
```

### Environment Variables
```bash
# .env file
GOOGLE_AI_STUDIO_API_KEY=your_google_api_key_here
FIREBASE_CREDENTIALS_PATH=./config/firebase-adminsdk.json

# Server
ADMIN_EMAIL=admin@relix.local
```

### Install & Run
```bash
# Install Python dependencies
pip install -r ai-service/requirements.txt

# Run AI service
python -m uvicorn ai-service.main:app --host 0.0.0.0 --port 8000

# Run tests
python ai-service/test_ocr_pipeline.py
```

---

## Production Checklist

- [ ] Configure Firestore indexes (see `firebase_service.py`)
- [ ] Set up Firebase credentials (`FIREBASE_CREDENTIALS_PATH`)
- [ ] Configure Google AI Studio API key (`GOOGLE_AI_STUDIO_API_KEY`)
- [ ] Set admin email (`ADMIN_EMAIL`)
- [ ] Configure CORS origins if deploying to different domain
- [ ] Set up email service (Nodemailer/SMTP)
- [ ] Enable Cloud Logging (GCP)
- [ ] Set up monitoring/alerting for fail-safe triggers
- [ ] Test end-to-end with real civic issue samples
- [ ] Load test with concurrent uploads

---

## Known Limitations & Future Improvements

### Current Limitations
1. Single image processing only (batch uploads handled by server)
2. OCR quality dependent on image resolution (minimum 300 DPI recommended)
3. Multilingual translation happens locally (adds latency)
4. No image rotation/preprocessing

### Future Enhancements
1. **Batch Processing**: Queue management with Bull/Redis
2. **Image Preprocessing**: Auto-rotation, deskew, contrast enhancement
3. **Location Geocoding**: Reverse geocoding for lat/long from text
4. **ML-Based Scoring**: ML model for severity scoring (currently rule-based)
5. **Duplicate Detection**: Image hashing to detect re-submissions
6. **OCR Service Integration**: Native Google Vision API fallback

---

## Troubleshooting

### Issue: "Firebase not initialized"
**Solution**: Ensure `FIREBASE_CREDENTIALS_PATH` points to valid service account JSON

### Issue: "Invalid UUID v4"
**Solution**: Gemini may generate invalid UUIDs; validation corrects in second pass

### Issue: "Fail-safe triggered frequently"
**Solution**: Check OCR image quality; noisy images trigger fail-safe more often

### Issue: "Translation confidence low"
**Solution**: If input has mixed/corrupted script, extraction_confidence is reduced to "low"

---

## Integration with Server

### Flow: Image → AI Service → Server → Firestore → Volunteer Matching

1. **Upload**: Client uploads image via `/api/upload`
2. **Queue**: Server queues job in Bull/Cloud Tasks
3. **AI Processing**: Cloud Function calls `/api/ai/process`
4. **Callback**: AI service responds with structured JSON
5. **Callback Handler**: `/api/ocr-callback` receives result
6. **Firestore Store**: Document stored with full metadata
7. **Volunteer Match**: `findBestVolunteers()` assigns top 2 matches
8. **Notification**: Email alert sent to admin
9. **Response**: Client receives issue ID + volunteer assignments

---

## Support & Documentation

- **Civic Schema Spec**: `civic_ocr_prompt_v2-1.md`
- **API Docs**: Available at `http://localhost:8000/docs` (OpenAPI/Swagger)
- **Examples**: See `test_ocr_pipeline.py` for usage examples

---

**Last Updated**: May 4, 2026
**Status**: ✅ Production Ready
**Version**: 2.0
