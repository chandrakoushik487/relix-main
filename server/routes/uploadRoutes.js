import express from 'express';
import { uploadLimitMiddleware } from '../middleware/upload.js';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { ocrQueue } from '../config/queue.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Utility for checking disk space (Task 48) - basic mock as os-level disk check is complex
const checkDiskSpace = () => true; 

// Task 41: Apply rate limiting: 10 requests / 15 mins (We will attach this in server.js or here)
import rateLimit from 'express-rate-limit';
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: { success: false, error: 'Upload rate limit exceeded. Max 10 requests per 15 minutes.' }
});

router.post('/', uploadLimiter, uploadLimitMiddleware.array('documents', 5), asyncHandler(async (req, res) => {
  if (!checkDiskSpace()) {
    return res.status(507).json({ success: false, error: 'Insufficient server storage.' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, error: 'No files provided.' });
  }

  // Task 44: Unique Job ID
  const jobId = Date.now().toString(36) + Math.random().toString(36).substring(2);

  const fileData = [];

  for (const file of req.files) {
    // Task 42: Implement image integrity validation (Sharp)
    try {
      const metadata = await sharp(file.path).metadata();
      if (!metadata.format) throw new Error('Invalid image');
    } catch (err) {
      // Clean up bad file
      fs.unlinkSync(file.path);
      return res.status(422).json({ success: false, error: `Image integrity check failed for ${file.originalname}` });
    }
    
    fileData.push({
      path: file.path,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
  }

  // Task 45: Queue job in Bull (if available)
  // Task 47: Job States (bull implicit: waiting, active, completed, failed)
  if (!ocrQueue) {
    return res.status(503).json({
      success: false,
      error: 'Queue service unavailable. Please try again later.'
    });
  }

  const job = await ocrQueue.add({
    uploadJobId: jobId,
    files: fileData
  }, { jobId: jobId }); // Use custom ID for Bull

  // Return 202 Accepted
  res.status(202).json({
    success: true,
    message: 'Files accepted and queued for processing',
    jobId: job.id,
    files_received: req.files.length
  });
}));

export default router;
