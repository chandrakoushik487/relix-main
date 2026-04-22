# RELIX / VCSIM – MVP TECH STACK
## v2.0 | Optimized for Hackathon Execution & Scalability

### EXECUTIVE SUMMARY
This revised tech stack emphasizes rapid hackathon execution (48 hours) while maintaining production-grade fundamentals. Key improvements include explicit error handling strategies, LLM-powered OCR structuring as a first-class feature, security checkpoints, and team workload allocation timelines.

### STACK PHILOSOPHY
**Core principles:**
* Build working MVP in 24-48 hours
* AI-first design (OCR -> LLM structuring -> actionable data)
* Real-time dashboards & geo-visualization
* Security & error handling from day one
* Scalable architecture (no rewrites post-demo)
* Clean separation of concerns (avoid monoliths)

### SYSTEM ARCHITECTURE
#### High-Level Flow
| Frontend | Node.js API | Python AI | Database |
| :--- | :--- | :--- | :--- |
| React + Vite | Express.js | FastAPI + Claude | MongoDB Atlas |

### FRONTEND STACK
**Core Technologies**
* **Framework:** React + Vite (fast dev, HMR)
* **Styling:** Tailwind CSS (utility-first, no boilerplate)
* **State:** Zustand (UI state) + TanStack Query (API caching)
* **Maps:** Mapbox GL JS (smooth performance, high-impact demo)
* **Charts:** Recharts (React-native visualizations)

### BACKEND STACK (NODE.JS)
**Core**
* **Framework:** Express.js
* **Database ORM:** Mongoose (MongoDB)
* **Logging:** Winston (audit trails)

**Responsibilities**
* REST API endpoints (CRUD for issues, volunteers)
* Data validation & input sanitization
* Business logic: SVI calculation, task prioritization
* Volunteer-task matching algorithm
* Queue management: dispatch images to AI service
* Error handling & retry logic
* API rate limiting & CORS configuration

### AI / OCR PROCESSING STACK
#### Pipeline Architecture
* **Stage 1: Image Upload** > Client compresses; Node.js queues
* **Stage 2: OCR** > Google Vision API (primary) or Tesseract fallback
* **Stage 3: LLM Structuring** > Claude API converts messy text to clean JSON
* **Stage 4: Store & Emit** > Save to MongoDB; WebSocket event to frontend

#### Error Handling Strategy
| Failure | Mitigation | User Experience |
| :--- | :--- | :--- |
| OCR service down | Fallback to Tesseract locally | Status: "Processing... (slower)" |
| LLM structuring fails | Retry with shorter prompt or store raw OCR | Show raw text, allow manual review |
| Low confidence (< 40%) | Flag as requires verification; queue for review | Yellow badge on dashboard |
| Network timeout | Auto-retry up to 3x; log failure | Upload failed, check connection |

### SECURITY CHECKLIST
* **Authentication:** JWT tokens (24hr expiry for demo)
* **API Keys:** Use .env files (Google Vision, Claude, Mapbox)
* **CORS:** Restrict to frontend domain
* **File Uploads:** Validate size (5MB max) and file type
* **Rate Limiting:** 100 req/min per IP
* **HTTPS:** All endpoints TLS-enforced
* **Logging:** Winston for audit trails

### TEAM WORKLOAD ALLOCATION (48-Hour Timeline)
#### Frontend Lead
* **Hours 0-12:** React/Vite setup, page scaffolding
* **Hours 12-30:** Mapbox integration, forms, Zustand
* **Hours 30-48:** Dashboards, WebSocket updates, mobile polish

#### Backend Lead
* **Hours 0-12:** Express/MongoDB schema, auth/JWT
* **Hours 12-30:** CRUD routes, validation, queue system
* **Hours 30-48:** Error handling, logging, performance tuning

#### AI/ML Lead
* **Hours 0-12:** FastAPI boilerplate, Google Vision setup
* **Hours 12-30:** Claude API integration, prompt engineering
* **Hours 30-48:** Tesseract fallback, retry logic, latency optimization

#### DevOps Lead
* **Hours 0-12:** Git repo, env configs, CI/CD
* **Hours 12-30:** Deploy to Vercel/Render, smoke tests
* **Hours 30-48:** Monitor logs, final deployment, demo environment

### DEPLOYMENT STACK
* **Frontend:** Vercel (Vite native support)
* **Node.js Backend:** Render or Railway
* **Python AI:** Render (good Python support)
* **Database:** MongoDB Atlas (free tier)

### PERFORMANCE TARGETS
* **OCR Accuracy:** >= 75% (80% after LLM structuring)
* **API Response Time:** < 500ms (p95)
* **End-to-End (upload to display):** < 10s
* **Dashboard Load:** < 3s
* **Uptime (demo period):** 99%

### KEY DESIGN DECISIONS
* Separate FastAPI service for AI (flexibility + modularity)
* Claude LLM as first-class feature (OCR > structured JSON)
* MongoDB for flexible schema (unstructured OCR data)
* WebSocket for real-time updates
* Error queues for retry-able failures
* Avoid over-engineering (no K8s, no GraphQL)

### FINAL SUMMARY
This stack delivers:
* Fast data ingestion (48hr MVP feasible)
* Intelligent AI pipeline (80%+ accuracy post-LLM)
* Real-time dashboards (WebSocket-powered)
* Geo visualization (high-impact demo)
* Security & error handling (production-ready)

**Outcome:** Build quickly, demo confidently, handle errors gracefully, scale post-demo without rewrites.