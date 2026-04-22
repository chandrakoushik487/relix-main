import Volunteer from '../models/Volunteer.js';
import Issue from '../models/Issue.js';
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
    // Task: Filter pool: available=true, active_tasks < max_tasks
    // Using simple find first, since $expr in aggregate is heavier but better for scaling
    // We also use the 2dsphere index we built via $nearSphere for proximity!
    
    const candidates = await Volunteer.find({
      available: true,
      $expr: { $lt: ["$active_tasks", "$max_tasks"] },
      location: { // Assuming 2dsphere mapping is structured properly down the line
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [issue.lng, issue.lat] // GeoJSON is [lng, lat]
          },
          $maxDistance: 50000 // 50km max radius
        }
      }
    }).limit(20);

    // Compute Match Score Matrix
    const scoredCandidates = candidates.map(vol => {
      // 1. Proximity Score (already pre-filtered within 50km by Mongo)
      const distance = getDistanceFromLatLonInKm(issue.lat, issue.lng, vol.lat, vol.lng);
      const proximity_score = Math.max(1 - (distance / 50), 0); // 1.0 (exact) down to 0.0 (50km)
      
      // 2. Skill Score
      // If issue has a problem_type mapping to their skills
      const issueSkillCategory = issue.problem_type; // e.g., 'water'
      const hasSkill = vol.skills.includes(issueSkillCategory);
      const skill_score = hasSkill ? 1.0 : 0.0; // Simplification without deep taxonomy
      
      // 3. Workload score: 1 - (active / max)
      const workload_score = 1 - (vol.active_tasks / vol.max_tasks);
      
      // Total Match Score
      const match_score = (proximity_score * 0.5) + (skill_score * 0.3) + (workload_score * 0.2);
      
      return { volunteer: vol, match_score, distance };
    });

    // Task: Sort by match_score descending
    scoredCandidates.sort((a, b) => b.match_score - a.match_score);
    
    return scoredCandidates.slice(0, limit);
  } catch(error) {
    logger.error(`Volunteer matching failed: ${error.message}`);
    return [];
  }
};

export const assignVolunteerToIssueAtomic = async (volunteerId, issueId) => {
  // Task: Use atomic findOneAndUpdate to prevent overcapacity race conditions
  const updatedVol = await Volunteer.findOneAndUpdate(
    { 
      _id: volunteerId, 
      available: true, 
      $expr: { $lt: ["$active_tasks", "$max_tasks"] } 
    },
    { $inc: { active_tasks: 1 } },
    { new: true }
  );
  
  if (!updatedVol) throw new Error('Volunteer became unassignable during race window');
  
  await Issue.findByIdAndUpdate(issueId, { 
    status: 'assigned',
    assigned_volunteer: volunteerId 
  });
  
  return updatedVol;
};
