import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { db } from './config/firebase.js';
import { connectQueue } from './config/queue.js';
import { loadSecretsIntoEnv } from './utils/secrets.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

// Basic healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date() });
});

import uploadRoutes from './routes/uploadRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import bulkUploadRoutes from './routes/bulkUploadRoutes.js';
import ocrCallbackRoutes from './routes/ocrCallback.js';

app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/bulk-upload', bulkUploadRoutes);
app.use('/api', ocrCallbackRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080; // Changed to 8080 for Cloud Run default

const initServer = async () => {
  // Task 16: Load secrets from Google Secret Manager in production
  if (process.env.NODE_ENV === 'production') {
    await loadSecretsIntoEnv([
      'FIREBASE_SERVICE_ACCOUNT',
      'MAPS_API_KEY',
      'JWT_SECRET'
    ]);
  }
  try {
    if (db) {
       await db.collection('issues').limit(1).get();
       logger.info('Firebase Firestore connected successfully.');
    }
  } catch (err) {
    logger.warn('Firebase connection check failed:', err.message);
  }

  await connectQueue();
  
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

initServer();

