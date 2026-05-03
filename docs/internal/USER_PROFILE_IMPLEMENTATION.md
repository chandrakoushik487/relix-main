# User Profile Page Implementation Guide

## Overview
This document explains the production-ready user profile page implementation for RELIX that fetches and displays logged-in user data from Firebase Firestore.

---

## Architecture Overview

```
AuthContext (auth state)
        ↓
    useUserProfile (hook) ← fetches via
        ↓                    ↓
  profile.jsx (UI)  ← userService.js (Firestore operations)
        ↓
     Firestore (users collection)
```

---

## Components Created

### 1. **userService.js** - Data Access Layer
**Location**: `client/src/services/userService.js`

**Responsibilities**:
- Fetch user profile from Firestore using UID
- Update user profile data
- Create/merge user documents
- Error handling with descriptive messages

**Key Functions**:

#### `fetchUserProfile()`
```javascript
const userData = await fetchUserProfile();
// Returns: { uid, email, username, phone, role, created_at, updated_at, avatar, bio, ... }
```

- Gets current user UID from `auth.currentUser`
- Retrieves document from `users/{uid}`
- Merges Firestore data with Firebase Auth data
- Handles missing documents gracefully
- **Error Codes**:
  - `USER_NOT_AUTHENTICATED` - User not logged in
  - `USER_DOCUMENT_NOT_FOUND` - Firestore document missing

#### `updateUserProfile(updates)`
```javascript
await updateUserProfile({ 
  phone: '555-1234', 
  bio: 'New bio text' 
});
```

- Updates user document in Firestore
- Automatically sets `updated_at` timestamp
- Preserves existing fields (doesn't overwrite)

#### `createUserDocument(userData)`
```javascript
await createUserDocument({ 
  username: 'john_doe',
  role: 'NGO Staff'
});
```

- Creates or merges user document
- Useful for ensuring user exists after signup
- Uses `merge: true` to avoid data loss

---

### 2. **useUserProfile.js** - Custom Hook
**Location**: `client/src/hooks/useUserProfile.js`

**Purpose**: Manages user profile state and fetching logic

**Returns**:
```javascript
const { profile, loading, error, refetch, isAuthenticated } = useUserProfile();
```

**States**:
- `profile` - User data object (null if not loaded)
- `loading` - boolean (true while fetching)
- `error` - Error message (null if no error)
- `isAuthenticated` - boolean (user logged in)
- `refetch` - Function to manually refetch data

**How it works**:
1. Waits for `AuthContext` to load
2. Once user is available, fetches profile from Firestore
3. Handles errors and provides user-friendly messages
4. Automatically refetches when user changes
5. Returns null states during authentication check

---

### 3. **Profile Page Component** - UI Layer
**Location**: `client/src/app/(protected)/profile/page.jsx`

**Features**:
✅ Displays user profile information
✅ Real-time data from Firestore
✅ Loading spinner during fetch
✅ Error handling with retry option
✅ Not-authenticated redirect
✅ Sign-out functionality
✅ Responsive design (mobile + desktop)
✅ Graceful missing-field handling

**Displayed Fields**:
- Username
- Email
- Phone Number
- Role
- Location
- Member Since (created_at)
- Bio (if available)
- Account ID (UID)
- Last Updated timestamp
- Auth Provider

**Status Indicators**:
- ✅ Loading state with spinner
- ❌ Error state with retry
- 🔐 Not-authenticated state with login redirect
- ⚠️ Missing profile data state

---

## Data Flow

### 1. User Navigates to `/profile`

```
Page mounts → AuthContext checks authentication
```

### 2. useUserProfile Hook Activates

```javascript
useEffect(() => {
  if (authLoading) return;  // Wait for auth
  if (user) {
    fetchProfile();  // User authenticated → fetch Firestore data
  } else {
    setProfile(null);
  }
}, [user, authLoading]);
```

### 3. fetchUserProfile() Retrieves Data

```
auth.currentUser.uid ← UID
        ↓
Firestore query: db.collection('users').doc(uid).get()
        ↓
Merge with Firebase Auth metadata
        ↓
Return combined userData
```

### 4. UI Renders Based on State

```javascript
if (!isAuthenticated && !loading) → Show "Please log in"
if (loading) → Show spinner
if (error) → Show error message with retry
if (!profile) → Show "Profile not found"
if (profile) → Display profile card + fields
```

---

## Firestore Document Structure

**Collection**: `users`
**Document ID**: User's Firebase UID

**Example Document**:
```json
{
  "uid": "abc123xyz...",
  "email": "user@example.com",
  "username": "john_doe",
  "phone": "+1-555-1234",
  "role": "NGO Staff",
  "avatar": "https://...",
  "bio": "Disaster response specialist",
  "location": "San Francisco, CA",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-05-03T14:22:00Z",
  "auth_provider": "email"
}
```

**Required Fields**: `email`, `role`, `created_at`
**Optional Fields**: `username`, `phone`, `avatar`, `bio`, `location`, `updated_at`, `auth_provider`

---

## Error Handling

### Error Cases Handled

| Error | Cause | User Message |
|-------|-------|--------------|
| `USER_NOT_AUTHENTICATED` | User not logged in | "Please log in to view your profile" |
| `USER_DOCUMENT_NOT_FOUND` | No Firestore doc for UID | "User profile not found. Please complete your profile setup." |
| Firestore network error | Connection issue | "Failed to load profile" |
| Missing auth state | Auth not ready | Loading spinner |

### Recovery Options

- **Retry Button**: Manually refetch profile
- **Go to Login**: Redirect if not authenticated
- **Back to Dashboard**: Return to main app
- **Sign Out**: Clear session and logout

---

## Usage Examples

### Basic Usage in Components

```javascript
'use client';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function MyComponent() {
  const { profile, loading, error, isAuthenticated } = useUserProfile();

  if (!isAuthenticated) return <p>Please log in</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <p>Welcome, {profile.username}!</p>;
}
```

### Updating User Profile

```javascript
import { updateUserProfile } from '@/services/userService';

async function handleProfileUpdate() {
  try {
    await updateUserProfile({
      phone: '+1-555-5678',
      bio: 'Updated bio',
      location: 'New York, NY'
    });
    // Refetch after update
    refetch();
  } catch (err) {
    console.error('Update failed:', err);
  }
}
```

### Combining with Signup

```javascript
import { createUserDocument } from '@/services/userService';

// After Firebase Auth signup
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// Create Firestore document
await createUserDocument({
  username: fullName,
  role: 'NGO Staff'
});
```

---

## Assumptions & Notes

### ✅ Assumptions Made

1. **Firebase Auth is configured** with v9+ modular SDK
2. **AuthContext exists** and provides `user` and `loading` state
3. **Firestore database is initialized** with appropriate security rules
4. **Users collection exists** in Firestore
5. **User documents are identified by UID** from Firebase Auth
6. **Email is available** from Firebase Auth (mandatory in most flows)

### ⚠️ Important Notes

- **Security Rules**: Ensure Firestore rules allow authenticated users to read/write their own documents
- **Performance**: Uses direct document queries (fast) instead of collections queries
- **Offline Support**: If using Firestore offline persistence, data will be cached
- **Real-time Updates**: Current implementation uses one-time fetches. Can be upgraded to `onSnapshot()` for real-time sync

---

## Extending the Solution

### Add Real-time Sync

```javascript
// In useUserProfile hook
useEffect(() => {
  if (!user) return;
  
  const unsubscribe = onSnapshot(
    doc(db, 'users', user.uid),
    (snapshot) => setProfile(snapshot.data())
  );
  
  return () => unsubscribe();
}, [user]);
```

### Add Avatar Upload

```javascript
import { ref, uploadBytes } from 'firebase/storage';

async function uploadAvatar(file) {
  const storageRef = ref(storage, `avatars/${user.uid}`);
  await uploadBytes(storageRef, file);
  // Get download URL and update Firestore
}
```

### Add Edit Profile Form

```javascript
// In profile page component
if (isEditing) {
  return (
    <form onSubmit={handleSaveProfile}>
      <input value={profile.username} onChange={...} />
      <input value={profile.phone} onChange={...} />
      {/* More fields */}
      <button type="submit">Save</button>
    </form>
  );
}
```

### Add Loading Skeletons

```javascript
if (loading) {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded"></div>
      {/* More skeleton elements */}
    </div>
  );
}
```

---

## Testing

### Unit Tests for userService

```javascript
describe('userService', () => {
  it('should fetch user profile with valid UID', async () => {
    const profile = await fetchUserProfile();
    expect(profile).toHaveProperty('uid');
    expect(profile).toHaveProperty('email');
  });

  it('should throw error if user not authenticated', async () => {
    // Mock auth.currentUser = null
    await expect(fetchUserProfile()).rejects.toThrow('USER_NOT_AUTHENTICATED');
  });
});
```

### Integration Tests for Component

```javascript
describe('ProfilePage', () => {
  it('should display profile after loading', async () => {
    render(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('john_doe')).toBeInTheDocument();
    });
  });

  it('should show error message on fetch failure', async () => {
    // Mock fetchUserProfile to reject
    render(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText(/Error Loading Profile/)).toBeInTheDocument();
    });
  });
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Profile not found" on login | Ensure signup code calls `setDoc` to create user document |
| Loading spinner never ends | Check if AuthContext is properly initialized |
| "User not authenticated" error | Ensure user navigates via login page, not direct URL |
| Empty profile fields | Add fields to Firestore document via admin panel or update function |
| Profile doesn't update after edit | Call `refetch()` after `updateUserProfile()` |
| CORS/Permission errors | Check Firestore security rules - should allow user to read/write own docs |

---

## Deployment Checklist

- [ ] Deploy `userService.js` to production
- [ ] Deploy `useUserProfile.js` hook
- [ ] Deploy updated `profile/page.jsx`
- [ ] Test authentication flow end-to-end
- [ ] Verify Firestore security rules are correct
- [ ] Test on production Firestore database
- [ ] Monitor error logs for new issues
- [ ] Performance test with large profiles

---

## Summary

This implementation provides a **production-ready, secure, and user-friendly** profile page that:

✅ Fetches real user data from Firestore
✅ Handles all error cases gracefully
✅ Shows appropriate loading states
✅ Follows React best practices
✅ Modular and extensible architecture
✅ Integrated with existing RELIX authentication
✅ Responsive and accessible UI

The solution separates concerns into three layers (service → hook → component) making it easy to test, maintain, and extend.
