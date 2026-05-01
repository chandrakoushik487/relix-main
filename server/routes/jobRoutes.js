import express from 'express';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { enqueueJob } from '../config/queue.js';
import logger from '../utils/logger.js';

const router = express.Router();

// POST /api/jobs/ocr – enqueue a Cloud Task to process an image in GCS
router.post(
  '/ocr',
  asyncHandler(async (req, res) => {
    const { bucket, fileName } = req.body;
    if (!bucket || !fileName) {
      return res.status(400).json({ success: false, error: 'bucket and fileName are required' });
    }

    const targetUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/api/ai/process`;
    const payload = { bucket, fileName };

    try {
      await enqueueJob(payload, targetUrl);
      logger.info(`Enqueued OCR task for gs://${bucket}/${fileName}`);
      res.status(202).json({ success: true, message: 'OCR job queued' });
    } catch (err) {
      logger.error('Failed to enqueue OCR job:', err);
      res.status(500).json({ success: false, error: 'Failed to queue OCR job' });
    }
  })
);

export default router;
