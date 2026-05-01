import express from 'express';
import { db } from '../config/firebase.js';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { validateIssuePayload } from '../middleware/validateIssue.js';
// Fix #3: import SVI engine so svi_score is calculated on every issue creation
import { calculateBaseSVI } from '../services/sviEngine.js';

const router = express.Router();

const generateIssueId = async () => {
  if (!db) {
      return `ISS-${String(Math.floor(Math.random()*(9999-1000)+1000)).padStart(4, '0')}`;
  }
  const snapshot = await db.collection('issues').count().get();
  const count = snapshot.data().count;

  const sequence = (count || 0) + 1;
  return `ISS-${String(sequence).padStart(4, '0')}`;
};

router.get('/', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const snapshot = await db.collection('issues')
    .orderBy('upload_date', 'desc')
    .limit(200)
    .get();

  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({ success: true, issues: data });
}));

router.get('/:issue_id', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const issueId = req.params.issue_id;
  const snapshot = await db.collection('issues')
    .where('issue_id', '==', issueId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ success: false, error: 'Issue not found' });
  }

  const doc = snapshot.docs[0];
  const data = { id: doc.id, ...doc.data() };

  res.status(200).json({ success: true, issue: data });
}));

router.post('/', validateIssuePayload, asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const payload = { ...req.body };

  if (!payload.issue_id) {
    payload.issue_id = await generateIssueId();
  }

  if (!payload.upload_date) {
    payload.upload_date = new Date().toISOString();
  }

  // Fix #3: Calculate and store svi_score on every new issue
  if (!payload.svi_score) {
    payload.svi_score = calculateBaseSVI(payload.urgency_level, payload.people_affected);
  }

  const docRef = await db.collection('issues').add(payload);
  const docSnapshot = await docRef.get();
  const data = { id: docSnapshot.id, ...docSnapshot.data() };

  res.status(201).json({ success: true, issue: data });
}));

export default router;



