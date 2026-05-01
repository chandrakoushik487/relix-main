import { onObjectFinalized } from 'firebase-functions/v2/storage';
import { onMessagePublished } from 'firebase-functions/v2/pubsub';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import vision from '@google-cloud/vision';
import { VertexAI } from '@google-cloud/vertexai';
import { PubSub } from '@google-cloud/pubsub';
import { BigQuery } from '@google-cloud/bigquery';

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Initialize GC clients
const visionClient = new vision.ImageAnnotatorClient();
const pubsubClient = new PubSub();
const bigqueryClient = new BigQuery();

const TOPIC_NAME = 'incident-events';
const DATASET_ID = 'relix_analytics';
const TABLE_ID = 'incident_logs';

// Initialize Vertex AI (Gemini)
const vertex_ai = new VertexAI({ project: process.env.GCLOUD_PROJECT, location: 'us-central1' });
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: 'gemini-1.5-pro-preview-0409',
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
    timeoutSeconds: 120,
  },
  async (event) => {
    const fileBucket = event.data.bucket;
    const filePath = event.data.name;
    const gcsUri = `gs://${fileBucket}/${filePath}`;
    
    try {
      // Step 1: Perform OCR using Google Cloud Vision API
      const [result] = await visionClient.textDetection(gcsUri);
      const detections = result.textAnnotations;
      const rawText = detections.length > 0 ? detections[0].description : '';
      
      if (!rawText) return;

      // Step 2: Use Vertex AI (Gemini) to structure the data
      const prompt = `Extract location, urgency, issueType, peopleAffected, description from this OCR text as JSON: ${rawText}`;
      const req = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
      const streamingResp = await generativeModel.generateContent(req);
      const responseText = streamingResp.response.candidates[0].content.parts[0].text;
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const structuredData = JSON.parse(cleanJson);

      // Step 3: Write to Firestore
      const incidentRef = db.collection('issues').doc();
      const incidentData = {
        ...structuredData,
        originalImageUri: gcsUri,
        status: 'pending',
        createdAt: new Date(),
      };
      await incidentRef.set(incidentData);

      // Task 11: Publish to Pub/Sub for analytics
      const messageBuffer = Buffer.from(JSON.stringify({
        incidentId: incidentRef.id,
        ...incidentData,
        timestamp: new Date().toISOString()
      }));
      await pubsubClient.topic(TOPIC_NAME).publishMessage({ data: messageBuffer });

      console.log(`Successfully processed incident: ${incidentRef.id}`);

    } catch (error) {
      console.error(`Error processing image ${gcsUri}:`, error);
    }
  }
);

// Task 11: Pub/Sub -> BigQuery analytics pipeline
export const streamToBigQuery = onMessagePublished(TOPIC_NAME, async (event) => {
  const data = event.data.message.json;
  
  try {
    await bigqueryClient
      .dataset(DATASET_ID)
      .table(TABLE_ID)
      .insert([data]);
    console.log(`Streamed incident ${data.incidentId} to BigQuery`);
  } catch (error) {
    console.error('BigQuery insert error:', JSON.stringify(error));
  }
});
