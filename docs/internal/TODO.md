# ✅ RELIX — MVP Development TODO List
## Relief Intelligence Exchange | Master Checklist

> Generated from `RELIX_MVP_FEATURES.md` + `RELIX_UI_SPEC.md` + `tech_stack_mvp_v2.md`
> Last Updated: April 16, 2026

---

## 🔑 Legend
- `[ ]` — Not started
- `[/]` — In progress
- `[x]` — Completed

---

# Phase 0: Project Setup & Infrastructure

## 0.1 Repository & Tooling
- [x] Initialize monorepo structure (`/client`, `/server`, `/shared`)
- [x] Set up ESLint + Prettier config
- [x] Set up `.env.example` for all environment variables
- [x] Create `.gitignore` (node_modules, .env, dist, uploads)
- [x] Set up Husky pre-commit hooks (lint + format)

## 0.2 Frontend Setup
- [x] Initialize Vite + React 18 project (`/client`)
- [x] Install core dependencies: Tailwind CSS 3.x, Zustand 4.x, React Router 6.x
- [x] Install UI dependencies: Recharts 2.x, Leaflet 1.9.x, Leaflet.markercluster 1.5.x
- [x] Install form/validation: React Hook Form 7.x, Zod 3.x
- [x] Install networking: Axios 1.x, Socket.io-client 4.x
- [ ] Install icons: Lucide React
- [ ] Configure Tailwind with custom design tokens (colors, spacing, typography)
- [ ] Set up Google Fonts (Inter)
- [ ] Create folder structure: `/components`, `/pages`, `/store`, `/api`, `/hooks`, `/utils`

## 0.3 Backend Setup
- [ ] Initialize Node.js 20.x + Express 4.x project (`/server`)
- [ ] Install core: Express, Socket.io 4.x, cors, dotenv
- [ ] Install security: Helmet 7.x, express-rate-limit 7.x, jsonwebtoken 9.x
- [ ] Install file handling: Multer 1.x, Sharp 0.33.x
- [ ] Install OCR: node-tesseract-ocr 2.x
- [ ] Install queue: Bull 4.x
- [ ] Install notifications: Nodemailer 6.x, Twilio SDK 4.x (optional)
- [ ] Install logging: Winston 3.x
- [ ] Install DB: Mongoose 8.x
- [ ] Set up Express app structure (routes, controllers, middleware, models, services)

## 0.4 Database & Cache
- [ ] Set up MongoDB Atlas (free M0 cluster)
- [ ] Create Mongoose connection with retry logic
- [ ] Set up Redis (Railway Redis / Upstash)
- [ ] Configure Bull queue with Redis connection
- [ ] Create MongoDB indexes:
  - [ ] `issues: { urgency_level: 1, status: 1 }`
  - [ ] `issues: { created_at: -1 }`
  - [ ] `issues: { lat: 1, lng: 1 } (2dsphere)`
  - [ ] `issues: { ngo_name: 1 }`
  - [ ] `volunteers: { lat: 1, lng: 1 } (2dsphere)`
  - [ ] `volunteers: { available: 1, active_tasks: 1 }`

## 0.5 External API Keys
- [ ] Obtain Google Vision API key
- [ ] Obtain Google Maps Geocoding API key
- [ ] Obtain OpenAI / Claude API key (for LLM structuring)
- [ ] Obtain Twilio credentials (optional, SMS)
- [ ] Set up SMTP credentials for Nodemailer
- [ ] Configure Mapbox GL JS access token (for frontend map)
- [ ] Store all keys in `.env` file

---

# Phase 1: Handwritten Data Upload (Feature #1)

## 1.1 Backend — Upload Endpoint
- [ ] Create `POST /api/upload` endpoint with Multer middleware
- [ ] Implement file type validation (JPG, JPEG, PNG — check MIME + extension)
- [ ] Implement file size limit (10MB per file)
- [ ] Implement batch upload (max 5 files at a time)
- [ ] Implement image integrity validation (Sharp / PIL)
- [ ] Implement chunked upload support for files >2MB
- [ ] Assign unique Job ID on upload, return `202 Accepted`
- [ ] Queue job in Bull for async processing
- [ ] Create `GET /api/jobs/:id` endpoint for status polling
- [ ] Implement job states: `QUEUED → PREPROCESSING → OCR_RUNNING → STRUCTURING → DONE / FAILED`
- [ ] Implement server disk headroom check (return 507 if full)
- [ ] Apply rate limiting: 10 requests / 15 minutes per IP

## 1.2 Frontend — Upload UI
- [ ] Create `UploadBox` component with drag & drop
- [ ] Implement all 7 UI states: Idle, Dragging, Validating, Uploading, Processing, Success, Error
- [ ] Implement client-side validation:
  - [ ] File type check (MIME + extension)
  - [ ] File size check (reject >10MB with clear message)
  - [ ] Duplicate detection (SHA-256 hash)
  - [ ] Empty file rejection (0 bytes)
- [ ] Show real upload progress bar (actual %, not fake)
- [ ] Implement cancel upload functionality
- [ ] Implement animated steps indicator (Queued → OCR → Done)
- [ ] Store upload progress in `sessionStorage`
- [ ] Add `beforeunload` warning dialog during upload
- [ ] Show low DPI warning (<150 DPI)
- [ ] Poll `/api/jobs/:id` every 3 seconds for status
- [ ] On SUCCESS → redirect to Preview & Edit screen
- [ ] On FAILURE → show error with retry option

---

# Phase 2: OCR Processing — AI Module (Feature #2)

## 2.1 Image Preprocessing Pipeline
- [ ] Convert uploaded image to grayscale
- [ ] Implement deskew (correct tilt up to ±15°)
- [ ] Implement denoise filter
- [ ] Implement adaptive thresholding
- [ ] Resize to optimal OCR resolution (1200px longest edge)
- [ ] Handle PDF-to-PNG conversion via Sharp

## 2.2 Primary OCR: Google Vision API
- [ ] Integrate Google Vision API (`DOCUMENT_TEXT_DETECTION` mode)
- [ ] Parse bounding boxes and per-character confidence scores
- [ ] Compute per-field confidence scores (0–100%)
- [ ] Compute overall document confidence score (average)
- [ ] Monitor API quota usage, alert admin at 80%

## 2.3 Fallback OCR: Tesseract
- [ ] Set up Tesseract.js/node-tesseract-ocr with `eng` + `hin` language models
- [ ] Configure `PSM_AUTO` page segmentation mode
- [ ] Implement automatic fallback trigger:
  - [ ] Google Vision unavailable
  - [ ] API quota exceeded
  - [ ] Primary confidence <40%
- [ ] Compute confidence scores from Tesseract output

## 2.4 Manual Fallback
- [ ] If both OCR engines return confidence <40%, flag for manual entry
- [ ] Open blank editable form (don't block user)

## 2.5 Job Queue Configuration
- [ ] Configure Bull with 2 concurrent OCR workers
- [ ] Set job TTL: 30 minutes (auto-cleanup stale jobs)
- [ ] Implement retry policy: 3 retries with exponential backoff (5s, 15s, 45s)
- [ ] Implement priority queue (urgent uploads skip to front)
- [ ] Show queue position to user ("Your report is #12 in queue (~4 minutes)")

---

# Phase 3: Data Structuring & Validation (Feature #3)

## 3.1 Extraction Logic
- [ ] Implement keyword matching for `problem_type`:
  - [ ] Water keywords: well, water, pump, drought, contamination, flood
  - [ ] Health keywords: sick, disease, hospital, medicine, malaria, fever
  - [ ] Education keywords: school, children, teacher, classroom, books
  - [ ] Shelter keywords: house, roof, shelter, homeless, damaged
- [ ] Implement keyword matching for `urgency_level`:
  - [ ] High: urgent, emergency, critical, immediate, dying
  - [ ] Low: minor, stable, when possible, not critical
- [ ] Implement LLM structuring fallback (GPT-3.5-turbo or Claude Haiku):
  - [ ] Structured JSON output prompt
  - [ ] Max 200 tokens per call
  - [ ] Triggered when keyword confidence <70%
  - [ ] Wrap parse in try/catch; fallback to keyword-only

## 3.2 Geocoding
- [ ] Integrate Google Maps Geocoding API (location string → lat/lng)
- [ ] Implement Nominatim fallback (OpenStreetMap)
- [ ] Store `lat: null, lng: null` if geocoding fails

## 3.3 Data Validation & Sanitisation
- [ ] Create Mongoose Issue model with all fields:
  - [ ] `location` (String, 3–200 chars)
  - [ ] `latitude` (Float, -90 to 90)
  - [ ] `longitude` (Float, -180 to 180)
  - [ ] `problem_type` (Enum: water, health, education, shelter, food, other)
  - [ ] `urgency_level` (Enum: high, medium, low)
  - [ ] `people_affected` (Integer, 1–1,000,000)
  - [ ] `description` (String, max 2000 chars)
  - [ ] `ngo_name` (String, max 100 chars)
  - [ ] `reported_at` (Date, auto-set)
  - [ ] `ocr_confidence` (Float, 0.0–1.0)
  - [ ] `status` (Enum: pending, assigned, resolved)
- [ ] Implement data sanitisation:
  - [ ] Trim all string fields
  - [ ] Strip HTML/script tags (XSS prevention)
  - [ ] Validate enums strictly
  - [ ] Cap numeric fields to defined ranges
  - [ ] Store original OCR text for audit
- [ ] Implement duplicate detection (hash: location + problem_type + date)

## 3.4 Preview & Edit Screen (Frontend)
- [ ] Create editable form with all extracted fields
- [ ] Show confidence colour coding (green/orange/red border)
- [ ] Auto-scroll to low-confidence fields
- [ ] Dropdown for `problem_type` and `urgency_level`
- [ ] Number input for `people_affected` (min: 1)
- [ ] Map pin preview showing geocoded location
- [ ] Draggable map pin for location correction
- [ ] "Submit Report" button — disabled until all required fields filled
- [ ] Duplicate warning dialog

---

# Phase 4: SVI Priority Scoring Engine (Feature #4)

## 4.1 Core Algorithm
- [ ] Implement SVI formula:
  ```
  SVI = Water_Score + Health_Score + Housing_Score
  Component = (0.6 × urgency) + (0.4 × people_affected_normalized)
  people_affected_normalized = min(people_affected / 1000, 1.0)
  ```
- [ ] Implement urgency values: High=3, Medium=2, Low=1
- [ ] Handle `people_affected = null` (treat as 0, flag in UI)

## 4.2 Cluster SVI
- [ ] Implement location clustering (1km radius)
- [ ] Compute cluster SVI:
  ```
  Cluster_SVI = Σ(individual SVIs) × density_multiplier
  density_multiplier = 1 + (0.1 × issue_count), capped at 2.0
  ```

## 4.3 SVI Tiers & Display
- [ ] Implement tier classification:
  - [ ] Critical (7.0–10.0) → Red `#FF3B30`
  - [ ] High (4.0–6.9) → Orange `#FF9F0A`
  - [ ] Medium (2.0–3.9) → Yellow `#FFD60A`
  - [ ] Low (0.0–1.9) → Green `#34C759`
- [ ] Auto-recalculate on every issue update (Mongoose post-save hook)
- [ ] Enforce relative ranking on dashboard (top 3 as urgent)

---

# Phase 5: Volunteer Matching System (Feature #5)

## 5.1 Volunteer Data Model
- [ ] Create Mongoose Volunteer model:
  - [ ] id, name, lat, lng
  - [ ] skills (array of enums)
  - [ ] active_tasks, max_tasks (default: 3)
  - [ ] available (boolean)
  - [ ] last_active (timestamp)
  - [ ] contact_email, contact_phone

## 5.2 Matching Algorithm
- [ ] Filter pool: available=true, active_tasks < max_tasks, last_active within 24h
- [ ] Compute match_score:
  ```
  match_score = (proximity_score × 0.5) + (skill_score × 0.3) + (workload_score × 0.2)
  ```
- [ ] Implement proximity_score: `1 - min(distance_km / 50, 1.0)`
- [ ] Implement skill_score: exact=1.0, related=0.5, none=0.0
- [ ] Implement workload_score: `1 - (active_tasks / max_tasks)`
- [ ] Sort by match_score descending, assign top candidate
- [ ] Use atomic `findOneAndUpdate` to prevent overcapacity race conditions

## 5.3 Assignment Flow
- [ ] Auto-assign for Critical/High SVI (≥4.0)
- [ ] Suggest top 3 for Medium/Low SVI (<4.0) — admin confirms
- [ ] Volunteer accept/decline via email link
- [ ] 3 re-assignment attempts on decline
- [ ] 15-minute escalation to admin on no response
- [ ] Add unassigned tasks to queue if no volunteers available

## 5.4 Notification System
- [ ] Set up Nodemailer SMTP for email notifications
- [ ] Email templates:
  - [ ] Task assigned
  - [ ] Task declined (admin alert)
  - [ ] No volunteer available (admin alert)
  - [ ] Task resolved (to NGO)
- [ ] Set up Twilio SMS (optional, fallback to email-only)
- [ ] Implement volunteer availability decay (48h → auto-pause, reactivate email)

## 5.5 Volunteer Management UI
- [ ] Create volunteer list page
- [ ] Volunteer profile cards with skills, location, workload
- [ ] "Location updated X hours ago" indicator
- [ ] Toggle availability switch

---

# Phase 6: Dashboard (Feature #6)

## 6.1 Layout
- [ ] Implement sidebar navigation (fixed, 240px):
  - [ ] Dashboard, Upload, Issues, Volunteers, Settings
- [ ] Implement header (80px): RELIX logo, active alerts badge, user menu
- [ ] Implement responsive layout (sidebar → bottom nav on mobile ≤768px)

## 6.2 Metrics Row (4 KPI Cards)
- [ ] Total Reports card (count of all issues)
- [ ] Critical Issues card (SVI ≥ 7.0)
- [ ] People Affected card (sum)
- [ ] Active NGOs card (distinct ngo_name)
- [ ] Animate numbers from 0 → value on first load (2s ease-out)
- [ ] Pulse animation (flash green/red) on value changes
- [ ] Skeleton loader during fetch

## 6.3 Problem Map
- [ ] Set up Leaflet with OpenStreetMap tiles
- [ ] Default centre: [17.385, 78.487] (Hyderabad), zoom: 10
- [ ] Implement colour-coded markers by problem_type:
  - [ ] Water=Blue, Health=Red, Shelter=Yellow, Education=Purple, Food=Orange
- [ ] Size-scale markers by SVI score
- [ ] Implement Leaflet.markercluster (cluster at 50px distance)
- [ ] Cluster bubble: show count + dominant colour
- [ ] Implement marker click popups (location, problem, SVI, volunteer)
- [ ] Implement filters:
  - [ ] Problem Type (multi-select checkboxes)
  - [ ] Urgency Level (High/Medium/Low toggles)
  - [ ] Status (Pending/Assigned/Resolved)
  - [ ] Date Range (7 days / 30 days / all time)
- [ ] Client-side filtering (no new API call)
- [ ] Never render >200 unclustered markers

## 6.4 AI Insights Panel
- [ ] Create right-side panel (320px width, 3–5 insights)
- [ ] Implement insight types:
  - [ ] Hotspot detection
  - [ ] Surge alert
  - [ ] Volunteer gap
  - [ ] Resolution rate
  - [ ] Prediction
- [ ] LLM-generated insights using aggregated metrics (no PII)
- [ ] Refresh every 5 minutes
- [ ] Show source data for verification
- [ ] Skeleton loader during fetch

## 6.5 Task/Issues List
- [ ] Sortable columns: Location, Problem Type, SVI Score, Status, Created At
- [ ] Default sort: SVI Score descending
- [ ] Pagination: 25 rows per page
- [ ] Row actions: View Details, Assign Volunteer, Mark Resolved
- [ ] Bulk actions: Select multiple → Assign / Export CSV
- [ ] Row colour coding: Critical=light red, High=light orange, rest=white

## 6.6 Charts Section
- [ ] Bar Chart — Issues by Problem Type (Recharts):
  - [ ] X-axis: problem_type, Y-axis: count
  - [ ] Colour-matched to map markers
  - [ ] Tooltip: count + percentage
- [ ] Line Chart — Issues Over Time (Recharts):
  - [ ] X-axis: date (last 14 days), Y-axis: new issues/day
  - [ ] Two lines: Total vs Resolved
  - [ ] Dotted 7-day moving average line

## 6.7 Real-Time Updates
- [ ] Implement `GET /api/analytics` endpoint (backend)
- [ ] Dashboard polls analytics every 30 seconds
- [ ] Socket.io connection for live alerts
- [ ] New Critical issue → toast notification
- [ ] Silent fallback to 15-second polling on WebSocket disconnect
- [ ] Pause polling on tab hidden (`document.visibilityState`)

---

# Phase 7: Frontend Pages

## 7.1 Landing Page
- [ ] Hero section with gradient background
- [ ] Impact counter (0 → value animation in 2s, refresh every 5s)
- [ ] "How It Works" — 3 steps section
- [ ] CTA button → Dashboard or Upload
- [ ] SEO: meta title, description, Open Graph image

## 7.2 Issues Explorer Page
- [ ] 3-column grid layout (gap: 24px)
- [ ] Issue cards: Location + Badge, Description, NGO name + Action button
- [ ] Virtual scrolling after first 9 items (react-window)
- [ ] Lazy load images + blurhash placeholders
- [ ] Empty state: "No issues available yet"

## 7.3 Issue Detail Page
- [ ] Left panel: Issue info (all fields, map, SVI badge)
- [ ] Right panel: NGO info + "Connect & Help" button (mailto, tel)

## 7.4 Upload Page
- [ ] Upload → Processing → Preview → Submit flow
- [ ] AI confidence score display (>80% green, 50-80% orange, <50% red)
- [ ] Optimistic UI: "Processing..." shows instantly

---

# Phase 8: Security & Resilience

## 8.1 Authentication
- [ ] Implement JWT authentication on all non-public endpoints
- [ ] Login/Register endpoints
- [ ] Auth middleware for protected routes
- [ ] Frontend: auth context, protected routes, token refresh

## 8.2 Security Hardening
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] Helmet.js on all Express responses
- [ ] CORS: whitelist frontend domain only
- [ ] Rate limiting on all endpoints
- [ ] File upload: size limit + type validation + magic bytes check
- [ ] MongoDB: no `$where` queries; Mongoose validation on all writes
- [ ] Environment variables: no secrets in code/version control
- [ ] Dependency audit: `npm audit` before deployment

## 8.3 Circuit Breaker
- [ ] Implement circuit breaker for Google Vision API
- [ ] Implement circuit breaker for LLM API
- [ ] Implement circuit breaker for Geocoding API
- [ ] Config: 5 failures → open; 60s → half-open; success → close
- [ ] Use `opossum` library or custom middleware

## 8.4 Error Handling
- [ ] Consistent API response shape: `{ success, data/error }`
- [ ] User-friendly error messages (never raw errors/stack traces)
- [ ] Structured logging with Winston (JSON, job ID, user ID, timestamp)
- [ ] Log levels: error, warn, info, debug
- [ ] Admin email alerts on critical errors

## 8.5 Graceful Degradation
- [ ] Google Vision → Tesseract fallback
- [ ] LLM → keyword-only fallback
- [ ] Geocoding → Nominatim fallback
- [ ] Redis/Bull → synchronous fallback
- [ ] WebSocket → polling fallback
- [ ] MongoDB slow → Redis cache serves stale analytics
- [ ] Twilio → email-only fallback

---

# Phase 9: Accessibility & UX Polish

## 9.1 Accessibility (WCAG 2.1 AA)
- [ ] Visible keyboard focus indicators (`outline: 2px solid #3B82F6`)
- [ ] "Skip to main content" hidden link
- [ ] Colour not alone for urgency (badge + icon ⚠️/✓)
- [ ] Alt text on map elements
- [ ] ARIA live regions for toasts (`role="status" aria-live="polite"`)
- [ ] Contrast ratio compliance (text on #FF6B35: white only, 4.5:1)
- [ ] Zoom to 200% — no horizontal scroll, grid collapses to 1 column

## 9.2 Keyboard Shortcuts
- [ ] `G` then `D` → Dashboard
- [ ] `G` then `U` → Upload
- [ ] `G` then `I` → Issues Explorer
- [ ] `/` → Focus search bar
- [ ] `ESC` → Close modal/popup
- [ ] `J` / `K` → Navigate issues list
- [ ] `Enter` → Open selected issue

## 9.3 Interaction Polish
- [ ] Skeleton loaders for all sections
- [ ] Progressive loading: Metrics (500ms) → Map (1s) → Charts (1.5s) → Insights (2s)
- [ ] Optimistic updates (Mark Resolved: dim instantly → API → success/restore)
- [ ] Confirmation dialogs for destructive actions
- [ ] Toast undo for soft deletes
- [ ] "Leave page during upload?" warning dialog
- [ ] Empty states for all data sections
- [ ] Emotional microcopy ("120 people need clean water" not "120 affected")
- [ ] Live alert toasts ("New issue added 2 minutes ago")

## 9.4 Responsiveness
- [ ] Mobile breakpoint (≤768px): sidebar → bottom nav, grid → 1 column
- [ ] Map: 50vh on mobile
- [ ] Print styles: hide sidebar, bottom-nav; map break-inside avoid

## 9.5 Cookie Consent
- [ ] GDPR-compliant banner for EU users
- [ ] Analytics opt-out

---

# Phase 10: Testing & Deployment

## 10.1 Performance Targets
- [ ] OCR accuracy ≥ 75% field-level accuracy (test 20 forms)
- [ ] Task assignment time < 3 minutes (upload → assignment)
- [ ] Dashboard FCP < 2.5 seconds
- [ ] API response p95 < 500ms for read endpoints
- [ ] Map load with 200 markers < 1 second
- [ ] Demo throughput: 10–20 tasks processed without failure
- [ ] Bundle size (gzipped) < 150KB
- [ ] FCP < 1.2s, LCP < 2.5s, TTI < 3s

## 10.2 Acceptance Tests
- [ ] Test 1 — Happy Path (upload → OCR → preview → submit → map → assign → notify)
- [ ] Test 2 — Low Quality Image (partial OCR → manual fill → submit)
- [ ] Test 3 — No Volunteers Available (critical issue → unassigned → admin alert)
- [ ] Test 4 — Concurrent Uploads (5 files, 2 tabs → all process correctly)
- [ ] Test 5 — Dashboard Under Load (200 mock issues → all sections < 3s)

## 10.3 Deployment
- [ ] Set up hosting (Railway / Render)
- [ ] Configure MongoDB Atlas production connection
- [ ] Configure Redis production instance
- [ ] Set up file storage (AWS S3 or Cloudinary)
- [ ] Configure all environment variables in hosting platform
- [ ] Set up CI/CD pipeline
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Final Lighthouse audit

---

# 🔌 MCP Server Analysis for RELIX

## Currently Available MCP Servers

### 1. ✅ Firebase MCP Server (`firebase-mcp-server`)

| Status | Detail |
|--------|--------|
| **Connected** | Yes |
| **Authenticated** | ❌ **NO** — No user logged in |
| **Active Project** | ❌ **NONE** |
| **Config File** | ❌ No `firebase.json` found |

**How it can help RELIX:**

| Capability | RELIX Use Case |
|------------|---------------|
| **Firebase Authentication** | User auth (NGO coordinators, admins, volunteers) — replaces custom JWT |
| **Cloud Firestore** | Could replace MongoDB Atlas for issue/volunteer data storage |
| **Firebase Hosting** | Host the React frontend (free SSL, CDN) |
| **Firebase Storage** | Store uploaded handwritten form images (replaces S3/Cloudinary) |
| **Firebase Realtime DB** | Real-time dashboard updates (replaces Socket.io polling) |
| **Documentation Search** | Search Google developer docs for APIs (Vision, Maps, etc.) |

**⚠️ Action Required:**
- Run `firebase login` to authenticate
- Create/select a Firebase project
- Initialize services (`firebase init`) for auth, hosting, storage, firestore

---

### 2. ✅ Cloud Run MCP Server (`cloudrun`)

| Status | Detail |
|--------|--------|
| **Connected** | Yes |
| **Authenticated** | ❌ **NO** — GCP credentials not available |

**How it can help RELIX:**

| Capability | RELIX Use Case |
|------------|---------------|
| **Deploy Backend** | Deploy Node.js/Express API server to Cloud Run (auto-scaling, serverless) |
| **Deploy Frontend** | Deploy the built React app as a container |
| **Service Monitoring** | Check logs, errors, and service health |
| **Scaling** | Auto-scale OCR workers under load (handles concurrent uploads) |

**⚠️ Action Required:**
- Run `gcloud auth login` to configure GCP credentials
- Create or select a GCP project
- Enable Cloud Run API

---

### 3. ✅ Stitch MCP Server (`StitchMCP`)

| Status | Detail |
|--------|--------|
| **Connected** | Yes |
| **Projects** | None |

**How it can help RELIX:**

| Capability | RELIX Use Case |
|------------|---------------|
| **UI Design Generation** | Generate screen designs for Dashboard, Upload, Issues Explorer, Landing Page |
| **Design System** | Create and apply consistent design tokens (colors, fonts, shapes) matching RELIX specs |
| **Screen Variants** | Generate multiple design variants for A/B testing UI approaches |
| **Rapid Prototyping** | Quickly prototype all pages before coding |

**⚠️ Action Required:**
- Create a Stitch project for RELIX
- Define design system with RELIX tokens

---

## MCP Servers — Recommendation Summary

| MCP Server | Relevance to RELIX | Priority | Auth Status |
|------------|--------------------|-----------|----|
| **Firebase** | 🔴 **HIGH** — Auth, DB, Hosting, Storage, Realtime | Use immediately | ❌ Needs login |
| **Cloud Run** | 🟠 **HIGH** — Backend deployment & scaling | Use for deployment | ❌ Needs gcloud auth |
| **Stitch** | 🟡 **MEDIUM** — UI prototyping & design system | Use for design phase | ✅ Ready (no projects yet) |

---

**Document Version:** 1.0
**Total Tasks:** ~180+
**Estimated Build Time:** 10–14 days (2 full-stack developers)
**Generated:** April 16, 2026
