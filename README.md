<p align="center">
  <img src="client/public/relix_logo-removebg-preview.svg" alt="RELIX Logo" width="220" />
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
  <em>Google Developer Groups Solution Challenge 2026</em>
</p>

---

## Overview

RELIX is an AI-powered platform for NGO workers, relief coordinators, volunteers, and civic tech teams. It converts handwritten field reports into prioritized digital intelligence so aid can reach the communities that need it most.

---

## Problem

During emergencies, critical field data is still captured on paper. That means:

- **Delayed action** — valuable time is lost while data is manually digitized.
- **Poor resource allocation** — responders lack clear priority and location context.
- **Invisible communities** — vulnerable populations remain unserved without a digital presence.

---

## Solution

RELIX turns analog reports into actionable response workflows:

1. **Upload** — hand-filled forms are captured by NGO workers.
2. **Extract** — OCR and LLM processing structure the data.
3. **Prioritize** — SVI scoring ranks incidents by urgency and scale.
4. **Coordinate** — volunteers and response teams are aligned in real time.

---

## <a id="features"></a>Features

### Real-Time Dashboard
- Live incident tracking with severity and location context
- AI hotspot detection and surge analysis
- Volunteer capacity and gap monitoring

### AI-Powered Data Pipeline
- Google Vision OCR primary processing
- Tesseract fallback for handwritten forms
- Claude API for structured data extraction
- Field-level confidence scoring

### Social Vulnerability Index (SVI)
- Urgency weighted at 60% and scale at 40%
- Four-tier risk classification: Critical, High, Medium, Low
- Auto recalculation on every report update

### Volunteer Dispatch
- Proximity-aware matching using Haversine distance
- Skill matching and workload balancing
- Critical cases auto-assigned, lower priority reviewed by admins
- Notification support for assignment alerts

---

## <a id="architecture"></a>Architecture

RELIX is built with a modular architecture separating the frontend, API backend, and AI service layers.

```
┌──────────────────────────────────────────────────────────────┐
│                        RELIX Platform                        │
├──────────────┬───────────────────────┬───────────────────────┤
│   Frontend   │    Backend (API)      │    AI Service         │
│   Next.js    │    Node.js/Express    │    FastAPI + Claude   │
│   React 19   │    Firebase Auth      │    Google Vision OCR  │
│   Mapbox GL  │    Firestore DB       │    Tesseract fallback │
│   Recharts   │    SVI Engine         │    LLM Structuring    │
│   Zustand    │    Volunteer Matcher  │                       │
├──────────────┴───────────────────────┴───────────────────────┤
│                    Firebase Platform                       │
│       Hosting • Authentication • Cloud Firestore            │
└──────────────────────────────────────────────────────────────┘
```

---

## <a id="tech-stack"></a>Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS 4
- Zustand
- Recharts

### Backend
- Node.js + Express
- Firebase Auth
- Cloud Firestore

### AI / OCR
- Google Vision API
- Tesseract OCR
- Claude API
- FastAPI

### Infrastructure
- Firebase Hosting
- Firestore security rules
- Cloud Build CI/CD

---

## <a id="getting-started"></a>Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- Firebase CLI installed globally
- Google Cloud credentials for Vision API
- Claude API key for LLM extraction

### Installation

```bash
git clone https://github.com/chandrakoushik487/relix-main.git
cd relix-main
npm install
cd client
npm install
```

### Development

```bash
# From project root
npm run dev
```

### Production Build

```bash
cd client
npm run build
```

---

## Project Structure

```
relix-main/
├── client/                  # Next.js frontend application
├── server/                  # Node.js / Express API server
├── ai-service/              # Python FastAPI AI microservice
├── functions/               # Firebase cloud functions
├── docs/                    # Project documentation
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
└── firestore.indexes.json   # Firestore indexes
```

---

## Links
- Live Demo: https://relix-mvp-submission.web.app
- GitHub: https://github.com/chandrakoushik487/relix-main

---

## Mission
RELIX is built to ensure no community goes unserved during a disaster because their field reports could not be digitized fast enough.

<p align="center">
  Built with ❤️ for communities that need it most
</p>
