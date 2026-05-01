# RELIX Codebase - Complete Problem Report

> Generated: 2026-05-01
> Total Issues Found: 27 (6 Critical, 4 Security, 5 Quality, 5 Config, 7 Minor)

---

## ✅ COMPLETED CHANGES (2026-05-01)

### 1. Removed Admin Role from Login
**Files changed:** `client/src/app/login/page.js`
- Removed 'Admin' from role selector buttons
- Removed Admin case from `handleRoleRedirect` function
- Volunteers now redirected to `/volunteer/dashboard` instead of non-existent `/volunteer/dashboard`

### 2. Created Volunteer-Specific Dashboard
**New file:** `client/src/app/(protected)/volunteer/dashboard/page.js`
- Welcome banner with availability toggle
- Active tasks with Accept/Complete actions
- Pending task invitations
- Personal stats (tasks completed, hours logged, people helped)
- Quick map showing task locations
- Recent activity feed

### 3. Updated Sidebar with Role-Based Navigation
**Files changed:** `client/src/components/layout/Sidebar.jsx`
- NGO Staff sees: Dashboard, Analytics, Emergency Map, Incident Feed, Data Lake, My Tasks, Impact
- Volunteers see: My Dashboard, Incident Feed (view-only), Emergency Map (limited), Task Acceptance, My Tasks, Impact
- Added "Task Acceptance" link for volunteers

### 4. Updated TopNav for Volunteers
**Files changed:** `client/src/components/layout/TopNav.jsx`
- Hidden "Create Report" button from volunteers
- Hidden "Assign Units" functionality from volunteers
- Added "Available" status indicator for volunteers

### 5. Created Volunteer Map Page
**New file:** `client/src/app/(protected)/volunteer/map/page.js`
- Simplified map showing only volunteer's assigned tasks
- Task pins with priority colors (Critical/High/Medium)
- User location indicator
- Nearby tasks overlay panel with ETA

### 6. Volunteer Acceptance Page Already Exists
**File:** `client/src/app/(protected)/volunteer/acceptance/page.js`
- Already properly styled with mission briefing, map, and accept/reject actions
- Now accessible from Sidebar "Task Acceptance" link

---

## 🔴 CRITICAL BUGS (Fix Immediately)

---

## 🔴 CRITICAL BUGS (Fix Immediately)

### 1. Zod Validation Schema Doesn't Match Actual Data
**Files:** `server/middleware/validateIssue.js` vs `server/routes/issueRoutes.js`

The validation schema and the routes use completely different field names and enum values:

| Zod Schema (validateIssue.js) | Issue Routes (issueRoutes.js) |
|---|---|
| `issue_description` | `description` |
| `area` | `location` |
| `problem_type` enum: `['Water','Health','Education','Housing','Others']` | `problem_type` enum: `['water','health','education','shelter','food','other']` |
| `urgency_level` enum: `['Low','Medium','High']` | `urgency_level` enum: `['low','medium','high']` |
| `status` enum: `['Pending','Assigned','Completed']` | `status` enum: `['pending','assigned','resolved']` |
| Has: `pincode`, `svi_score`, `volunteer_id` | Has: `people_affected`, `ngo_name`, `raw_ocr_text`, `job_id` |

**Impact:** Every POST to `/api/issues` will fail validation.

---

### 2. Analytics Routes Use Wrong Enum Values
**File:** `server/routes/analyticsRoutes.js:18,22,26`

```js
.where('urgency_level', '==', 'High')    // Data stores 'high' (lowercase)
.where('status', '==', 'Assigned')       // Data stores 'assigned' (lowercase)
.where('status', '==', 'Pending')        // Data stores 'pending' (lowercase)
```

**Impact:** Analytics will always return 0 for these queries.

---

### 3. SVI Engine Never Called
**File:** `server/services/sviEngine.js`

`calculateBaseSVI()` exists but is never imported or called in `issueRoutes.js`.

**Impact:** `svi_score` is never calculated or stored. Analytics route tries to sum `svi_score` (line 32-35) but it doesn't exist.

---

### 4. Firestore Security Rules Expire in 20 Days
**File:** `firestore.rules:15`

```js
allow read, write: if request.time < timestamp.date(2026, 5, 21);
```

**Impact:** On May 21, 2026, ALL Firestore access will be denied. Also, until then, **anyone** can read/write all data.

---

### 5. Next.js Version 16.2.4 Doesn't Exist
**File:** `client/package.json:21`

```json
"next": "16.2.4"
```

Next.js 16 hasn't been released. Latest stable is ~14.x/15.x. **This will cause `npm install` to fail.**

---

### 6. Two Database Systems, Neither Fully Working
- `server/models/Issue.js` — Mongoose schema (MongoDB) — **never used**
- `server/config/db.js` — MongoDB connection — **never used**
- `server/routes/issueRoutes.js` — uses Firestore directly
- `server/middleware/validateIssue.js` — imports Mongoose `Issue` model but never uses it

**Impact:** Dead code, confusion, and the Zod validation doesn't match either system.

---

## 🔐 SECURITY ISSUES

### 7. Hardcoded Firebase API Key in Client
**File:** `client/src/lib/firebase.js:8-14`

```js
const firebaseConfig = {
  apiKey: "AIzaSyDKjEjKy8y0GNVptLMYuxFvFkYaFIM7iRU",
  // ...exposed to all users
};
```

Should use `NEXT_PUBLIC_FIREBASE_*` environment variables.

---

### 8. AI Service Allows All CORS Origins
**File:** `ai-service/main.py:10`

```python
allow_origins=["*"]
```

Restrict to known backend URL in production.

---

### 9. Firestore Rules Allow Unrestricted Access
**File:** `firestore.rules:5-16`

```js
match /{document=**} {
  allow read, write: if request.time < timestamp.date(2026, 5, 21);
}
```

Any authenticated (or unauthenticated if rules allow) user can read/write ALL data.

---

### 10. Role Stored in Firebase `displayName`
**File:** `client/src/app/login/page.js:167-169`

```js
await updateProfile(userCredential.user, { displayName: role });
```

`displayName` is meant for the user's name (e.g., "John Doe"), not role. Use custom claims or a Firestore user document.

---

## ⚠️ CODE QUALITY ISSUES

### 11. Mock Implementations in Production Code
- `server/services/aiService.js:21` — Always returns mock data: `return { success: true, text: "Mock structured text" }`
- `server/routes/uploadRoutes.js:12` — `checkDiskSpace` always returns `true`, doesn't check actual disk space

---

### 12. Dead Code
| File | Why It's Dead |
|---|---|
| `server/models/Issue.js` | Mongoose model, but routes use Firestore directly |
| `server/config/db.js` | MongoDB connection, never called in `server.js` |
| `server/services/sviEngine.js` | `calculateBaseSVI()` never imported/called |

---

### 13. Tailwind v3 + v4 Syntax Mix
**File:** `client/src/app/globals.css`
- Uses `@theme { ... }` (v4 syntax, line 4)
- Uses `@layer utilities { ... }` (v3 syntax, line 71)

In Tailwind v4, use `@utility` instead of `@layer utilities`.

---

### 14. Invalid Tailwind Classes
**File:** `client/src/app/login/page.js`
- `py-2.5` (line 276), `py-3.5` (line 338), `p-1.5` (line 269) — non-standard spacing values. Tailwind's default scale doesn't include decimals like 2.5.

---

### 15. `console.error` Used Instead of Logger
**File:** `server/routes/analyticsRoutes.js:49`

```js
console.error('Analytics error:', error);  // Should use logger
```

Other routes correctly use `logger`.

---

## ⚙️ CONFIGURATION ISSUES

### 16. Environment Variable Prefix Mismatch
- `.env.example:13` — `VITE_API_URL=http://localhost:5000/api` (Vite convention)
- `client/src/services/api.js:4` — `process.env.NEXT_PUBLIC_API_URL` (Next.js convention)

**Fix:** Change `.env.example` to `NEXT_PUBLIC_API_URL`.

---

### 17. Missing Environment Variables in `.env.example`
| Variable | Used In | Missing From `.env.example` |
|---|---|---|
| `REDIS_URL` | `server/config/queue.js:6` | ✅ Missing |
| `FIREBASE_PROJECT_ID` | `server/config/firebase.js:20` | ✅ Missing |
| `AI_SERVICE_URL` | `server/services/aiService.js:4` | ✅ Missing |
| `NEXT_PUBLIC_FIREBASE_*` | `client/src/lib/firebase.js` | ✅ Missing |

---

### 18. `.env.example` References Supabase But It's Not Used
**File:** `.env.example:7`

```bash
# MongoDB is replaced by Supabase PostgreSQL
SUPABASE_URL=https://your-project-id.supabase.co
```

No Supabase client is configured anywhere in the codebase.

---

### 19. Husky Configured But Not Installed
**File:** Root `package.json:17` — `"prepare": "husky"` but no `.husky/` directory exists.

---

### 20. Fragile dotenv Path
**Files:** `server/server.js:15`, `server/config/firebase.js:5`, `server/config/queue.js:4`

```js
dotenv.config({ path: '../.env' });
```

Assumes the server is always run from a specific directory. Use `process.cwd()` or absolute paths.

---

## 📝 MINOR ISSUES

### 21. Firebase `measurementId` Set But Analytics Not Initialized
**File:** `client/src/lib/firebase.js:14` — `measurementId` is in config but `getAnalytics()` is never called.

---

### 22. Stats on Landing Page Are Hardcoded
**File:** `client/src/app/page.js:107-110`

```js
{ label: 'Active Volunteers', value: '1,248' },
{ label: 'Incidents Resolved', value: '43k+' },
```

These should come from an API.

---

### 23. Upload Directory Uses Relative Path
**File:** `server/middleware/upload.js:6-9`

```js
const dir = './uploads';
```

Will fail if the server is started from a different working directory.

---

### 24. No Redis Health Check in `/health` Endpoint
**File:** `server/server.js:39-41` — Health check doesn't verify Redis or queue connectivity.

---

### 25. `asyncHandler` Wrapper Is Redundant
**File:** `server/utils/asyncWrapper.js` — Express 5+ handles async errors automatically. Also, the Bull Queue should use `Queue` from `bullmq` for better Redis handling.

---

### 26. Inconsistent Port Documentation
- `CLAUDE.md` says frontend runs on `localhost:3500`
- `client/package.json:6` confirms `"dev": "next dev -p 3500"`
- But `next.config.mjs` has `output: 'export'` — static export mode doesn't use a dev server port the same way

---

### 27. Zod Version Mismatch Between Client and Server
- `server/package.json:29` — `"zod": "^3.23.8"` (v3)
- `client/package.json:27` — `"zod": "^4.3.6"` (v4)

Different major versions with breaking changes.

---

## 📊 SUMMARY

| Severity | Count | Description |
|---|---|---|
| 🔴 Critical | 6 | Will break functionality immediately |
| 🔐 Security | 4 | Poses security risks |
| ⚠️ Quality | 5 | Code quality and maintainability issues |
| ⚙️ Config | 5 | Configuration and environment issues |
| 📝 Minor | 7 | Non-critical improvements |
| **TOTAL** | **27** | |

---

## 🎯 PRIORITY FIX ORDER

1. **#5** - Fix Next.js version in `client/package.json` (blocking installs)
2. **#1** - Fix Zod validation schema to match actual data
3. **#4** - Update Firestore security rules before May 21, 2026
4. **#6** - Choose one database system (MongoDB or Firestore) and remove the other
5. **#3** - Integrate SVI engine into issue creation flow
6. **#2** - Fix analytics enum value mismatches
7. **#7, #8, #9** - Address security issues
8. **#16, #17** - Fix environment variable configuration
9. Remaining quality and minor issues
