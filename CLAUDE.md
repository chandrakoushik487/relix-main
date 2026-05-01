# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (client/)
- Start dev server: `cd client && npm run dev` (runs on http://localhost:3500)
- Build for production: `cd client && npm run build`
- Lint: `cd client && npm run lint` (uses ESLint)
- Install dependencies: `npm install` (run from client/ directory)

### Backend (server/)
- Start dev server: `cd server && npm run dev` (uses node --watch for auto-restart on port 5000)
- Start production: `cd server && npm run start`
- Install dependencies: `npm install` (run from server/ directory)

### AI Service (ai-service/)
- Start service: `cd ai-service && uvicorn main:app --host 0.0.0.0 --port 8000`
- Install dependencies: `cd ai-service && pip install -r requirements.txt`
- Health check: `GET http://localhost:8000/health` returns {"status": "OK"}

### Project-wide Setup
1. Install all dependencies:
   ```
   npm install
   cd client && npm install
   cd server && npm install
   cd ai-service && pip install -r requirements.txt
   ```
2. Environment: Copy `.env.example` to `.env` and fill in required variables:
   - Firebase configuration (API keys, project ID, etc.)
   - Mapbox access token
   - Google Vision API credentials
   - Claude API key
   - SMTP credentials (for email notifications)
   - Twilio credentials (optional, for SMS)
   - JWT secret

## Code Architecture

### Three-Service Architecture
The RELIX platform consists of three independently deployable services:

1. **Frontend** (`client/`): Next.js 16 + React 19 App Router application
   - **Routing**: `client/src/app/` contains route-defined pages (login, dashboard, protected routes)
   - **State Management**: Zustand for global state (user auth, SVI filters, volunteer data)
   - **Data Fetching**: TanStack Query for API caching and synchronization
   - **UI Components**: `client/src/components/` - reusable elements (maps, charts, forms, cards)
   - **Styling**: Tailwind CSS 4 utility-first approach
   - **Maps**: Mapbox GL JS for interactive geographic visualization
   - **Forms**: React Hook Form with Zod validation schemas
   - **Real-time**: Socket.io-client for live updates from backend

2. **Backend** (`server/`): Node.js/Express REST API with real-time capabilities
   - **Entry Point**: `server.js` - initializes Express, Socket.io, Firebase, middleware
   - **API Routes**: `server/routes/` - REST endpoints for incidents, volunteers, analytics
   - **Middleware**: `server/middleware/` - authentication (Firebase JWT), validation, rate limiting, security headers
   - **Business Logic**: `server/services/` - SVI calculation, volunteer matching, incident processing
   - **Data Models**: `server/models/` - Mongoose schemas for incident, volunteer, NGO collections
   - **Utilities**: `server/utils/` - helper functions (email, SMS, Haversine distance, file processing)
   - **Configuration**: `server/config/` - Firebase admin initialization, Socket.io setup
   - **Real-time**: Socket.io instance emits events for incident updates, volunteer assignments
   - **Queues**: Bull queue for asynchronous AI processing jobs

3. **AI Service** (`ai-service/`): FastAPI microservice for document processing
   - **Main App**: `ai-service/main.py` - FastAPI application with CORS middleware
   - **Endpoints**:
     - `GET /health` - service availability check
     - `POST /api/ai/process` - accepts image files, returns structured data (mock implementation)
   - **Processing Pipeline** (planned): 
     1. OCR (Google Vision API primary, Tesseract fallback)
     2. LLM structuring (Claude API) to extract location, urgency, issue type
     3. Confidence scoring per field
   - **Dependencies**: FastAPI, python-multipart, OCR libraries, Claude API client
   - **Deployment**: Designed to run independently, called by backend via HTTP

### Data Flow & Integration
1. **User Interaction**: 
   - User uploads handwritten form via frontend drag/drop or file input
   - Frontend validates file type/size, sends to backend `/api/incidents/upload`

2. **Backend Processing**:
   - Receives image, stores temporarily, forwards to AI service
   - Calls AI service `/api/ai/process` endpoint with image file
   - Receives structured data (location, urgency, type, confidence scores)
   - Calculates Social Vulnerability Index (SVI): urgency (60% weight) + scale (40% weight)
   - Stores incident in Firestore via Firebase Admin SDK
   - Emits Socket.io event: `incident:created` with new incident data

3. **Real-time Updates**:
   - Frontend Socket.io client listens for incident events
   - Updates map markers, incident feed, KPI cards in real-time
   - Volunteer matching service runs periodically or on new critical incidents

4. **Volunteer Coordination**:
   - Backend calculates Haversine distance between incident and volunteer locations
   - Matches skills (medical, logistics, etc.) and balances workload
   - Auto-assigns for critical incidents, requires admin confirmation for lower priority
   - Sends notifications via email (nodemailer) or SMS (Twilio)

### Key Technical Details
- **Frontend Build**: Next.js static export capability for Firebase Hosting
- **Backend Database**: Firestore (via Firebase Admin) with Mongoose-like modeling layer
- **Authentication**: Firebase Auth (email/password) with JWT tokens for API protection
- **Security**: 
  - Helmet.js, rate limiting, XSS sanitization
  - Firestore security rules for role-based access (NGO, volunteer, admin)
  - Input validation with Zod on both client and server
- **Styling System**: Tailwind CSS 4 with custom color scheme (blues/greens for trust)
- **Icon System**: Lucide React for consistent, lightweight icons
- **Charts**: Recharts for KPI trends and distribution visualizations
- **File Handling**: Multer for uploads, Sharp for image optimization

### Environment-Specific Notes
- **Development**: 
  - Frontend: `localhost:3500` (configured in next.config.mjs)
  - Backend: `localhost:5000` (default Express port)
  - AI Service: `localhost:8000` (FastAPI default)
- **Production**: 
  - Frontend deployed to Firebase Hosting
  - Backend likely deployed to Cloud Run or similar (not visible in repo)
  - AI Service similarly containerized for scaling
- **External Services**:
  - Google Vision API: Primary OCR with billing enabled
  - Tesseract: Open-source fallback for offline capability
  - Mapbox: Requires token for map tiles (set in .env)
  - Claude API: For advanced text structuring beyond basic OCR

### Common Development Tasks
- **Adding New Frontend Page**: 
  1. Create route folder in `client/src/app/(protected)/[new-page]/`
  2. Add `page.jsx` with React component
  3. Link from sidebar or dashboard navigation
  4. Use Zustand hooks for state, TanStack Query for data fetching

- **Modifying Backend API**:
  1. Add route handler in `server/routes/[resource].js`
  2. Implement validation middleware if needed
  3. Call appropriate service in `server/services/`
  4. Return standardized JSON response format

- **Extending AI Processing**:
  1. Enhance `ai-service/main.py` processing logic
  2. Add OCR confidence thresholds and fallback mechanisms
  3. Integrate Claude API prompts for specific field extraction
  4. Update response format to include structured data and confidence scores

- **Updating SVI Algorithm**:
  1. Modify `server/services/sviService.js` (or similar)
  2. Adjust weightings or add new factors (time sensitivity, weather impact)
  3. Ensure backward compatibility with existing incident data

- **Real-time Features**:
  1. Define new Socket.io event in backend `server.js`
  2. Emit event from relevant service/controller
  3. Listen in frontend using `socket.io-client` hooks
  4. Update UI components via state changes

This architecture enables independent scaling of services while maintaining loose coupling through well-defined APIs and real-time event communication.