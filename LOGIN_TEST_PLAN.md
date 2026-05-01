# Login Page Test Plan & Fix Prompts

## Issues Identified in Current Login Implementation

### 1. Missing Client-Side Validation
- No email format validation before submission
- No password strength requirements communicated
- No real-time field validation feedback
- Form submits with empty fields (HTML `required` helps but no custom validation)

### 2. Poor Error Handling
- Firebase auth errors shown raw to users (security risk & bad UX)
- No distinction between different error types (invalid creds vs network vs server)
- Error messages not user-friendly
- No error clearing on successful submission attempt

### 3. Role Management Issues
- Role state doesn't persist or affect actual permissions
- Role selected in UI but not sent to backend during auth
- No role-based redirect logic after login
- Role only used for display name in signUp, not actual authorization

### 4. Security Concerns
- Password reset link ("Reset?") doesn't actually trigger reset flow
- No rate limiting or brute force protection on client side
- Password visible in plaintext when showPassword toggled (should be masked better)
- No prevention of SQL/XSS injection in form fields (though React helps)

### 5. UX Problems
- Loading state only on submit button, not full form disable
- No visual feedback for successful auth before redirect
- Google sign-in button missing aria-label for accessibility
- Form doesn't reset after successful login (could cause confusion if user goes back)
- No "remember me" or session persistence options

## Test Prompts for Manual Verification

### Test Case 1: Empty Form Submission
**Prompt:** "Attempt to submit the login form with both email and password fields empty. What happens? Does it prevent submission or show helpful errors?"

### Test Case 2: Invalid Email Format
**Prompt:** "Try submitting with email 'invalid-email' and any password. What validation occurs? Does it show a helpful email format error?"

### Test Case 3: Wrong Password
**Prompt:** "With a valid email format but incorrect password, what error message is shown? Is it user-friendly or does it expose internal Firebase error details?"

### Test Case 4: Network Error Simulation
**Prompt:** "Simulate a network error (e.g., disable internet or block Firebase endpoints). What happens during login attempt? Is there a timeout or retry mechanism?"

### Test Case 5: Role Selection Impact
**Prompt:** "Select different roles (NGO Staff, Volunteer, Admin) and attempt login. Does the selected role affect anything post-login? Is it stored in user profile or used for authorization?"

### Test Case 6: Google Sign-In Flow
**Prompt:** "Click the Google Sign-In button. What happens if Google popup is blocked? What happens if successful? Is there proper loading state?"

### Test Case 7: Password Visibility Toggle
**Prompt:** "Test the show/hide password toggle. Does it properly mask/unmask? Are there any accessibility issues with the eye icon button?"

### Test Case 8: Form Reset After Login
**Prompt:** "After successful login, if you use browser back button to return to login page, are fields cleared or do they retain previous values?"

### Test Case 9: Special Character Handling
**Prompt:** "Test email with special characters (user+tag@domain.co.uk) and password with spaces/symbols. Are they handled correctly?"

### Test Case 10: Loading State Clarity
**Prompt:** "During login attempt, is it clear that submission is in progress? Does the entire form feel disabled or just the button?"

## Fix Implementation Prompts

Use these prompts to generate fixed code for the login page:

### Prompt 1: Enhanced Validation
```
Fix the login page to add comprehensive client-side validation:
1. Add email format validation with regex pattern
2. Add password strength indicator (min 8 chars)
3. Show inline validation errors as user types
4. Prevent form submission if validation fails
5. Keep existing HTML required attributes as backup
```

### Prompt 2: Improved Error Handling
```
Enhance error handling in the login page:
1. Create a function to map Firebase error codes to user-friendly messages
2. Handle specific errors: 
   - auth/invalid-email → "Please enter a valid email address"
   - auth/user-disabled → "This account has been disabled"
   - auth/user-not-found → "No account found with this email"
   - auth/wrong-password → "Incorrect password"
   - auth/too-many-requests → "Too many attempts. Try again later."
   - Default → "Unable to sign in. Please check your credentials."
3. Clear error message when user starts typing in fields
4. Don't expose raw Firebase error messages to users
```

### Prompt 3: Role-Based Redirect System
```
Implement role-based functionality:
1. Store selected role in localStorage or cookie for persistence
2. After successful login, check user's actual role from Firebase custom claims or database
3. Redirect to appropriate dashboard based on role:
   - NGO Staff → /dashboard (current)
   - Volunteer → /volunteer/dashboard
   - Admin → /admin/dashboard
4. If role mismatch between selection and actual role, show warning but proceed with actual role
5. Add role selector to signUp flow to set initial user role
```

### Prompt 4: Security & UX Enhancements
```
Improve security and user experience:
1. Replace fake "Reset?" button with actual password reset modal/link
2. Add rate limiting: disable submit button for 30 seconds after 5 failed attempts
3. Improve password visibility toggle accessibility (add aria-label)
4. Add form reset on successful login to prevent confusion with back button
5. Add subtle animation for field errors (shake effect)
6. Ensure password field remains type="password" unless explicitly toggled
7. Add autocomplete attributes for better browser integration
```

### Prompt 5: Loading State Improvements
```
Enhance loading states:
1. Disable entire form during submission, not just button
2. Show skeleton loading state or disable inputs with opacity
3. Add subtle progress indicator near button
4. Prevent multiple rapid submissions (debounce)
5. Show different loading states for email/password vs Google sign-in
```

## Verification Checklist After Fixes

After implementing fixes, verify:
- [ ] All validation prevents bad submissions
- [ ] Error messages are helpful, not technical
- [ ] Role selection influences post-login experience
- [ ] Google Sign-In works properly with loading states
- [ ] Form resets appropriately after navigation
- [ ] No security information leaked in error messages
- [ ] Accessible keyboard navigation and screen reader support
- [ ] Mobile responsive behavior maintained
- [ ] Loading states clearly indicate ongoing processes
- [ ] Password visibility toggle works securely

## Sample Fixed Code Structure

Here's what the improved login page should look like conceptually:

```javascript
// Add validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

// Enhanced error mapping
const getAuthErrorMessage = (errorCode) => {
  const errorMap = {
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/invalid-credential': 'Invalid credentials provided',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };
  return errorMap[errorCode] || 'Unable to sign in. Please check your credentials.';
};

// In handleSignIn:
if (!validateEmail(email)) {
  setErrorMsg('Please enter a valid email address');
  setLoading(false);
  return;
}

if (!validatePassword(password)) {
  setErrorMsg('Password must be at least 8 characters');
  setLoading(false);
  return;
}

// ... rest of submission logic with improved error handling
```

Apply these improvements to fix the login page issues systematically.