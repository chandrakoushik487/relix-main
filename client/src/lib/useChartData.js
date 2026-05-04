'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { analyticsService } from '@/services/api';
import {
  getIssuesByType,
  getIssuesOverTime,
  getStatusDistribution,
  getSviByRegion,
} from '@/components/charts/mockChartData';
import { normalizeFirebaseError } from '@/lib/firebaseError';

/**
 * Attempts to dynamically import firebase to avoid build-time import failures.
 */
async function getFirestore() {
  try {
    const firestoreMod = await import('firebase/firestore');
    const firebaseConfigMod = await import('./firebase');
    return { 
        db: firebaseConfigMod.db, 
        collection: firestoreMod.collection, 
        getDocs: firestoreMod.getDocs 
    };
  } catch {
    return null;
  }
}

/**
 * Custom hook that fetches live chart data from the analytics API.
 * Falls back to mock data if API is unreachable.
 */
export function useChartData() {
  const [data, setData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(null);

  const fallbackData = useMemo(() => ({
    issuesByType: getIssuesByType(),
    issuesOverTime: getIssuesOverTime(),
    statusDistribution: getStatusDistribution(),
    sviByRegion: getSviByRegion(),
  }), []);

  const fallbackMetrics = useMemo(() => ({
    total_reports: 1284,
    critical_issues: 42,
    total_affected: 8200,
    assigned_operations: 156,
    pending_operations: 234,
    active_volunteers: 312,
  }), []);

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      // Try to fetch analytics from the API
      const analyticsResponse = await analyticsService.getDashboardAnalytics();

      if (analyticsResponse.success && analyticsResponse.data) {
        setIsLive(true);

        // Use API metrics
        const apiMetrics = {
          total_reports: analyticsResponse.data.total_reports,
          critical_issues: analyticsResponse.data.critical_issues,
          total_affected: analyticsResponse.data.total_affected,
          assigned_operations: analyticsResponse.data.assigned_operations,
          pending_operations: analyticsResponse.data.pending_operations,
          active_volunteers: analyticsResponse.data.active_volunteers || 0,
        };

        setMetrics(apiMetrics);

        // For chart data, we still need to fetch from Firestore since the API doesn't provide chart data
        // This is a temporary solution - ideally the API should provide chart data too
        try {
          const fs = await getFirestore();
          if (fs && fs.db) {
            const snapshot = await fs.getDocs(fs.collection(fs.db, 'issues'));
            const issues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (issues && issues.length > 0) {
              // Process chart data from Firestore
              const typeCounts = {};
              issues.forEach(i => {
                const t = i.problem_type || 'Others';
                typeCounts[t] = (typeCounts[t] || 0) + 1;
              });
              const issuesByType = Object.entries(typeCounts)
                .map(([type, count]) => ({ type, count }))
                .sort((a, b) => b.count - a.count);

              const statusCounts = { Pending: 0, Assigned: 0, Completed: 0 };
              issues.forEach(i => {
                const s = i.status || 'Pending';
                if (statusCounts[s] !== undefined) statusCounts[s]++;
              });
              const statusDistribution = Object.entries(statusCounts)
                .map(([name, value]) => ({ name, value }));

              const now = new Date();
              const issuesOverTime = [];
              for (let i = 13; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                const created = issues.filter(issue => {
                  const iDate = issue.upload_date?.split('T')[0];
                  return iDate === dateStr;
                }).length;

                const resolved = issues.filter(issue => {
                  const rDate = issue.resolution_time?.split('T')[0];
                  return rDate === dateStr;
                }).length;

                issuesOverTime.push({ date: label, created, resolved, avg7d: 0 });
              }

              issuesOverTime.forEach((point, idx) => {
                let sum = 0, count = 0;
                for (let j = Math.max(0, idx - 6); j <= idx; j++) {
                  sum += issuesOverTime[j].created;
                  count++;
                }
                point.avg7d = Math.round(sum / count);
              });

              const regionMap = {};
              issues.forEach(i => {
                const region = i.area || 'Unknown';
                if (!regionMap[region]) regionMap[region] = { sviSum: 0, count: 0 };
                regionMap[region].sviSum += (i.svi_score || 0);
                regionMap[region].count += 1;
              });
              const sviByRegion = Object.entries(regionMap)
                .map(([region, { sviSum, count }]) => ({
                  region,
                  svi: parseFloat((sviSum / count).toFixed(1)),
                  issues: count,
                }))
                .sort((a, b) => b.svi - a.svi)
                .slice(0, 6);

              setData({ issuesByType, issuesOverTime, statusDistribution, sviByRegion });
            } else {
              setError('No incidents found in Firestore for chart generation.');
              setData(fallbackData);
            }
          } else {
            setError('Firestore module unavailable in dashboard chart pipeline.');
            setIsLive(false);
            setData(fallbackData);
          }
        } catch (firestoreErr) {
          const normalized = normalizeFirebaseError(firestoreErr, 'Firestore chart sync failed');
          console.warn('Firestore fetch failed, using fallback chart data:', normalized.details, firestoreErr);
          setError(normalized.details);
          setIsLive(false);
          setData(fallbackData);
        }
      } else {
        // API call failed, use fallback
        setError('Analytics API returned an invalid response payload.');
        setData(fallbackData);
        setMetrics(fallbackMetrics);
        setIsLive(false);
      }
    } catch (err) {
      const normalized = normalizeFirebaseError(err, 'Analytics API failed');
      console.warn('Analytics API failed, using mock data:', normalized.details, err);
      setError(normalized.details);
      setData(fallbackData);
      setMetrics(fallbackMetrics);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [fallbackData, fallbackMetrics]);

  useEffect(() => {
    fetchData();

    // Poll every 30 seconds for fresh data
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    chartData: data || fallbackData,
    metrics: metrics || fallbackMetrics,
    loading,
    isLive,
    error,
    refetch: fetchData,
  };
}
