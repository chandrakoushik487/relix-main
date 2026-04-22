# 🌐 RELIX — MVP Feature Specification
## Relief Intelligence Exchange | Production-Hardened v1.0

> **Design Philosophy:** Every feature must degrade gracefully, recover from failure silently, and never leave the user stranded. Pressure points are identified and resolved at spec time, not at runtime.

---

# 📋 TABLE OF CONTENTS

1. [Handwritten Data Upload](#1-handwritten-data-upload)
2. [OCR Processing — AI Module](#2-ocr-processing--ai-module)
3. [Data Structuring & Validation](#3-data-structuring--validation)
4. [SVI Priority Scoring Engine](#4-svi-priority-scoring-engine)
5. [Volunteer Matching System](#5-volunteer-matching-system)
6. [Dashboard](#6-dashboard)
7. [Tech Stack — Detailed](#7-tech-stack--detailed)
8. [Resilience & Fault Tolerance](#8-resilience--fault-tolerance)
9. [Success Criteria & Acceptance Tests](#9-success-criteria--acceptance-tests)

---

# 1. Handwritten Data Upload

## 1.1 Overview
NGO field workers upload images of handwritten paper forms. The system accepts the file, validates it, queues it for processing, and provides real-time status feedback throughout the pipeline.

## 1.2 Accepted Formats & Constraints

| Property | Value |
|---|---|
| File types | JPG, JPEG, PNG |
| Max file size | 10MB per file |
| Max batch upload | 5 files at a time |
| Min resolution | 300 DPI recommended (soft warning if lower) |
| Max resolution | No hard cap; server resizes to 1200px longest edge before OCR |

## 1.3 Upload Flow (Step-by-Step)

```
User selects file(s)
      ↓
Client-side validation (type, size, resolution estimate)
      ↓
Upload to server via multipart/form-data (chunked if >2MB)
      ↓
Server assigns Job ID and returns immediately (202 Accepted)
      ↓
Client polls /jobs/:id every 3 seconds (or WebSocket push if available)
      ↓
Job states: QUEUED → PREPROCESSING → OCR_RUNNING → STRUCTURING → DONE / FAILED
      ↓
On DONE: redirect to Preview & Edit screen
On FAILED: show error with recovery options
```

## 1.4 Client-Side Validation (Pre-Upload)

Run these checks **before** the HTTP request:

- File type: check MIME type AND file extension (users can rename files)
- File size: reject above 10MB with a clear message ("File is 12MB. Maximum is 10MB.")
- Duplicate detection: hash the file client-side (SHA-256); warn if same hash uploaded in the current session
- Empty file: reject 0-byte files immediately

## 1.5 Upload UI States

| State | Visual | User Action |
|---|---|---|
| Idle | Dashed border box, cloud icon, "Drop files or click to upload" | Click or drag |
| Dragging | Border turns blue, box scales up 2% | Drop file |
| Validating | Spinner inside box | None |
| Uploading | Progress bar (actual %, not fake), filename, file size | Can cancel |
| Processing | Animated steps indicator (Queued → OCR → Done) | Can navigate away safely |
| Success | Green check, "Ready to review" button | Click to preview |
| Error | Red border, specific error message, retry button | Retry or upload new file |

## 1.6 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| Large file on slow connection | Upload timeout | Chunked upload with resume support; retry last chunk on failure |
| User closes tab mid-upload | Data loss | Store upload progress in sessionStorage; warn with browser `beforeunload` dialog |
| Server storage full | Silent failure | Server checks disk headroom before accepting; returns 507 with user-friendly message |
| Corrupted image file | OCR garbage output | Server validates image integrity (PIL/Sharp) before queuing; rejects with "File appears corrupted" |
| Concurrent uploads from same NGO | Race conditions | Job queue handles concurrency; each job is independent with its own ID |
| Mobile upload (low quality camera) | Poor OCR | Warn user if resolution appears below 150 DPI: "Low image quality may reduce accuracy" |

---

# 2. OCR Processing — AI Module

## 2.1 Overview
The OCR module converts uploaded images to machine-readable text. It runs asynchronously in a background job queue, supports two processing tiers, and produces a confidence score for every extracted field.

## 2.2 Processing Pipeline

```
Raw Image
    ↓
Preprocessing (server-side)
  - Convert to grayscale
  - Deskew (correct tilt up to ±15°)
  - Denoise
  - Adaptive thresholding
  - Resize to optimal OCR resolution
    ↓
OCR Engine (primary: Google Vision API)
    ↓
Confidence scoring per field
    ↓
Fallback OCR (Tesseract) if Vision API fails or returns confidence < 40%
    ↓
Structured text output → passed to Data Structuring module
```

## 2.3 OCR Engine Strategy

### Primary: Google Vision API
- Use `DOCUMENT_TEXT_DETECTION` mode (designed for dense handwriting)
- Returns bounding boxes and per-character confidence scores
- Rate limit: 1,800 requests/minute (Google free tier: 1,000/month — use paid tier for production)

### Fallback: Tesseract.js (local)
- Triggered when: Google Vision unavailable, API quota exceeded, or primary confidence < 40%
- Language models: `eng` + `hin` (Hindi support for Indian field reports)
- Mode: `PSM_AUTO` (automatic page segmentation)
- Runs on the Node.js server via `node-tesseract-ocr` wrapper

### Fallback Hierarchy
```
Google Vision API
    ↓ (if fails or low confidence)
Tesseract (local)
    ↓ (if confidence still < 40%)
Flag for manual entry — do not block the user, open blank editable form
```

## 2.4 Confidence Scoring

Each extracted field receives a confidence score (0–100%):

| Score Range | Meaning | UI Indicator |
|---|---|---|
| 80–100% | High confidence | Green field, auto-filled |
| 50–79% | Medium confidence | Orange field, auto-filled with warning |
| 0–49% | Low confidence | Red field, left blank with prompt to fill manually |

An overall document confidence score is computed as the average of all field scores. This is shown prominently on the Preview screen.

## 2.5 Job Queue Design

- **Queue:** Bull (Redis-backed) for reliable job processing
- **Workers:** 2 concurrent OCR workers (configurable)
- **Job TTL:** 30 minutes (auto-cleanup of stale jobs)
- **Retry policy:** Retry failed jobs up to 3 times with exponential backoff (5s, 15s, 45s)
- **Priority:** High-urgency uploads skip to front of queue (set when user indicates urgency at upload)

## 2.6 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| Google Vision API down | No OCR | Automatic fallback to Tesseract; user sees no disruption |
| API quota exhausted | Blocked uploads | Monitor quota usage; alert admin at 80% usage; Tesseract fallback activates |
| Very messy handwriting | <40% confidence | Manual entry mode triggered; no silent bad data enters DB |
| Image is a PDF scan | Unsupported format | Convert to PNG server-side using `sharp` before OCR |
| Non-English text | Wrong characters | Tesseract multilingual model loaded; Google Vision auto-detects language |
| Queue backup (100+ jobs) | Long wait times | Notify user of estimated wait: "Your report is #12 in queue (~4 minutes)"; allow email notification |

---

# 3. Data Structuring & Validation

## 3.1 Overview
Raw OCR text is parsed into structured fields using a combination of regex patterns, keyword matching, and a lightweight NLP prompt sent to an LLM (GPT-3.5-turbo or Claude Haiku — cheap, fast). The output is validated, sanitized, and stored in MongoDB.

## 3.2 Extracted Fields

| Field | Type | Source | Validation |
|---|---|---|---|
| `location` | String | OCR text | Min 3 chars, max 200 chars |
| `latitude` | Float | Geocoding API (from location string) | -90 to 90 |
| `longitude` | Float | Geocoding API (from location string) | -180 to 180 |
| `problem_type` | Enum | OCR + keyword match | Must be: `water`, `health`, `education`, `shelter`, `food`, `other` |
| `urgency_level` | Enum | OCR + keyword match | Must be: `high`, `medium`, `low` |
| `people_affected` | Integer | OCR text | 1 to 1,000,000 |
| `description` | String | OCR text (full) | Max 2000 chars |
| `ngo_name` | String | Upload metadata / OCR | Max 100 chars |
| `reported_at` | Date | Upload timestamp | Auto-set, not editable |
| `ocr_confidence` | Float | OCR module | 0.0 to 1.0 |
| `status` | Enum | System | `pending`, `assigned`, `resolved` |

## 3.3 Extraction Logic

**Step 1 — Keyword Matching (fast, no API cost):**
```
water keywords: ["well", "water", "pump", "drought", "contamination", "flood"]
health keywords: ["sick", "disease", "hospital", "medicine", "malaria", "fever"]
education keywords: ["school", "children", "teacher", "classroom", "books"]
shelter keywords: ["house", "roof", "shelter", "homeless", "damaged"]
urgency keywords: high=["urgent", "emergency", "critical", "immediate", "dying"]
                  low=["minor", "stable", "when possible", "not critical"]
```

**Step 2 — LLM Structuring (fallback for ambiguous text):**
- Send raw OCR text to LLM with a structured JSON output prompt
- Extract: location, problem type, urgency, people affected
- Only called if keyword matching confidence < 70%
- Max tokens: 200 (keep cost and latency low)

**Step 3 — Geocoding:**
- Send `location` string to Google Maps Geocoding API
- Store `lat`/`lng` for map display
- Fallback: Nominatim (OpenStreetMap) if Google API unavailable

## 3.4 Preview & Edit Screen

After extraction, the user sees all fields in an editable form **before** final submission:

- Auto-filled fields shown with confidence colour coding (green/orange/red border)
- Low-confidence fields scrolled to automatically
- Dropdown for `problem_type` and `urgency_level`
- Number input for `people_affected` (min: 1)
- Map pin preview showing geocoded location (user can drag pin to correct it)
- "Submit Report" button disabled until all required fields are filled

## 3.5 Data Sanitisation

Before writing to the database:

- Trim all string fields
- Strip HTML/script tags (XSS prevention)
- Validate enums strictly — reject any value not in allowed list
- Cap numeric fields to defined ranges
- Store original OCR text separately for audit purposes

## 3.6 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| LLM returns malformed JSON | Parse error | Wrap parse in try/catch; fall back to keyword-only extraction |
| Geocoding returns no result | Missing coordinates | Store `lat: null, lng: null`; show text-only in dashboard; prompt user to drop pin on map |
| Ambiguous problem type | Wrong categorisation | Allow multiple tags (comma-separated) e.g., `water,health` |
| People affected field blank | Missing data | Default to `null`, not `0` — distinguishes "unknown" from "zero" |
| Duplicate report submission | Inflated data | Hash key fields (location + problem_type + date); warn user if likely duplicate |

---

# 4. SVI Priority Scoring Engine

## 4.1 Overview
The Social Vulnerability Index (SVI) score is computed per issue and per location cluster. It drives task prioritisation, volunteer assignment order, and dashboard severity indicators.

## 4.2 Base Formula

```
SVI = Water_Score + Health_Score + Housing_Score
```

Each component is a weighted score, not a simple flag:

```
Water_Score   = (urgency_weight × urgency) + (scale_weight × people_affected_normalized)
Health_Score  = (urgency_weight × urgency) + (scale_weight × people_affected_normalized)
Housing_Score = (urgency_weight × urgency) + (scale_weight × people_affected_normalized)
```

## 4.3 Scoring Weights

| Variable | Weight |
|---|---|
| `urgency_weight` | 0.6 |
| `scale_weight` | 0.4 |
| Urgency: High | 3 |
| Urgency: Medium | 2 |
| Urgency: Low | 1 |

### People Affected Normalisation
```
people_affected_normalized = min(people_affected / 1000, 1.0)
```
Caps the scale contribution at 1000 people to prevent extreme outliers from dominating.

## 4.4 Composite SVI (Location Cluster)

When multiple issues exist for the same location (within 1km radius), a cluster SVI is computed:

```
Cluster_SVI = Σ(individual SVIs) × density_multiplier
density_multiplier = 1 + (0.1 × issue_count)  // capped at 2.0
```

## 4.5 SVI Tiers

| SVI Range | Tier | Colour | Action |
|---|---|---|---|
| 7.0 – 10.0 | Critical | Red `#FF3B30` | Immediate assignment, admin alert |
| 4.0 – 6.9 | High | Orange `#FF9F0A` | Assign within 30 minutes |
| 2.0 – 3.9 | Medium | Yellow `#FFD60A` | Assign within 2 hours |
| 0.0 – 1.9 | Low | Green `#34C759` | Schedule within 24 hours |

## 4.6 Score Recalculation

- SVI is recalculated **on every update** to an issue (urgency change, people count change)
- Scores are stored in the database but treated as **derived data** — always recalculated from source fields, never manually edited
- Recalculation takes <50ms (pure math, no external calls)

## 4.7 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| `people_affected` is null | Division by zero / NaN | Treat null as 0 in formula; flag in UI as "Scale unknown" |
| All issues score as Critical | Alert fatigue | Enforce relative ranking in dashboard: always show top 3 as urgent, never all 20 |
| SVI not updated after edit | Stale scores | Use Mongoose post-save hook to auto-trigger recalculation |
| Score inflation from duplicates | False prioritisation | Duplicate detection (Section 3.6) prevents double-counting |

---

# 5. Volunteer Matching System

## 5.1 Overview
When a task is created, the system finds the best available volunteer using a scoring model that weighs proximity, skill match, and current workload. Assignment is automatic for Critical/High tasks and suggested (not forced) for Medium/Low tasks.

## 5.2 Volunteer Data Model

```typescript
{
  id: string;
  name: string;
  lat: number;
  lng: number;
  skills: ("water" | "health" | "education" | "shelter" | "food" | "logistics")[];
  active_tasks: number;        // current assigned, uncompleted tasks
  max_tasks: number;           // capacity (default: 3)
  available: boolean;          // manually toggled by volunteer
  last_active: timestamp;      // used to detect stale availability
  contact_email: string;
  contact_phone: string;
}
```

## 5.3 Matching Algorithm

```
1. Filter pool:
   - available = true
   - active_tasks < max_tasks
   - last_active within 24 hours (prevent ghost assignments)

2. For each candidate, compute match score:
   match_score = (proximity_score × 0.5) + (skill_score × 0.3) + (workload_score × 0.2)

   proximity_score = 1 - min(distance_km / 50, 1.0)
     // Decays linearly; 0km = 1.0, 50km = 0.0

   skill_score = 1.0 if volunteer.skills includes issue.problem_type
              = 0.5 if volunteer has a related skill (e.g., health → water)
              = 0.0 otherwise

   workload_score = 1 - (active_tasks / max_tasks)
     // Full capacity = 0.0; empty = 1.0

3. Sort candidates by match_score descending.

4. Assign top candidate.

5. If no candidates available → add to unassigned queue, alert admin.
```

## 5.4 Assignment Flow

```
New issue created (SVI computed)
      ↓
If SVI >= 4.0 (Critical/High):
  → Auto-assign best match
  → Notify volunteer via email + SMS
  → Show assigned volunteer on dashboard
      ↓
If SVI < 4.0 (Medium/Low):
  → Show top 3 suggested volunteers
  → Admin confirms assignment
      ↓
Volunteer accepts/declines (via mobile link in notification email)
  → Accept: task confirmed, status = "assigned"
  → Decline: next best candidate offered (up to 3 attempts)
  → No response in 15 minutes: escalate to admin
```

## 5.5 Notification System

| Event | Channel | Template |
|---|---|---|
| Task assigned | Email + SMS | "New task: [Problem Type] in [Location]. SVI: [Score]. View details: [link]" |
| Task declined (admin alert) | Email | "Volunteer [Name] declined task #[ID]. Reassignment needed." |
| No volunteer available | Admin email | "Unassigned task #[ID] — Critical issue with no available volunteers." |
| Task resolved | Email (to NGO) | "Issue #[ID] has been marked resolved by [Volunteer Name]." |

Email: Nodemailer (SMTP) | SMS: Twilio (fallback: skip SMS, email only in dev)

## 5.6 Volunteer Availability Decay

Volunteers who haven't been active for 48+ hours are automatically marked `available = false` to prevent dead assignments. They receive an email: "Your availability has been paused. Click here to reactivate."

## 5.7 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| No volunteers available | Task stuck | Auto-alert admin + escalate to regional coordinator; issue stays in "Unassigned" queue with visual indicator |
| Volunteer GPS is stale | Wrong proximity score | Show "Location updated X hours ago" on volunteer profile; flag if >6 hours old |
| Volunteer accepts then goes offline | Task abandoned | Auto-check-in prompt after 2 hours; if no response, reassign |
| 50 tasks created simultaneously | Match algorithm overloads | Run matching in job queue, not request cycle; batch process in groups of 10 |
| Two tasks assigned to same volunteer simultaneously | Overcapacity | Use atomic MongoDB `findOneAndUpdate` with `active_tasks < max_tasks` condition to prevent race conditions |

---

# 6. Dashboard

## 6.1 Overview
The dashboard is the operations control centre. It gives NGO coordinators and administrators a real-time view of all issues, volunteer assignments, and system health. It must load fast, handle 500+ data points without freezing, and surface the most critical information first.

## 6.2 Layout

```
┌─────────────────────────────────────────────────────────┐
│  Header: RELIX logo | Active Alerts badge | User menu   │
├──────────────┬──────────────────────────────────────────┤
│              │  Metrics Row (4 KPI cards)               │
│   Sidebar    ├────────────────┬────────────────────────┤
│   - Dashboard│  Problem Map   │  AI Insights Panel     │
│   - Upload   │  (60% width)   │  (40% width)           │
│   - Issues   │                │                        │
│   - Volunteers│               │                        │
│   - Settings ├────────────────┴────────────────────────┤
│              │  Charts Section (Bar + Line)             │
└──────────────┴──────────────────────────────────────────┘
```

## 6.3 Metrics Row (4 KPI Cards)

| Card | Value | Update Frequency |
|---|---|---|
| Total Reports | Count of all issues | Real-time |
| Critical Issues | Count where SVI >= 7.0 | Real-time |
| People Affected | Sum of people_affected | Real-time |
| Active NGOs | Count of distinct ngo_name | Every 5 minutes |

Numbers animate from 0 to value on first load (2 second ease-out). Counter updates pulse briefly (flash green or red) when values change.

## 6.4 Problem Map

- **Engine:** Leaflet (open source, no token required for MVP) with OpenStreetMap tiles
- **Default centre:** [17.385, 78.487] (Hyderabad)
- **Default zoom:** 10

### Markers
- Colour-coded by `problem_type`: Water = Blue, Health = Red, Shelter = Yellow, Education = Purple, Food = Orange
- Size-scaled by SVI score (larger pin = higher SVI)
- Clusters form when markers are within 50px of each other at current zoom
- Cluster bubble shows count and dominant colour (most frequent problem type in cluster)

### Popups (on marker click)
```
Location: [location string]
Problem: [problem_type] | Urgency: [urgency_level]
People Affected: [number]
SVI Score: [score] ([tier])
Volunteer: [name] or "Unassigned"
[View Full Details →]
```

### Filters (top of map)
- Problem Type (multi-select checkboxes)
- Urgency Level (High / Medium / Low toggles)
- Status (Pending / Assigned / Resolved)
- Date Range (last 7 days / 30 days / all time)

Filters apply instantly via client-side filtering (no new API call).

## 6.5 AI Insights Panel

Displays 3–5 auto-generated insights refreshed every 5 minutes:

| Insight Type | Example |
|---|---|
| Hotspot detection | "3 water issues in Secunderabad within 2km — possible contamination cluster" |
| Surge alert | "Health reports up 40% in the last 24 hours" |
| Volunteer gap | "No volunteers available in Medchal zone (2 critical issues)" |
| Resolution rate | "12 issues resolved today — highest this week" |
| Prediction | "Based on current rate, 20 new reports expected by Friday" |

Insights are generated by a lightweight prompt to the LLM using aggregated metrics (no PII sent). Each insight shows its source data point so users can verify.

## 6.6 Task List

- Sortable columns: Location, Problem Type, SVI Score, Status, Created At
- Default sort: SVI Score descending (most critical first)
- Pagination: 25 rows per page (not infinite scroll — for printability)
- Row actions: View Details, Assign Volunteer, Mark Resolved
- Bulk actions: Select multiple → Assign to Volunteer / Export CSV
- Row colour: Critical=light red background, High=light orange, rest=white

## 6.7 Charts Section

**Bar Chart — Issues by Problem Type:**
- X-axis: problem_type categories
- Y-axis: count
- Colour: matches map marker colours
- Tooltip: exact count + percentage of total

**Line Chart — Issues Over Time:**
- X-axis: date (last 14 days)
- Y-axis: new issues created per day
- Two lines: Total vs Resolved (show resolution progress)
- Dotted line for 7-day moving average

## 6.8 Real-Time Updates

- Dashboard polls `GET /api/analytics` every 30 seconds
- WebSocket (Socket.io) connection for live alerts: new Critical issues trigger a toast notification immediately without requiring poll cycle
- If WebSocket disconnects: silent fallback to 15-second polling, reconnect in background

## 6.9 Pressure Points & Solutions

| Pressure Point | Risk | Solution |
|---|---|---|
| 500+ markers on map | Browser freeze | Leaflet.markercluster plugin; never render >200 unclustered markers |
| Dashboard auto-refresh interrupts user | Loses scroll position | Update data in background state; only re-render changed components (React key stability) |
| Slow analytics query | >3s load time | MongoDB aggregation pipeline with indexes on `status`, `urgency_level`, `created_at`; cache in Redis for 30 seconds |
| User with slow internet | Dashboard feels broken | Show skeleton loaders for each section; load metrics first (fastest), map second, charts third, insights last |
| Admin leaves dashboard open overnight | Memory leak / stale data | Pause polling when tab is not visible (`document.visibilityState`); resume on focus |

---

# 7. Tech Stack — Detailed

## 7.1 Frontend

| Tool | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool (fast HMR) |
| Tailwind CSS | 3.x | Utility-first styling |
| Zustand | 4.x | Lightweight global state |
| Recharts | 2.x | Dashboard charts |
| Leaflet | 1.9.x | Map rendering (free, no token) |
| Leaflet.markercluster | 1.5.x | Map clustering |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client with interceptors |
| Socket.io-client | 4.x | Real-time updates |
| React Hook Form | 7.x | Form state + validation |
| Zod | 3.x | Schema validation (client + shared) |

## 7.2 Backend

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| Express | 4.x | HTTP framework |
| Socket.io | 4.x | WebSocket server |
| Bull | 4.x | Redis-backed job queue |
| Multer | 1.x | File upload middleware |
| Sharp | 0.33.x | Image preprocessing |
| node-tesseract-ocr | 2.x | Local OCR fallback |
| Nodemailer | 6.x | Email notifications |
| Twilio SDK | 4.x | SMS notifications (optional) |
| jsonwebtoken | 9.x | Auth tokens |
| Helmet | 7.x | HTTP security headers |
| express-rate-limit | 7.x | Rate limiting |
| Winston | 3.x | Structured logging |

## 7.3 Database

| Tool | Version | Purpose |
|---|---|---|
| MongoDB | 7.x | Primary document database |
| Mongoose | 8.x | ODM + schema validation |
| Redis | 7.x | Job queue backend + API cache |

### MongoDB Indexes (Required for Performance)
```javascript
issues.createIndex({ urgency_level: 1, status: 1 })
issues.createIndex({ created_at: -1 })
issues.createIndex({ lat: 1, lng: 1 }, { "2dsphere": true })
issues.createIndex({ ngo_name: 1 })
volunteers.createIndex({ lat: 1, lng: 1 }, { "2dsphere": true })
volunteers.createIndex({ available: 1, active_tasks: 1 })
```

## 7.4 External APIs

| API | Use Case | Fallback |
|---|---|---|
| Google Vision API | Primary OCR | Tesseract (local) |
| Google Maps Geocoding | Location → coordinates | Nominatim (OpenStreetMap) |
| OpenAI / Claude API | Data structuring + insights | Keyword matching only |
| Twilio | SMS notifications | Email only |

## 7.5 Infrastructure (MVP)

| Component | Service |
|---|---|
| App hosting | Railway / Render (free tier viable for demo) |
| Database | MongoDB Atlas (free M0 cluster for demo) |
| Redis | Railway Redis / Upstash |
| File storage | AWS S3 or Cloudinary (uploaded images) |
| Environment secrets | `.env` + Railway/Render environment variables |

---

# 8. Resilience & Fault Tolerance

## 8.1 API Error Handling

All API responses follow a consistent shape:

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": { "code": "OCR_FAILED", "message": "Could not extract text. Please enter details manually.", "retryable": true } }
```

Frontend shows user-friendly messages — never raw error objects or stack traces.

## 8.2 Circuit Breaker Pattern

For external APIs (Google Vision, LLM, Geocoding):
- Track failure count per service
- After 5 consecutive failures: open circuit (stop calling, use fallback immediately)
- After 60 seconds: half-open (allow one test request)
- On success: close circuit (resume normal operation)

Implemented via `opossum` library or custom middleware.

## 8.3 Rate Limiting

| Endpoint | Limit | Window |
|---|---|---|
| `POST /api/upload` | 10 requests | 15 minutes per IP |
| `POST /api/issues` | 30 requests | 1 minute per IP |
| `GET /api/analytics` | 60 requests | 1 minute per IP |
| All endpoints | 500 requests | 1 hour per IP |

Returns `429 Too Many Requests` with `Retry-After` header.

## 8.4 Input Sanitisation

- All string inputs: strip HTML tags, trim whitespace, limit length
- File uploads: validate magic bytes (not just extension), scan with `file-type` library
- MongoDB queries: use Mongoose schema typing (no raw query string injection)
- All API inputs validated with Zod schemas before processing

## 8.5 Graceful Degradation Matrix

| Component Fails | System Behaviour |
|---|---|
| Google Vision API | Tesseract fallback; no user disruption |
| LLM structuring API | Keyword-only extraction; slightly lower accuracy |
| Geocoding API | Issue saved without coordinates; shows text-only in dashboard |
| Redis / Bull queue | Jobs run synchronously (slower but functional) |
| WebSocket server | Dashboard falls back to polling; no disruption |
| MongoDB is slow | Redis cache serves stale analytics (max 30s old) |
| SMS (Twilio) fails | Email-only notifications; admin alerted |

## 8.6 Logging & Monitoring

- All errors logged with Winston (JSON format, includes job ID, user ID, timestamp)
- Log levels: `error`, `warn`, `info`, `debug`
- Log storage: local files in dev; centralised in prod (Papertrail / Logtail free tier)
- Critical errors (circuit breaker open, no volunteers available) trigger admin email alert

## 8.7 Security Checklist

- [ ] JWT authentication on all non-public endpoints
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] `Helmet.js` on all Express responses
- [ ] CORS: whitelist frontend domain only
- [ ] Rate limiting on all endpoints
- [ ] File upload: size limit + type validation + virus scan (ClamAV optional)
- [ ] MongoDB: no `$where` queries; Mongoose validation on all writes
- [ ] Environment variables: no secrets in code or version control
- [ ] Dependency audit: `npm audit` run before each deployment

---

# 9. Success Criteria & Acceptance Tests

## 9.1 Performance Targets

| Metric | Target | Measurement Method |
|---|---|---|
| OCR accuracy | ≥ 75% field-level accuracy | Compare extracted vs manually verified on 20 test forms |
| Task assignment time | < 3 minutes from upload to assignment | End-to-end timer in staging |
| Dashboard load time | < 2.5 seconds (First Contentful Paint) | Lighthouse audit |
| API response time (p95) | < 500ms for read endpoints | Load test with 50 concurrent users |
| Map load with 200 markers | < 1 second render | Browser performance profiling |
| Demo throughput | 10–20 tasks processed without failure | Full demo run script |

## 9.2 Acceptance Tests (Demo Scenarios)

### Test 1 — Happy Path
1. Upload a clear handwritten form image
2. OCR runs; fields extracted with >80% confidence
3. Preview shown; user confirms and submits
4. Issue appears on map within 5 seconds
5. Volunteer assigned automatically (if Critical) or suggested (if Medium)
6. Volunteer notification sent

**Pass criteria:** All 6 steps complete without error in under 3 minutes

### Test 2 — Low Quality Image
1. Upload a blurry or tilted image
2. OCR extracts partial data (some fields blank or orange)
3. User completes missing fields manually and submits
4. Issue created correctly

**Pass criteria:** System never crashes; user can always complete submission manually

### Test 3 — No Volunteers Available
1. Create a Critical issue
2. Ensure volunteer pool is empty (test mode)
3. System should: show "Unassigned — No volunteers available" on dashboard; admin email triggered

**Pass criteria:** Task is not lost; admin is notified within 1 minute

### Test 4 — Concurrent Uploads
1. Upload 5 files simultaneously from two different browser tabs
2. All 5 jobs process independently
3. Dashboard shows all 5 issues after completion

**Pass criteria:** No data corruption, no duplicate issues, no 500 errors

### Test 5 — Dashboard Under Load
1. Insert 200 mock issues into MongoDB
2. Open dashboard
3. Measure map render time, chart load time, list pagination

**Pass criteria:** All sections load within 3 seconds; browser CPU < 80%

## 9.3 Definition of Done (Feature-Level)

A feature is complete when:
- [ ] Functionality works end-to-end in staging environment
- [ ] Error states are handled and shown to user (not silent)
- [ ] Loading states are implemented (no blank screens)
- [ ] Mobile viewport renders correctly (≥320px width)
- [ ] No console errors or warnings in browser
- [ ] API endpoints have input validation
- [ ] Acceptance test for the feature passes

---

**Document Version:** 1.0  
**Status:** MVP Specification — Production-Hardened  
**Estimated Build Time:** 10–14 days (2 full-stack developers)  
**Last Updated:** April 2026