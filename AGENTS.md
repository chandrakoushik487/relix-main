# Agent Guide: RELIX

RELIX is an AI-powered disaster response and civic issue coordination platform.

## 🚀 Developer Commands

### Root Project
- `npm run dev`: Starts both client and server concurrently.
- `npm run lint`: Lints the entire codebase.
- `npm run format`: Formats the entire codebase using Prettier.

### Client (Next.js)
- Directory: `client/`
- `npm run dev`: Starts Next.js dev server on port 3500.
- `npm run build`: Builds the production application.
- `npm run lint`: Lints client-side code.

### Server (Node.js/Express)
- Directory: `server/`
- `npm run dev`: Starts the server with watch mode.
- `npm run start`: Starts the server in production mode.

### AI Service (FastAPI)
- Directory: `ai-service/`
- Environment: Uses `.venv` in the root directory.
- Run: `uvicorn main:app --reload` (after activating `.venv`).

## 🏗️ Architecture

- **Frontend**: Next.js 14, React 18/19, Tailwind CSS 4, Zustand (state), TanStack Query (server state), Mapbox GL (maps), Recharts (charts).
- **Backend**: Node.js/Express, Firebase Admin, Cloud Firestore.
- **AI Pipeline**: FastAPI (Python), Google Vision API (OCR), Claude API (Structuring).
- **Infrastructure**: Firebase Hosting, Authentication, Cloud Firestore.
- **Firebase Project ID**: `relix-6218b`

## 🛠️ Workflow & Conventions

- **Validation**: Use `Zod` for schema validation on both client and server.
- **Authentication**: Managed via Firebase Auth.
- **Environment Variables**: Follow `.env.example` for necessary keys.
- **Deployment**: `npx firebase-tools deploy --only hosting:main --project relix-6218b`
- **API Communication**: Client uses `axios` to communicate with the server.

## ⚠️ Important Notes
- **Port Conflict**: The client runs on port 3500.
- **AI Service**: Depends on `.venv` for Python dependencies.
- **Firebase**: Security rules are defined in `firestore.rules`.
