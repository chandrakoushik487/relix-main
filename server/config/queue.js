import Queue from 'bull';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// Fix #20: Use absolute path so queue config works regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Define the OCR processing queue
let ocrQueue;
try {
  ocrQueue = new Queue('ocr-jobs', REDIS_URL, {
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
    // Only log Redis connection errors once, not repeatedly
    if (!ocrQueue._errorLogged) {
      logger.error(`Bull Queue Error: ${error.message}`);
      ocrQueue._errorLogged = true;
    }
  });

  ocrQueue.on('failed', (job, err) => {
    logger.error(`Job failed ${job.id} with error ${err.message}`);
  });
} catch (err) {
  logger.warn('Bull Queue not available - Redis may not be running:', err.message);
  ocrQueue = null;
}

export { ocrQueue };

export const connectQueue = async () => {
  if (!ocrQueue) {
    logger.warn('Skipping queue connection - Redis not available');
    return;
  }
  try {
    const redisClient = ocrQueue.client;
    if (redisClient.status === 'ready' || redisClient.status === 'connecting') {
        logger.info('Redis connection for Bull Queue initialized.');
    }
  } catch (err) {
      logger.error('Failed to connect to Redis Queue:', err);
  }
};
