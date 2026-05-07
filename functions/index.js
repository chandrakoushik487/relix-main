import { onObjectFinalized } from 'firebase-functions/v2/storage';
import { logger } from 'firebase-functions';
import { processOCR } from './src/ocr.js';
import { saveToDataLake } from './src/storage.js';
import { writeToFirestore } from './src/firestore.js';

// Initialize Firebase Admin
initializeApp();

// Initialize GC clients
const visionClient = new vision.ImageAnnotatorClient();
const pubsubClient = new PubSub();
const bigqueryClient = new BigQuery();

const TOPIC_NAME = 'incident-events';
const DATASET_ID = 'relix_analytics';
const TABLE_ID = 'incident_logs';

// Initialize Vertex AI (Gemini)
const vertex_ai = new VertexAI({ project: process.env.GCLOUD_PROJECT, location: 'us-central1' });
const generativeModel = vertex_ai.getGenerativeModel({
  model: 'gemini-1.5-flash-001',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.1,
    topP: 0.8,
  },
});

// Task 4 & Task 5a: Trigger on GCS Uploads, perform OCR, and structure with Vertex AI
export const processImage = onObjectFinalized(
  {
    bucket: process.env.GCS_UPLOAD_BUCKET || 'relix-6218b-relix-uploads',
    memory: '1GiB',
    timeoutSeconds: 540, // 9 minutes
  },
  async (event) => {
    const bucket = event.bucket;
    const filePath = event.name;
    const file = event.data;

    // Only process PDFs and images
    const mimeType = file.contentType;
    if (!['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mimeType)) {
      logger.info(`Skipping non-document file: ${filePath}`);
      return;
    }

    const docId = generateDocId(filePath);

    logger.info(`Starting OCR pipeline for docId: ${docId}, file: ${filePath}`);

    try {
      // Step 1: OCR Processing
      logger.info(`Stage: OCR Processing - docId: ${docId}`);
      const ocrResult = await processOCR(bucket, filePath);
      logger.info(`OCR completed for docId: ${docId}, confidence: ${ocrResult.confidence}`);

      // Step 2: Save to Data Lake
      logger.info(`Stage: Data Lake Save - docId: ${docId}`);
      const lakeRef = await saveToDataLake(ocrResult, docId);
      logger.info(`Data lake saved for docId: ${docId}, lakeRef: ${lakeRef}`);

      // Step 3: Sync to Firestore
      logger.info(`Stage: Firestore Sync - docId: ${docId}`);
      await writeToFirestore(ocrResult, docId, lakeRef, 'ocr_complete');
      logger.info(`Firestore synced for docId: ${docId}`);

    } catch (error) {
      logger.error(`Pipeline failed for docId: ${docId}`, error);
      // Still try to save to Firestore with failed status
      try {
        await writeToFirestore({}, docId, '', 'ocr_failed', error.message);
      } catch (fsError) {
        logger.error(`Failed to write failure status to Firestore for docId: ${docId}`, fsError);
      }
    }
  }
);

function generateDocId(filePath) {
  // Use filename without extension as docId, or generate UUID if needed
  const parts = filePath.split('/');
  const filename = parts[parts.length - 1];
  return filename.split('.')[0] || require('crypto').randomUUID();
}


