import Queue from 'bull';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Define the OCR processing queue
export const ocrQueue = new Queue('ocr-jobs', REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5s, 15s, 45s due to exponential decay
    },
    removeOnComplete: true, // auto-cleanup stale jobs that are successful
    removeOnFail: false,
    timeout: 1000 * 60 * 30 // Job TTL: 30 minutes
  }
});

ocrQueue.on('error', (error) => {
  logger.error(`Bull Queue Error: ${error.message}`);
});

ocrQueue.on('failed', (job, err) => {
  logger.error(`Job failed ${job.id} with error ${err.message}`);
});

export const connectQueue = async () => {
  try {
    const redisClient = ocrQueue.client;
    if (redisClient.status === 'ready' || redisClient.status === 'connecting') {
        logger.info('Redis connection for Bull Queue initialized.');
    }
  } catch (err) {
      logger.error('Failed to connect to Redis Queue:', err);
  }
};
