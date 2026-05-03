import express from 'express';
import { db } from '../config/firebase.js';
import { asyncHandler } from '../utils/asyncWrapper.js';

const router = express.Router();

const generateTaskId = async () => {
  if (!db) {
    return `TASK-${String(Math.floor(Math.random()*(9999-1000)+1000)).padStart(4, '0')}`;
  }
  const snapshot = await db.collection('tasks').count().get();
  const count = snapshot.data().count;

  const sequence = (count || 0) + 1;
  return `TASK-${String(sequence).padStart(4, '0')}`;
};

// GET /api/tasks - Get all tasks
router.get('/', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const snapshot = await db.collection('tasks')
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get();

  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({ success: true, tasks: data });
}));

// GET /api/tasks/:taskId - Get specific task
router.get('/:taskId', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const taskId = req.params.taskId;
  const snapshot = await db.collection('tasks')
    .where('id', '==', taskId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const doc = snapshot.docs[0];
  const data = { id: doc.id, ...doc.data() };

  res.status(200).json({ success: true, task: data });
}));

// POST /api/tasks - Create new task
router.post('/', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const payload = { ...req.body };

  if (!payload.id) {
    payload.id = await generateTaskId();
  }

  if (!payload.createdAt) {
    payload.createdAt = new Date().toISOString();
  }

  if (!payload.status) {
    payload.status = 'Pending';
  }

  const docRef = await db.collection('tasks').add(payload);
  const docSnapshot = await docRef.get();
  const data = { id: docSnapshot.id, ...docSnapshot.data() };

  res.status(201).json({ success: true, task: data });
}));

// PUT /api/tasks/:taskId - Update task
router.put('/:taskId', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const taskId = req.params.taskId;
  const updateData = { ...req.body };

  // Find the document by task ID
  const snapshot = await db.collection('tasks')
    .where('id', '==', taskId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const docRef = snapshot.docs[0].ref;
  updateData.updatedAt = new Date().toISOString();

  await docRef.update(updateData);

  const updatedDoc = await docRef.get();
  const data = { id: updatedDoc.id, ...updatedDoc.data() };

  res.status(200).json({ success: true, task: data });
}));

// DELETE /api/tasks/:taskId - Delete task
router.delete('/:taskId', asyncHandler(async (req, res) => {
  if (!db) return res.status(500).json({ success: false, error: 'Database not connected' });

  const taskId = req.params.taskId;

  // Find the document by task ID
  const snapshot = await db.collection('tasks')
    .where('id', '==', taskId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const docRef = snapshot.docs[0].ref;
  await docRef.delete();

  res.status(200).json({ success: true, message: 'Task deleted successfully' });
}));

export default router;