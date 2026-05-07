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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Get JWT token and set cookie for middleware
        const token = await user.getIdToken();
        document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Lax`;
        
        // Fetch role from Firestore (Source of Truth)
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
            localStorage.setItem('userRole', userData.role);
          } else {
            // Fallback for new accounts where Firestore might be lagging or Google accounts without docs
            const defaultRole = user.displayName || localStorage.getItem('userRole') || 'NGO Staff';
            setRole(defaultRole);
            localStorage.setItem('userRole', defaultRole);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Use localStorage as fallback if Firestore fails
          const cachedRole = localStorage.getItem('userRole') || 'NGO Staff';
          setRole(cachedRole);
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
