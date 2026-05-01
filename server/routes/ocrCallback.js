import express from 'express';
import { asyncHandler } from '../utils/asyncWrapper.js';
import { processImageWithAI } from '../services/aiService.js';
import logger from '../utils/logger.js';
import { db } from '../config/firebase.js';
import { findBestVolunteers, assignVolunteerToIssueAtomic } from '../services/volunteerService.js';
import { sendRelixEmailAlert } from '../services/notificationService.js';

const router = express.Router();

/**
 * Cloud Tasks POST → /api/ocr-callback
 * Expected body: { bucket: string, fileName: string }
 */
router.post(
  '/ocr-callback',
  asyncHandler(async (req, res) => {
    const { bucket, fileName } = req.body;
    if (!bucket || !fileName) {
      logger.warn('OCR callback missing bucket or fileName');
      return res.status(400).json({ success: false, error: 'bucket & fileName required' });
    }

    // Build the GCS URI for the AI service
    const gcsUri = `gs://${bucket}/${fileName}`;

    // Call the AI micro‑service to get structured data
    const aiResult = await processImageWithAI(gcsUri);
    if (!aiResult?.success) {
      logger.error('AI processing failed', aiResult);
      return res.status(502).json({ success: false, error: 'AI service error' });
    }

    // Persist incident in Firestore
    const incidentRef = db.collection('incidents').doc();
    const incidentData = {
      ...aiResult.data,
      createdAt: new Date(),
      gcsUri,
      status: 'pending',
    };
    await incidentRef.set(incidentData);
    logger.info(`Incident ${incidentRef.id} stored`);

    // Volunteer matching – pick top 2 volunteers
    const matches = await findBestVolunteers(incidentData, 2);
    if (matches.length) {
      for (const { volunteer } of matches) {
        try {
          await assignVolunteerToIssueAtomic(volunteer._id, incidentRef.id);
        } catch (e) {
          logger.warn(`Volunteer ${volunteer._id} could not be assigned: ${e.message}`);
        }
      }
      await incidentRef.update({ assignedVolunteers: matches.map(m => m.volunteer._id) });
    }

    // Send email notification to admins (simple example)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@relix.local';
    const html = `<p>New incident ${incidentRef.id} created.</p>`;
    await sendRelixEmailAlert(adminEmail, 'New RELIX Incident', html);

    res.status(200).json({ success: true, incidentId: incidentRef.id });
  })
);

export default router;
