import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

/**
 * Processes a document (PDF or image) using Google Cloud Vision API
 * @param {string} bucket - GCS bucket name
 * @param {string} filePath - Path to the file in GCS
 * @returns {Promise<Object>} OCR result with raw_text, pages, confidence, etc.
 */
export async function processOCR(bucket, filePath) {
  const gcsUri = `gs://${bucket}/${filePath}`;

  try {
    // For PDFs, use documentTextDetection; for images, textDetection
    const isPdf = filePath.toLowerCase().endsWith('.pdf');
    const [result] = isPdf
      ? await client.documentTextDetection(gcsUri)
      : await client.textDetection(gcsUri);

    const fullTextAnnotation = result.fullTextAnnotation;
    const rawText = fullTextAnnotation ? fullTextAnnotation.text : '';

    // Extract pages
    const pages = fullTextAnnotation ? fullTextAnnotation.pages.map(page => ({
      text: page.text || '',
      confidence: page.confidence || 0,
      width: page.width || 0,
      height: page.height || 0
    })) : [];

    // Overall confidence
    const confidence = fullTextAnnotation ? fullTextAnnotation.confidence || 0 : 0;

    // Bounding boxes (word-level)
    const boundingBoxes = [];
    if (fullTextAnnotation && fullTextAnnotation.pages) {
      for (const page of fullTextAnnotation.pages) {
        if (page.blocks) {
          for (const block of page.blocks) {
            if (block.paragraphs) {
              for (const paragraph of block.paragraphs) {
                if (paragraph.words) {
                  for (const word of paragraph.words) {
                    if (word.boundingBox && word.symbols) {
                      boundingBoxes.push({
                        word: word.symbols.map(s => s.text).join(''),
                        vertices: word.boundingBox.vertices.map(v => ({ x: v.x || 0, y: v.y || 0 }))
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // Metadata
    const metadata = {
      filename: filePath.split('/').pop(),
      mime_type: isPdf ? 'application/pdf' : 'image/*', // Approximate
      page_count: pages.length,
      processed_at: new Date().toISOString()
    };

    return {
      raw_text: rawText,
      pages,
      confidence,
      bounding_boxes: boundingBoxes,
      metadata
    };

  } catch (error) {
    console.error('OCR processing failed:', error);
    throw new Error(`OCR failed: ${error.message}`);
  }
}