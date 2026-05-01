import express from 'express';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { Storage } from '@google-cloud/storage';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const storage = new Storage();
// Fallback to a default bucket if env variable is missing during development
const bucketName = process.env.GCS_UPLOAD_BUCKET || 'relix-6218b-relix-uploads';

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, // Increased limit since generating signed URLs is lightweight
  message: { success: false, error: 'Rate limit exceeded. Try again later.' }
});

// Task 3: Refactor uploadRoutes to use GCS signed URLs
router.post('/signed-url', uploadLimiter, asyncHandler(async (req, res) => {
  const { fileName, contentType } = req.body;

  if (!fileName || !contentType) {
    return res.status(400).json({ success: false, error: 'fileName and contentType are required' });
  }

  // Validate content type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(contentType)) {
    return res.status(400).json({ success: false, error: 'Invalid content type' });
  }

  // Generate a unique filename to prevent collisions
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType,
  };

  try {
    const [url] = await storage
      .bucket(bucketName)
      .file(uniqueFileName)
      .getSignedUrl(options);

    res.status(200).json({
      success: true,
      url,
      fileName: uniqueFileName,
      bucket: bucketName,
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ success: false, error: 'Failed to generate upload URL' });
  }
}));

export default router;
