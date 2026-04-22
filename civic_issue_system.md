# 🧠 AI-Powered Civic Issue Management System (MVP)

## 📌 Overview
This project aims to digitize handwritten civic issue reports, process them using AI, and efficiently assign tasks to volunteers based on urgency and location.

---

## 🚀 Core Features (MVP)

### 1. 📝 Handwritten Data Upload
- Users can upload images of handwritten complaint forms.
- Supported formats:
  - JPG
  - PNG
- File validation:
  - Max file size limit (e.g., 5MB)
  - Basic image quality check (blur detection optional)
- Drag-and-drop and manual upload supported.

---

### 2. 🤖 OCR Processing (AI Module)
- Extract text from handwritten images using OCR.
- Tools:
  - Tesseract OCR (open-source)
  - Google Vision API (for higher accuracy)
- Steps:
  1. Image preprocessing (grayscale, noise removal)
  2. Text extraction
  3. Confidence score generation
- Store extracted text in database.
- Log OCR accuracy for evaluation.

---

### 3. 📊 Basic Data Structuring
- Parse extracted text into structured fields:
  - 📍 Location (area, pincode, coordinates if possible)
  - ⚠️ Problem Type:
    - Water
    - Health
    - Education
    - Housing
    - Others
  - 🚨 Urgency Level:
    - Low
    - Medium
    - High
- Use keyword-based or simple ML classification.
- Handle missing or unclear fields with fallback logic.

---

### 4. 📈 Simple SVI (Social Vulnerability Index)
- Calculate priority score using:

  SVI = Water Issue + Health Issue + Housing Issue

- Example scoring:
  - Water Issue → +2
  - Health Issue → +3
  - Housing Issue → +2
- Normalize score (e.g., 0–10 scale).
- Higher SVI = Higher priority.

---

### 5. 🤝 Volunteer Matching
- Assign tasks to nearest available volunteers.
- Matching logic:
  - Distance (using coordinates)
  - Availability status
  - Skill/category match (optional)
- Features:
  - Auto-assignment
  - Manual override option
- Task queue sorted by:
  - Urgency level
  - SVI score

---

### 6. 📍 Dashboard
- Central control panel for monitoring.

#### Features:
- 🗺️ Interactive Map:
  - Display issue locations
  - Color-coded markers (based on urgency)
- 📋 Task List:
  - Filter by status (Pending, Assigned, Completed)
  - Sort by priority
- 👤 Volunteer Panel:
  - Assigned tasks
  - Status tracking
- 📊 Basic Analytics:
  - Number of issues
  - Resolution rate
  - Average response time

---

## 🧰 Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- Firebase (Cloud Firestore & Authentication)

### OCR
- Tesseract OCR
- Google Vision API

### Maps & Location
- Leaflet.js
- Mapbox

---

## 🎯 Success Criteria

- OCR Accuracy ≥ 75%
- Task assignment within 2–3 minutes
- Successfully process 10–20 tasks in demo
- Accurate location detection for at least 80% of entries
- Volunteer assignment efficiency ≥ 90%

---

## 🔮 Future Enhancements (Post-MVP)

- Advanced ML model for text classification
- Local community voting system for issue validation
- Offline data collection + sync support
- Anti-corruption layer (multi-verification system)
- Mobile app version (React Native)
- Advanced analytics dashboard with trends
---

## 🧪 Demo Flow

1. User uploads handwritten complaint
2. OCR extracts text
3. System structures data
4. SVI score is calculated
5. Task is created and prioritized
6. Volunteer is assigned
7. Dashboard updates in real-time

---

## 💡 Key Value Proposition
- Bridges gap between offline complaints and digital systems
- Enables faster response to civic issues
- Scalable for rural and urban environments
