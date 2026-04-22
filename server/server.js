import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { admin, db } from './config/firebase.js';
// Database via Firebase Firestore
import { connectQueue } from './config/queue.js';
import logger from './utils/logger.js';

// Load env variables (assuming server is run from monorepo root or has access to ../.env)
dotenv.config({ path: '../.env' }); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.DOMAIN_ORIGIN 
      : [/http:\/\/localhost:\d+/], // Match local vite ports
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

// Inject socket.io to be accessible in routes (req.app.get('io'))
app.set('io', io);

// Basic healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date() });
});

import uploadRoutes from './routes/uploadRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import bulkUploadRoutes from './routes/bulkUploadRoutes.js';

app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/bulk-upload', bulkUploadRoutes);

// Error Handling Middleware (Keep at the bottom)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database Connection & Server Start
const initServer = async () => {
  // Test Firebase connection
  try {
    if (db) {
       await db.collection('issues').limit(1).get();
       logger.info('Firebase Firestore connected successfully.');
    }
  } catch (err) {
    logger.warn('Firebase not fully configured yet. Running offline.', err.message);
  }

  await connectQueue();
  
  server.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

initServer();
