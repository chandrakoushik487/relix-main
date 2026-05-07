const CATEGORY_MAP = {
  'auth/invalid-credential': 'auth',
  'auth/user-not-found': 'auth',
  'auth/wrong-password': 'auth',
  'auth/email-already-in-use': 'auth',
  'auth/weak-password': 'auth',
  'auth/too-many-requests': 'auth',
  'auth/operation-not-allowed': 'auth',
  'auth/invalid-email': 'auth',
  'permission-denied': 'firestore-permissions',
  'failed-precondition': 'firestore-index-or-precondition',
  'invalid-argument': 'invalid-query-or-payload',
  'unauthenticated': 'auth',
  'unavailable': 'network',
  'deadline-exceeded': 'network-timeout',
};

const FRIENDLY_MESSAGES = {
  'auth/invalid-credential': 'The email or password you entered is incorrect.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'The password you entered is incorrect.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Your password is too weak. Please use at least 6 characters.',
  'auth/too-many-requests': 'Too many unsuccessful attempts. Please try again later.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
};

export function normalizeFirebaseError(error, fallbackMessage = 'An unexpected error occurred.') {
  const rawCode = error?.code || '';
  const code = typeof rawCode === 'string' ? rawCode.replace(/^firebase\//, '') : 'unknown';
  const category = CATEGORY_MAP[code] || 'unknown';
  
  // Use a friendly message if we have one for this code, 
  // otherwise fallback to the provided fallbackMessage or the raw error message.
  const message = FRIENDLY_MESSAGES[code] || fallbackMessage;

  return {
    code,
    category,
    message,
    details: `${category} [${code}]: ${error?.message || message}`,
  };
}

