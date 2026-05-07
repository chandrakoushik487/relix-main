import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
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
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

let isReady = false;
let initError = null;

// Initialization Guard Middleware
app.use((req, res, next) => {
  if (isReady) return next();
  if (initError) return res.status(500).json({ success: false, error: 'Server initialization failed' });
  res.set('Retry-After', '5');
  return res.status(503).json({ success: false, message: 'Server is starting up, please try again in a few seconds.' });
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

// Basic healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date(), service: 'relix-server' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date(), service: 'relix-server-api' });
});

import uploadRoutes from './routes/uploadRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import bulkUploadRoutes from './routes/bulkUploadRoutes.js';
import ocrCallbackRoutes from './routes/ocrCallback.js';

app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/tasks', taskRoutes);
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
  
  isReady = true;
  logger.info('Server initialization complete. Ready to handle requests.');
};

initServer().catch(err => {
  initError = err;
  console.error('initServer failed:', err);
});

export const api = onRequest({ cors: true, maxInstances: 10 }, app);
