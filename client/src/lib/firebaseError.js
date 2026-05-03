const CATEGORY_MAP = {
  'permission-denied': 'firestore-permissions',
  'failed-precondition': 'firestore-index-or-precondition',
  'invalid-argument': 'invalid-query-or-payload',
  unauthenticated: 'auth',
  unavailable: 'network',
  'deadline-exceeded': 'network-timeout',
};

export function normalizeFirebaseError(error, fallbackMessage = 'Firebase operation failed') {
  const rawCode = error?.code || '';
  const code = typeof rawCode === 'string' ? rawCode.replace(/^firebase\//, '') : 'unknown';
  const category = CATEGORY_MAP[code] || 'unknown';
  const message = error?.message || fallbackMessage;

  return {
    code,
    category,
    message,
    details: `${category} [${code}]: ${message}`,
  };
}

