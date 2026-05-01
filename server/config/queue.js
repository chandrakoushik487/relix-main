import { CloudTasksClient } from '@google-cloud/tasks';
import logger from '../utils/logger.js';

const client = new CloudTasksClient();

// Task 9: Replace Bull queue with Cloud Tasks
export const enqueueJob = async (payload, targetUrl) => {
  const project = process.env.GOOGLE_PROJECT_ID;
  const queue = process.env.CLOUD_TASKS_QUEUE_ID || 'ocr-jobs';
  const location = process.env.GOOGLE_LOCATION || 'us-central1';

  const parent = client.queuePath(project, location, queue);

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url: targetUrl,
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  try {
    const [response] = await client.createTask({ parent, task });
    logger.info(`Created task ${response.name}`);
    return response;
  } catch (error) {
    logger.error('Error creating Cloud Task:', error);
    throw error;
  }
};

export const connectQueue = async () => {
  logger.info('Cloud Tasks client initialized.');
};

