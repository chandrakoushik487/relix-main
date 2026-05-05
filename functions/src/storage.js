import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const dataLakeBucket = process.env.DATA_LAKE_BUCKET || 'relix-data-lake';

/**
 * Saves OCR result to data lake
 * @param {Object} ocrResult - The OCR output
 * @param {string} docId - Document ID
 * @returns {Promise<string>} Path in data lake
 */
export async function saveToDataLake(ocrResult, docId) {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const lakePath = `ocr-results/${date}/${docId}.json`;

  try {
    const bucket = storage.bucket(dataLakeBucket);
    const file = bucket.file(lakePath);

    await file.save(JSON.stringify(ocrResult, null, 2), {
      metadata: {
        contentType: 'application/json',
      },
    });

    console.log(`Saved OCR result to data lake: ${lakePath}`);
    return lakePath;

  } catch (error) {
    console.error('Data lake save failed:', error);
    throw new Error(`Data lake save failed: ${error.message}`);
  }
}