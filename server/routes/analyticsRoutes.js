import express from 'express';
import { db } from '../config/firebase.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Phase 6.7 Analytics Endpoint Polling
router.get('/', async (req, res) => {
  try {
    if (!db) throw new Error("Firestore not initialized");
    
    const issuesRef = db.collection('issues');

    // Get total issues count
    const totalSnapshot = await issuesRef.count().get();
    const total = totalSnapshot.data().count;

    // Fix #2a: lowercase 'high' (was 'High') - matches stored data
    const criticalSnapshot = await issuesRef.where('urgency_level', '==', 'high').count().get();
    const critical = criticalSnapshot.data().count;

    // Fix #2b: lowercase 'assigned' (was 'Assigned') - matches stored data
    const assignedSnapshot = await issuesRef.where('status', '==', 'assigned').count().get();
    const assigned = assignedSnapshot.data().count;

    // Fix #2c: lowercase 'pending' (was 'Pending') - matches stored data
    const unassignedSnapshot = await issuesRef.where('status', '==', 'pending').count().get();
    const unassigned = unassignedSnapshot.data().count;

    // Get total SVI score sum (using SVI as proxy for people affected)
    const sviSnapshot = await issuesRef.orderBy('svi_score').get(); // Only docs with svi_score exist
    
    const totalAffectedCount = sviSnapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + (data.svi_score || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        total_reports: total || 0,
        critical_issues: critical || 0,
        total_affected: Math.round(totalAffectedCount * 100) / 100,
        assigned_operations: assigned || 0,
        pending_operations: unassigned || 0
      }
    });

  } catch (error) {
    // Fix #15: use logger instead of console.error
    logger.error('Analytics error:', error);
    res.status(500).json({ success: false, error: 'Analytics calculation failed', details: error.message });
  }
});

export default router;

