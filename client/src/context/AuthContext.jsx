'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track whether the token refresh interval is running
  const tokenRefreshRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Clear any existing token-refresh timer
      if (tokenRefreshRef.current) {
        clearInterval(tokenRefreshRef.current);
        tokenRefreshRef.current = null;
      }

      if (firebaseUser) {
        setUser(firebaseUser);

        // ── Set auth cookie ──────────────────────────────────────────────────
        // BUG FIX 1: token can expire mid-session; refresh it every 55 min
        const setTokenCookie = async () => {
          try {
            // force=true refreshes the token even if it hasn't expired yet
            const token = await firebaseUser.getIdToken(/* forceRefresh */ false);
            document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Lax`;
          } catch {
            // Token refresh failed (user may have been deleted/disabled)
            document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
        };

        await setTokenCookie();

        // Refresh token every 55 minutes so the cookie never expires mid-session
        tokenRefreshRef.current = setInterval(setTokenCookie, 55 * 60 * 1000);

        // ── Resolve role ────────────────────────────────────────────────────
        // BUG FIX 2: stale localStorage role from a previous user's session
        // is cleared on every new auth event instead of reused blindly.
        const savedRole = localStorage.getItem('userRole');
        const savedRoleUid = localStorage.getItem('userRoleUid');

        // Only trust the cached role if it belongs to THIS user
        if (savedRole && savedRoleUid === firebaseUser.uid) {
          setRole(savedRole);
        } else {
          // Clear any stale cache from a different user
          localStorage.removeItem('userRole');
          localStorage.removeItem('userRoleUid');

          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const resolvedRole = userData.role || 'NGO Staff';
              setRole(resolvedRole);
              localStorage.setItem('userRole', resolvedRole);
              localStorage.setItem('userRoleUid', firebaseUser.uid);
            } else {
              // BUG FIX 3: displayName is set to the role string on login,
              // not an actual display name — fall back to a sane default.
              const resolvedRole = 'NGO Staff';
              setRole(resolvedRole);
              localStorage.setItem('userRole', resolvedRole);
              localStorage.setItem('userRoleUid', firebaseUser.uid);
            }
          } catch (error) {
            console.error('[AuthContext] Error fetching user role:', error);
            setRole('NGO Staff');
          }
        }
      } else {
        // Signed out — clear everything
        setUser(null);
        setRole(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userRoleUid');
        document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (tokenRefreshRef.current) {
        clearInterval(tokenRefreshRef.current);
      }
    };
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Cleanup handled by onAuthStateChanged listener above
    } catch (error) {
      console.error('[AuthContext] Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
