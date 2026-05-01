# RELIX → Google Cloud Migration — Detailed To-Do List

> 20 tasks across 8 phases. Complete phases in order — each phase has dependencies on the ones before it.

---

## Phase 1 — Infrastructure Setup

- [x] **Task 1** — Create GCP project and enable all required APIs
- [x] **Task 2** — Set up GCS bucket and IAM policies
- [x] **Task 16** — Migrate all secrets to Secret Manager
- [x] **Task 17** — Set up Cloud Build + Cloud Deploy CI/CD pipeline

---

## Phase 2 — Storage & Uploads

- [x] **Task 3** — Refactor `uploadRoutes.js` to use GCS signed URLs

---

## Phase 3 — AI & OCR Pipeline

- [x] **Task 4** — Deploy `processImage` Cloud Function
- [x] **Task 5a** — Replace Claude LLM with Vertex AI (Gemini)

---

## Phase 4 — Backend & Services

- [x] **Task 6** — Dockerize `server/` and push to Artifact Registry
- [x] **Task 7** — Deploy `relix-backend` to Cloud Run
- [x] **Task 8** — Dockerize `ai-service/` and deploy as Cloud Run service
- [x] **Task 9** — Replace Bull queue with Cloud Tasks
- [x] **Task 10** — Convert Socket.io events to Firestore real-time listeners

---

## Phase 5 — Frontend

- [x] **Task 5b** — Replace Mapbox GL with Google Maps JavaScript API

---

## Phase 6 — Analytics & Observability

- [x] **Task 11** — Build Pub/Sub → BigQuery analytics pipeline
- [ ] **Task 12** — Build Looker Studio KPI dashboards (Manual Setup)
- [x] **Task 13** — Replace `winston` with `@google-cloud/logging`
- [ ] **Task 14** — Configure Cloud Monitoring alerts (Manual Setup)

---

## Phase 7 — Security & CI/CD Hardening

- [x] **Task 15** — Add API Gateway + Cloud Armor edge security
- [ ] **Task 19** — Update CI scripts with `gcloud` end-to-end tests

---

## Phase 8 — QA & Documentation

- [x] **Task 18** — Write `GOOGLE_STACK_README.md`
- [ ] **Task 20** — End-to-end smoke test


---

## Quick Reference — Google Services Used

| Service | Purpose |
|---|---|
| Cloud Storage | Image upload bucket with signed URLs |
| Cloud Functions | Async OCR + LLM processing triggered by GCS events |
| Vision API | OCR on uploaded images |
| Vertex AI (Gemini) | LLM structuring of raw OCR text |
| Cloud Run | Hosts containerized Express backend and FastAPI AI service |
| Cloud Tasks | Managed async job queue (replaces Bull + Redis) |
| Firestore | Real-time data store + replaces Socket.io for live UI updates |
| Maps Platform | Map rendering and Directions API (replaces Mapbox) |
| Pub/Sub | Event streaming for analytics pipeline |
| BigQuery | Raw event storage for analytics |
| Looker Studio | KPI dashboards |
| Cloud Logging | Structured application logs (replaces winston) |
| Cloud Monitoring | Alerts and dashboards for latency and error rate |
| API Gateway | Single entry point for all external traffic |
| Cloud Armor | Edge security, rate limiting, DDoS protection |
| Secret Manager | Stores all API keys, credentials, JWT secrets |
| Cloud Build | CI pipeline (lint → test → build → push) |
| Cloud Deploy | CD pipeline (deploy to Cloud Run) |
| Artifact Registry | Docker image storage |
