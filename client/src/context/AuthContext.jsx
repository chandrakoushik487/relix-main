'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Get JWT token and set cookie for middleware
        const token = await user.getIdToken();
        document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Lax`;
        
        // Try to get role from localStorage first for speed
        const savedRole = localStorage.getItem('userRole');
        
        if (savedRole) {
          setRole(savedRole);
        } else {
          // Fallback to Firestore or displayName
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setRole(userData.role);
              localStorage.setItem('userRole', userData.role);
            } else {
              const defaultRole = user.displayName || 'NGO Staff';
              setRole(defaultRole);
              localStorage.setItem('userRole', defaultRole);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setRole('NGO Staff');
          }
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem('userRole');
        document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
