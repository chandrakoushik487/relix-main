import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const db = getFirestore();

/**
 * Writes OCR result to Firestore issues collection
 * @param {Object} ocrResult - OCR output
 * @param {string} docId - Document ID
 * @param {string} lakeRef - Data lake reference
 * @param {string} status - Status ('ocr_complete' or 'ocr_failed')
 * @param {string} errorMessage - Error message if failed
 */
export async function writeToFirestore(ocrResult, docId, lakeRef, status, errorMessage = '') {
  const docRef = db.collection('issues').doc(docId);

  const data = {
    docId,
    filename: ocrResult.metadata?.filename || '',
    status,
    raw_text: ocrResult.raw_text || '',
    confidence: ocrResult.confidence || 0,
    pages: ocrResult.metadata?.page_count || 0,
    lakeRef,
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
    source: 'ocr_pipeline'
  };

  if (status === 'ocr_failed') {
    data.error_message = errorMessage;
  }

  try {
    await docRef.set(data, { merge: true });
    console.log(`Written to Firestore: issues/${docId}`);
  } catch (error) {
    console.error('Firestore write failed:', error);
    throw new Error(`Firestore write failed: ${error.message}`);
  }
}