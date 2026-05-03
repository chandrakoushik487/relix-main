
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  limit, 
  where,
  Timestamp 
} from 'firebase/firestore';

/**
 * Service to handle Incident (Issue) operations in Firestore
 */
export const incidentService = {
  /**
   * Fetches all incidents with optional filtering and sorting
   */
  getIncidents: async (options = {}) => {
    try {
      const issuesRef = collection(db, 'issues');
      // Simple query without orderBy to avoid composite index errors
      let q = query(issuesRef);
      
      if (options.limit) {
        q = query(issuesRef, limit(options.limit));
      }

      const snapshot = await getDocs(q);
      const incidents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.issue_description || 'No Description',
          type: data.problem_type || 'Unknown',
          region: data.area || 'Unknown',
          status: data.status || 'Pending',
          time: data.upload_date ? formatTimeAgo(data.upload_date) : 'Recently',
          severity: data.urgency_level || 'Medium',
          upload_date: data.upload_date || new Date().toISOString(),
          raw: data
        };
      });

      // Sort on client side by date descending
      incidents.sort((a, b) => {
        const aDate = new Date(a.upload_date).getTime();
        const bDate = new Date(b.upload_date).getTime();
        return bDate - aDate;
      });

      return incidents;
    } catch (error) {
      console.error('Error fetching incidents:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  },

  /**
   * Creates a new incident report in Firestore
   */
  createIncident: async (incidentData) => {
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      
      const docRef = await addDoc(collection(db, 'issues'), {
        ...incidentData,
        status: 'Pending',
        upload_date: new Date().toISOString(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { id: docRef.id, ...incidentData };
    } catch (error) {
      console.error('Error creating incident:', error);
      throw error;
    }
  }
};

/**
 * Helper to format time strings into "Xm ago" style
 */
function formatTimeAgo(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  } catch {
    return 'Recently';
  }
}
