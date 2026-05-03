/**
 * Custom Hook: useUserProfile
 * Manages user profile state, fetching, loading, and error handling
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserProfile } from '@/services/userService';

/**
 * Hook to fetch and manage user profile
 * @returns {Object} { profile, loading, error, refetch }
 */
export const useUserProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await fetchUserProfile();
      setProfile(userData);
    } catch (err) {
      let errorMessage = 'Failed to load profile';
      
      if (err.message === 'USER_NOT_AUTHENTICATED') {
        errorMessage = 'Please log in to view your profile';
      } else if (err.message === 'USER_DOCUMENT_NOT_FOUND') {
        errorMessage = 'User profile not found. Please complete your profile setup.';
      }
      
      setError(errorMessage);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile when auth state changes and user is available
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, authLoading]);

  const isProfileMissing = error === 'User profile not found. Please complete your profile setup.';
  const isProfileIncomplete = !!profile && (!profile.username || !profile.createdAt);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    isAuthenticated: !!user,
    isProfileMissing,
    isProfileIncomplete,
  };
};
