#!/bin/bash
# OCR Pipeline Deployment & Usage Guide

# ============================================================================
# RELIX Civic Issue OCR Pipeline - Quick Start
# ============================================================================

# Prerequisites
# - Python 3.10+
# - Node.js 18+
# - Firebase project with Firestore
# - Anthropic API key (Claude)
# - GCS bucket for image storage (optional)

# ============================================================================
# STEP 1: Setup Python Environment (ai-service)
# ============================================================================

echo "📦 Setting up AI service..."

cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
# .\venv\Scripts\Activate.ps1

# Activate virtual environment (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# ============================================================================
# STEP 2: Configure Environment Variables
# ============================================================================

echo "⚙️  Configuring environment..."

# Create .env file in ai-service/
cat > .env << EOF
GOOGLE_AI_STUDIO_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY_HERE
FIREBASE_CREDENTIALS_PATH=../server/config/firebase-adminsdk.json

# Optional: GCS Configuration
GCS_BUCKET=your-relix-bucket
GCS_PROJECT_ID=your-gcp-project

# Server
ADMIN_EMAIL=admin@relix.local
EOF

echo "✅ Created .env file (update with your API keys)"

# ============================================================================
# STEP 3: Run AI Service
# ============================================================================

echo "🚀 Starting AI service on port 8000..."

python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# The service will be available at:
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs

# ============================================================================
# STEP 4: Test OCR Pipeline
# ============================================================================

echo "🧪 Testing OCR pipeline..."

# Run comprehensive test suite
python test_ocr_pipeline.py

# Expected output:
# ✅ test_basic_ocr: PASSED
# ✅ test_multilingual: PASSED
# ✅ test_noisy_ocr: PASSED
# ✅ test_schema_validation: PASSED
# ✅ test_fail_safe: PASSED

# ============================================================================
# STEP 5: Setup Server (Node.js)
# ============================================================================

echo "🔧 Setting up server..."

cd ../server

# Install dependencies
npm install

# Configure server .env
cat > .env << EOF
# Firebase
FIREBASE_CREDENTIALS_PATH=./config/firebase-adminsdk.json
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY

# AI Service (Google AI Studio)
AI_SERVICE_URL=http://localhost:8000
GOOGLE_AI_STUDIO_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY_HERE

# Admin
ADMIN_EMAIL=admin@relix.local

# Database
MONGODB_URI=mongodb://localhost:27017/relix
REDIS_URL=redis://localhost:6379
EOF

# Start server
npm start

# The server will be available at http://localhost:5000

# ============================================================================
# STEP 6: Test End-to-End Flow
# ============================================================================

echo "🔄 Testing end-to-end OCR flow..."

# Example 1: Process image with civic issue
curl -X POST http://localhost:8000/api/ai/process \
  -F "file=@sample_civic_issue.jpg"

# Example 2: Process OCR text
curl -X POST http://localhost:8000/api/ai/process-ocr-text \
  -H "Content-Type: application/json" \
  -d '{
    "ocr_text": "Large pothole on MG Road near signal, Bangalore 560038. Very deep, caused 2 accidents."
  }'

# Example 3: Query issues
curl -X GET "http://localhost:8000/api/ai/issues?problem_type=roads&urgency_level=high"

# ============================================================================
# STEP 7: Monitor Service
# ============================================================================

echo "📊 Monitoring OCR service..."

# Check health status
curl -X GET http://localhost:8000/health

# View detailed logs
tail -f logs/ocr-service.log

# View Firestore stored issues
# Visit Firebase Console → Firestore → incidents collection

# ============================================================================
# PRODUCTION DEPLOYMENT
# ============================================================================

# Option 1: Docker Containerization
# Build Docker image
docker build -t relix-ai-service:latest -f ai-service/Dockerfile .

# Run container
docker run -p 8000:8000 \
  -e GOOGLE_AI_STUDIO_API_KEY=$GOOGLE_AI_STUDIO_API_KEY \
  -e FIREBASE_CREDENTIALS_PATH=/app/firebase-adminsdk.json \
  relix-ai-service:latest

# Option 2: Google Cloud Run
gcloud run deploy relix-ai-service \
  --source ai-service \
  --platform managed \
  --region us-central1 \
  --set-env-vars GOOGLE_AI_STUDIO_API_KEY=$GOOGLE_AI_STUDIO_API_KEY

# Option 3: AWS Lambda (FastAPI wrapper)
# Deploy using Zappa or AWS SAM

# ============================================================================
# FIRESTORE INDEXES (REQUIRED FOR PRODUCTION)
# ============================================================================

echo "📑 Creating Firestore indexes..."

# Use gcloud CLI to create recommended indexes:

gcloud firestore indexes create --collection-id=incidents \
  --field-config field-paths=problem_type~Ascending,urgency_level~Ascending,upload_date~Descending

gcloud firestore indexes create --collection-id=incidents \
  --field-config field-paths=area~Ascending,status~Ascending,severity_score~Descending

gcloud firestore indexes create --collection-id=incidents \
  --field-config field-paths=repeat_complaint~Ascending,urgency_level~Descending,upload_date~Descending

# Or manually via Firebase Console:
# - Firestore → Indexes
# - Create composite index with fields above

# ============================================================================
# MONITORING & LOGGING
# ============================================================================

# Setup Cloud Logging (if using GCP)
gcloud logging sinks create relix-ocr \
  logging.googleapis.com/projects/YOUR_PROJECT/logs/relix-ocr \
  --log-filter='resource.type="cloud_run_revision"'

# Setup alerts for fail-safe triggers
# Condition: _meta.fail_safe_triggered == true
# Action: Send email to admin@relix.local

# ============================================================================
# PERFORMANCE TUNING
# ============================================================================

# Recommended settings for production:

# Uvicorn (ai-service/main.py)
# - workers: 4 (for multi-core systems)
# - timeout_keep_alive: 30
# - loop: uvloop
# - http: httptools

# Example production command:
python -m uvicorn main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --timeout-keep-alive 30

# Redis for caching OCR results (optional)
redis-server --port 6379

# ============================================================================
# TROUBLESHOOTING
# ============================================================================

# Issue: Claude API rate limit
# Solution: Implement request throttling
# Recommendation: Use langchain's rate limiter or exponential backoff

# Issue: Large file uploads timing out
# Solution: Use chunked uploads (handled by client)
# Max file size: 10MB per image

# Issue: Multilingual processing slow
# Solution: Cache translations using Redis
# Recommend: Pre-process images for language detection

# Issue: Firestore costs high
# Solution: 
# - Archive old issues to Cloud Storage
# - Implement TTL-based document deletion
# - Use Cloud Storage for image backups instead of Firestore

# ============================================================================
# BACKUP & RECOVERY
# ============================================================================

# Export Firestore collection
gcloud firestore export gs://YOUR_BUCKET/backups/incidents-backup \
  --collection-ids=incidents

# Import Firestore collection
gcloud firestore import gs://YOUR_BUCKET/backups/incidents-backup

# ============================================================================
# CLEANUP (Development Only)
# ============================================================================

# Stop services
Ctrl+C  # Stop uvicorn
Ctrl+C  # Stop Node.js

# Remove virtual environment
rm -rf ai-service/venv

# Clean up test artifacts
rm -rf ai-service/__pycache__
rm -rf server/node_modules

echo "✅ OCR Pipeline setup complete!"
echo ""
echo "📚 Quick Reference:"
echo "   - API Docs:      http://localhost:8000/docs"
echo "   - Health Check:  http://localhost:8000/health"
echo "   - Process Image: POST /api/ai/process"
echo "   - Process Text:  POST /api/ai/process-ocr-text"
echo "   - Query Issues:  GET /api/ai/issues"
echo ""
echo "🔗 Next Steps:"
echo "   1. Test with sample civic issue images"
echo "   2. Configure Firestore indexes"
echo "   3. Set up monitoring and alerts"
echo "   4. Deploy to production"
