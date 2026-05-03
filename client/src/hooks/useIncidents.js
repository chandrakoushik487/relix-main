
'use client';
import { useState, useEffect, useCallback } from 'react';
import { incidentService } from '@/services/incidentService';
import { normalizeFirebaseError } from '@/lib/firebaseError';

/**
 * Hook to manage incident list state and fetching
 */
export function useIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await incidentService.getIncidents();
      setIncidents(data);
      setIsLive(true);
    } catch (err) {
      const normalized = normalizeFirebaseError(err, 'Failed to fetch incidents');
      console.error('Error in fetchIncidents:', normalized.details, err);
      setError(normalized.details);
      setIncidents([]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return {
    incidents,
    loading,
    error,
    isLive,
    refetch: fetchIncidents
  };
}
