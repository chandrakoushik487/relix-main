# RELIX — Google Cloud Native Architecture

This document describes the modern, serverless architecture of RELIX on Google Cloud Platform.

## 🏗️ Core Architecture

RELIX has been migrated from a monolithic, local-state architecture to a distributed, event-driven, and stateless system.

### 1. Storage & Ingestion
- **Service**: Google Cloud Storage (GCS)
- **Flow**: Browser → GCS (via V4 Signed URLs). No files pass through the Express server, ensuring maximum scalability and zero server load during uploads.

### 2. AI & OCR Pipeline (Serverless)
- **Triggers**: Cloud Storage `OBJECT_FINALIZE` event.
- **Processing**: 
  - **Cloud Functions (Node.js)**: Orchestrates the pipeline.
  - **Vision API**: Extracts raw text from images (OCR).
  - **Vertex AI (Gemini 1.5 Pro)**: Structures raw text into valid JSON (Incident Schema).
  - **Firestore**: Stores the final structured data.

### 3. Compute (Containerized)
- **Service**: Google Cloud Run
- **Components**:
  - `relix-server`: Express.js backend for authentication, API routing, and user management.
  - `relix-ai`: FastAPI service for advanced AI logic (SVI calculation, custom ML models).

### 4. Real-time Synchronization
- **Service**: Cloud Firestore
- **Mechanism**: Replaced `Socket.io` with Firestore `onSnapshot` listeners. The frontend reacts instantly to document changes in the cloud.

### 5. Async Tasks
- **Service**: Google Cloud Tasks
- **Usage**: Replaced `Bull` + `Redis`. Used for reliable, retriable background jobs like notifying users or triggering long-running AI calculations.

### 6. Analytics & Observability
- **Pipeline**: Pub/Sub → Cloud Functions → BigQuery.
- **Logs**: Integrated `winston` with Google Cloud Logging.
- **Metrics**: Cloud Monitoring dashboards for latency and error rates.

## 🛠️ Local Development & Emulation

To develop locally while staying compatible with GCP:

1. **Firestore & Storage**:
   ```bash
   firebase emulators:start
   ```
2. **Cloud Functions**:
   ```bash
   cd functions && npm run shell
   ```
3. **Docker**:
   ```bash
   docker build -t relix-server ./server
   docker run -p 8080:8080 relix-server
   ```

## 🔒 Security
- **Secrets**: Managed via Google Secret Manager. No `.env` files in production.
- **Edge**: Cloud Armor protects the API Gateway from DDoS and common web attacks.
- **IAM**: Each service runs with a dedicated Service Account following the principle of least privilege.
