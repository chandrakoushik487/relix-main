
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
      let q = query(issuesRef, orderBy('upload_date', 'desc'));
      
      if (options.limit) {
        q = query(q, limit(options.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.issue_description || 'No Description',
          type: data.problem_type || 'Unknown',
          region: data.area || 'Unknown',
          status: data.status || 'Pending',
          time: data.upload_date ? formatTimeAgo(data.upload_date) : 'Recently',
          severity: data.urgency_level || 'Medium',
          raw: data
        };
      });
    } catch (error) {
      console.error('Error fetching incidents:', error);
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
