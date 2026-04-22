import express from 'express';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { ocrQueue } from '../config/queue.js';

const router = express.Router();

// Task 46: Create GET /api/jobs/:id endpoint
router.get('/:id', asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await ocrQueue.getJob(jobId);

  if (!job) {
    return res.status(404).json({ success: false, error: 'Job not found' });
  }
  
  const state = await job.getState();
  const progress = job._progress;
  const returnData = job.returnvalue;
  const failedReason = job.failedReason;

  res.status(200).json({
    success: true,
    jobId: job.id,
    state, // 'waiting', 'active', 'completed', 'failed', 'delayed', 'paused'
    progress,
    data: returnData || null,
    error: failedReason || null
  });
}));

export default router;
