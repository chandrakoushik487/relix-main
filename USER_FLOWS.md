# User Flows in RELIX Platform

Different user roles interact with the RELIX platform through distinct workflows tailored to their responsibilities in disaster response coordination.

## Common Entry Point
All authenticated users begin at:
1. **Login Page** (`client/src/app/login/page.js`)
   - Email/password authentication via Firebase Auth
   - Redirects to role-appropriate dashboard after login

---

## 1. NGO Worker / Field Reporter Flow
*Role: Submits handwritten incident reports from the field*

```
Login → NGO Dashboard → [Upload New Incident] 
    ↓
[Image Upload Form] 
    ↓ (Accepts JPG/PNG, max 10MB)
[Preview + Confirm] 
    ↓
[Submit to AI Service] 
    ↓
[Processing...] (Shows OCR progress) 
    ↓
[Extracted Data Review] 
    ↓ (User can correct OCR/LLM errors)
[Confirm Submission] 
    ↓
[Success: Incident Logged with SVI Score] 
    ↓
[Returns to: My Incidents List] 
    ↺ (Can filter by status: Pending/Processing/Resolved)
    ↓
[Optional: Share Incident via SMS/Email]
```

**Key Screens/Components:**
- NGO Dashboard: `client/src/app/(protected)/dashboard/page.js` (shows personal KPIs)
- Upload Form: Likely in `client/src/app/(protected)/incident-feed/page.jsx` or dedicated upload component
- AI Service Interaction: Backend routes → `/api/ai/process` (ai-service/main.py)
- Status Tracking: Uses TanStack Query to poll/update incident status

**Permissions:** 
- Can only view/edit own submitted incidents
- Can upload images and trigger AI processing
- Cannot volunteer assignments or system settings

---

## 2. Volunteer Flow
*Role: Receives and responds to incident assignments*

```
Login → Volunteer Dashboard → [Available Incidents Map] 
    ↓
[Filter by: Distance, Skills Needed, Urgency] 
    ↓
[Select Incident on Map/List] 
    ↓
[Incident Detail View] 
    ↓ (Shows: Location, Issue Type, SVI, Description, Photos)
    ↓
[Accept Assignment?] → [Yes] → [Confirmation + Navigate to Location] 
    ↓
[On-site: Update Status → "In Progress"] 
    ↓
[Add Field Notes/Photos] 
    ↓
[Mark as Resolved] → [Final Notes + Resolution Photo] 
    ↓
[Submit for Verification] 
    ↓
[Returns to: My Assignments] 
    ↺ (Shows: Active/Completed incidents)
```

**Key Screens/Components:**
- Volunteer Dashboard: Custom view of `client/src/app/(protected)/dashboard/page.js` (filtered for volunteer)
- Map View: `client/src/app/(protected)/emergency-map/page.jsx` (with volunteer-specific filters)
- Incident Detail: `client/src/app/(protected)/incident-feed\[id]/page.jsx`
- Status Updates: PATCH to `/api/incidents/[id]/status` via Socket.io for real-time updates

**Permissions:**
- Can view incidents within configured radius (Haversine distance matching)
- Can only accept assignments matching their skill profile
- Can update status of assigned incidents only
- Cannot upload new reports or modify SVI algorithm

---

## 3. Administrator / Platform Manager Flow
*Role: Oversees system operations, manages users and configuration*

```
Login → Admin Dashboard → [System Overview] 
    ↓
[Tabs: Incidents | Users | Analytics | Settings]
    ↓
[Incidents Tab] 
    ↓
[Filter by: Date Range, SVI Level, Status, NGO Source] 
    ↓
[Bulk Actions: Re-assign, Escalate, Export CSV] 
    ↓
[Individual Incident Detail → Override Auto-Assignment] 
    ↓
[Users Tab] 
    ↓
[View NGO/Volunteer Lists] 
    ↓
[Add/Edit/Remove Users] → [Role Assignment + Skill Tags] 
    ↓
[Analytics Tab] 
    ↓
[SVI Weight Adjustment] → [Simulate Impact on Incident Prioritization] 
    ↓
[Response Time Trends] → [Heatmap by Region] 
    ↓
[Settings Tab] 
    ↓
[Configure: OCR Confidence Thresholds, Notification Templates, API Keys] 
    ↓
[Audit Logs] 
    ↓
[System Health: AI Service Backend Status, Queue Depth]
```

**Key Screens/Components:**
- Admin Dashboard: Likely extends base dashboard with admin-only routes (check for `/admin` or role-based guards in layout)
- User Management: Custom components calling Firebase Admin SDK routes
- Analytics: Recharts components displaying aggregated Firestore data
- Settings: Form writing to Firestore config documents or environment variables (via secure admin API)

**Permissions:**
- Full read access to all incidents and user data
- Can modify user roles, skills, and platform configuration
- Can override AI-extracted data and volunteer assignments
- Typically cannot upload field reports (unless also acting as NGO)

---

## 4. Public Viewer / Community Role (Optional)
*Role: Limited situational awareness access (if enabled for public alerts)*

```
[Public Portal: relix.org] 
    ↓
[View: Active Incidents Map (Anonymized)] 
    ↓
[Filter by: Issue Type, Time Last Updated] 
    ↓
[Click Incident → See: General Location, Issue Type, Timestamp] 
    ↓
[No Personal Data Shown] 
    ↓
[Optional: Report Incident via Simple Form] 
    ↓ (Redirects to NGO flow if authenticated, or basic text-only report)
```

**Note:** This flow may not be fully implemented; currently appears focused on authenticated NGO/volunteer/admin users based on protected routes.

---

## Cross-Role Interactions

### Incident Lifecycle:
1. **NGO** submits → 2. **AI Service** processes → 3. **Backend** calculates SVI → 4. **Stores in Firestore** 
5. **Socket.io** emits `incident:created` → 6. **Volunteer Dashboard** updates in real-time
7. **Algorithm** matches volunteers → 8. **Notification** sent (email/SMS) 
9. **Volunteer** accepts → 10. **Status updates** flow back via Socket.io
11. **NGO/Admin** sees resolution → 12. **Analytics** updated

### Data Flow Between Roles:
- NGO → System: Raw image + location → Structured incident data
- System → Volunteer: Incident details + navigation instructions
- Volunteer → System: Status updates + field notes
- System → NGO/Admin: Resolution confirmation + impact metrics
- Admin → System: Configuration changes affecting all roles

### Technical Implementation Points:
- **Authentication**: Firebase Auth JWT tokens checked in backend middleware (`server/middleware/auth.js`)
- **Authorization**: Role-based access controlled by:
  - Frontend: Route guards in `client/src/app/(protected)/layout.js`
  - Backend: Firestore security rules + Express middleware checking `user.role`
- **Real-time Updates**: Socket.io events namespaced by role (e.g., `volunteer:assignment`, `ngo:update`)
- **Data Privacy**: PII (exact locations, contact info) only visible to authorized roles; public views show anonymized/zonal data

This flow structure ensures each user type sees only relevant information and actions while maintaining tight coordination during emergency response scenarios.