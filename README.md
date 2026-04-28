<p align="center">
  <img src="client/public/relix_logo-removebg-preview.svg" alt="RELIX Logo" width="80" height="80" />
</p>

<h1 align="center">RELIX — Relief Intelligence Exchange</h1>

<p align="center">
  <strong>AI-powered disaster response and civic issue coordination platform</strong>
</p>

<p align="center">
  <a href="https://relix-mvp-submission.web.app">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#architecture">🏗️ Architecture</a> •
  <a href="#tech-stack">⚙️ Tech Stack</a> •
  <a href="#getting-started">🚀 Getting Started</a>
</p>

<p align="center">
  <em>Google Developer Groups — Solution Challenge 2026</em>
</p>

---

## 🌍 Problem Statement

During natural disasters and civic emergencies, **field-level data** — handwritten complaint forms, paper registries, and manual surveys — remains trapped in analog format. NGOs and relief agencies lack real-time visibility into which communities need help most, leading to:

- **Delayed response** — hours lost manually digitizing reports
- **Misallocated resources** — volunteers dispatched without priority data
- **Invisible communities** — vulnerable populations with no digital footprint go unserved

## 💡 Our Solution

**RELIX** bridges the gap between offline field reports and intelligent digital coordination:

1. **Upload** — NGO workers photograph handwritten forms and upload them
2. **AI Extraction** — OCR + LLM pipeline extracts structured data (location, urgency, issue type)
3. **Prioritize** — A Social Vulnerability Index (SVI) scores each issue by urgency and scale
4. **Coordinate** — Dashboard maps hotspots, assigns volunteers, and tracks resolution in real-time

## 🎯 UN Sustainable Development Goals

| SDG | Alignment |
|-----|-----------|
| **SDG 3** — Good Health & Well-being | Health issue tracking, volunteer dispatch for medical crises |
| **SDG 6** — Clean Water & Sanitation | Water contamination detection and priority response |
| **SDG 11** — Sustainable Cities & Communities | Civic issue mapping, infrastructure damage tracking |
| **SDG 17** — Partnerships for the Goals | Connecting NGOs, volunteers, and communities on one platform |

---

## <a id="features"></a>✨ Key Features

### 📊 Real-Time Dashboard
- **4 KPI cards** — Total reports, critical issues, people affected, active NGOs
- **Interactive map** — Color-coded markers by issue type, clustered view, severity-based sizing
- **AI Insights panel** — Auto-generated hotspot detection, surge alerts, volunteer gap analysis
- **Charts** — Issue distribution by type, trend lines over time

### 🤖 AI-Powered Data Pipeline
- **OCR Processing** — Google Vision API (primary) + Tesseract (fallback) for handwritten text
- **LLM Structuring** — Converts messy OCR output into structured fields (location, urgency, type)
- **Confidence scoring** — Field-level accuracy indicators (green/orange/red)
- **Graceful degradation** — Falls back silently when APIs are unavailable

### 📈 Social Vulnerability Index (SVI)
- Weighted scoring: urgency (60%) + scale (40%)
- Location clustering with density multipliers
- 4-tier classification: Critical → High → Medium → Low
- Auto-recalculated on every update

### 🤝 Volunteer Matching
- Proximity-based scoring (Haversine distance)
- Skill matching and workload balancing
- Auto-assign for critical issues, admin-confirm for lower priority
- Notification via email

### 🗺️ Emergency Map
- Live geographic view of all reported issues
- Filter by issue type, urgency, status, and date range
- Cluster view for dense areas

### 📋 Incident Feed & Data Lake
- Chronological feed of all incoming reports
- Bulk data exploration and CSV export

---

## <a id="architecture"></a>🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        RELIX Platform                        │
├──────────────┬───────────────────────┬───────────────────────┤
│   Frontend   │    Backend (API)      │    AI Service         │
│   Next.js    │    Node.js/Express    │    FastAPI + Claude    │
│   React 19   │    Firebase Auth      │    Google Vision OCR   │
│   Mapbox GL  │    Firestore DB       │    Tesseract fallback  │
│   Recharts   │    SVI Engine         │    LLM Structuring     │
│   Zustand    │    Volunteer Matcher  │                       │
├──────────────┴───────────────────────┴───────────────────────┤
│                    Firebase Platform                          │
│       Hosting  •  Authentication  •  Cloud Firestore          │
└──────────────────────────────────────────────────────────────┘
```

---

## <a id="tech-stack"></a>⚙️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework with static export |
| React 19 | UI component library |
| Tailwind CSS 4 | Utility-first styling |
| Zustand | Lightweight state management |
| TanStack Query | Server state & caching |
| Recharts | Data visualizations |
| Mapbox GL JS | Interactive maps |
| Lucide React | Icon system |
| React Hook Form + Zod | Form handling & validation |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API server |
| Firebase Auth | User authentication |
| Cloud Firestore | Real-time NoSQL database |
| Socket.io | WebSocket real-time updates |

### AI / OCR
| Technology | Purpose |
|-----------|---------|
| Google Vision API | Primary OCR engine |
| Tesseract | Fallback OCR (offline-capable) |
| Claude API | LLM data structuring |
| FastAPI (Python) | AI microservice |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Firebase Hosting | Frontend deployment (CDN + SSL) |
| Firebase Auth | Identity management |
| Cloud Firestore | Scalable document database |

---

## <a id="getting-started"></a>🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- Firebase CLI (`npm i -g firebase-tools`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/relix-main.git
cd relix-main

# Install root dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Configure environment variables
cd ..
cp .env.example .env
# Edit .env with your API keys (Firebase, Mapbox, Google Vision, etc.)
```

### Development

```bash
# Start the frontend dev server
cd client
npm run dev
# → http://localhost:3500
```

### Production Build & Deploy

```bash
# Build the frontend
cd client
npm run build

# Deploy to Firebase Hosting
npx firebase-tools deploy --only hosting:main --project relix-6218b
```

---

## 📁 Project Structure

```
relix-main/
├── client/                  # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router (pages)
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utilities & Firebase config
│   │   └── services/       # API service layer
│   └── public/             # Static assets
├── server/                  # Node.js/Express API server
│   ├── config/             # Database & service config
│   ├── middleware/          # Auth, validation middleware
│   ├── models/             # Data models
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic
│   └── utils/              # Helper functions
├── ai-service/              # Python FastAPI AI microservice
│   └── main.py             # OCR + LLM pipeline
├── docs/                    # Project documentation
│   └── internal/           # Design specs & planning docs
├── firebase.json            # Firebase services configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore composite indexes
└── .env.example             # Environment variables template
```

---

## 🔐 Security

- **Authentication** — Firebase Auth with email/password
- **Authorization** — Firestore Security Rules enforce role-based access
- **Input validation** — Zod schemas on client and server
- **XSS prevention** — HTML/script tag stripping on all inputs
- **Rate limiting** — Express rate-limit on all API endpoints
- **HTTPS** — Enforced via Firebase Hosting

---

## 🌐 Live Demo

**MVP Submission:** [https://relix-mvp-submission.web.app](https://relix-mvp-submission.web.app)

**Development Site:** [https://relix-6218b.web.app](https://relix-6218b.web.app)

---

## 📄 License

This project is built for the **Google Developer Groups Solution Challenge 2026**.

---

<p align="center">
  Built with ❤️ for communities that need it most
</p>
