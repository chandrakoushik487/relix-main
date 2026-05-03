
'use client';
import { useState, useEffect, useCallback } from 'react';
import { incidentService } from '@/services/incidentService';

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
      setError(err.message);
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
