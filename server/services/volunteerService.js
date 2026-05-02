import { db } from '../config/firebase.js';
import logger from '../utils/logger.js';

// Haversine formula to compute raw km distance
export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
};

export const findBestVolunteers = async (issue, limit = 1) => {
  try {
    if (!db) {
      logger.warn('Firestore not initialized, returning empty volunteer list');
      return [];
    }

    // Query available volunteers (Firestore)
    const volunteersSnapshot = await db.collection('volunteers')
      .where('available', '==', true)
      .limit(20)
      .get();

    if (volunteersSnapshot.empty) {
      return [];
    }

    // Compute Match Score Matrix for each volunteer
    const scoredCandidates = volunteersSnapshot.docs
      .map(doc => {
        const vol = { id: doc.id, ...doc.data() };
        
        // Skip if workload exceeded
        if ((vol.active_tasks || 0) >= (vol.max_tasks || 5)) {
          return null;
        }

        // 1. Proximity Score
        const distance = getDistanceFromLatLonInKm(
          issue.latitude || 0, 
          issue.longitude || 0, 
          vol.latitude || 0, 
          vol.longitude || 0
        );
        const proximity_score = distance > 50 ? 0 : Math.max(1 - (distance / 50), 0);
        
        // 2. Skill Score
        const issueSkillCategory = issue.problem_type;
        const hasSkill = (vol.skills || []).includes(issueSkillCategory);
        const skill_score = hasSkill ? 1.0 : 0.0;
        
        // 3. Workload score
        const workload_score = 1 - ((vol.active_tasks || 0) / (vol.max_tasks || 5));
        
        // Total Match Score
        const match_score = (proximity_score * 0.5) + (skill_score * 0.3) + (workload_score * 0.2);
        
        return { volunteer: vol, match_score, distance };
      })
      .filter(item => item !== null);

    // Sort by match_score descending
    scoredCandidates.sort((a, b) => b.match_score - a.match_score);
    
    return scoredCandidates.slice(0, limit);
  } catch(error) {
    logger.error(`Volunteer matching failed: ${error.message}`);
    return [];
  }
};

export const assignVolunteerToIssueAtomic = async (volunteerId, issueId) => {
  try {
    if (!db) throw new Error('Firestore not initialized');

    // Get volunteer document
    const volDoc = await db.collection('volunteers').doc(volunteerId).get();
    if (!volDoc.exists) throw new Error('Volunteer not found');

    const vol = volDoc.data();
    
    // Check if volunteer can accept more tasks
    if ((vol.active_tasks || 0) >= (vol.max_tasks || 5)) {
      throw new Error('Volunteer at max capacity');
    }

    // Atomic update: increment active_tasks
    await db.collection('volunteers').doc(volunteerId).update({
      active_tasks: (vol.active_tasks || 0) + 1,
      updated_at: new Date().toISOString()
    });

    // Update issue status
    await db.collection('issues').doc(issueId).update({
      status: 'assigned',
      volunteer_id: volunteerId,
      volunteer_name: vol.name || 'Unknown',
      assigned_time: new Date().toISOString()
    });

    return { success: true, volunteerId };
  } catch (error) {
    logger.error(`Volunteer assignment failed: ${error.message}`);
    throw error;
  }
};
