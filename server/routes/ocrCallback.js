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
 * Expected body: { bucket: string, fileName: string, jobId?: string }
 * 
 * This endpoint receives OCR processing results from the AI service
 * and persists them to Firestore with volunteer matching.
 */
router.post(
  '/ocr-callback',
  asyncHandler(async (req, res) => {
    const { bucket, fileName, jobId } = req.body;
    
    if (!bucket || !fileName) {
      logger.warn('OCR callback missing bucket or fileName');
      return res.status(400).json({
        success: false,
        error: 'bucket & fileName required',
      });
    }

    try {
      // Build the GCS URI for the AI service
      const gcsUri = `gs://${bucket}/${fileName}`;
      logger.info(`Processing OCR callback for ${gcsUri}`);

      // Call the AI micro-service to get structured data
      const aiResult = await processImageWithAI(gcsUri);
      
      if (!aiResult?.success) {
        logger.error('AI processing failed', aiResult);
        return res.status(502).json({
          success: false,
          error: 'AI service error',
          details: aiResult?.error,
        });
      }

      const structuredData = aiResult.data;

      // Validate schema version and required fields
      if (structuredData.schema_version !== '2.0') {
        logger.warn(`Unexpected schema version: ${structuredData.schema_version}`);
      }

      if (!structuredData.problem_type) {
        logger.error('Missing problem_type in structured data');
        return res.status(400).json({
          success: false,
          error: 'Invalid structured data: missing problem_type',
        });
      }

      // Prepare incident data for Firestore
      const incidentData = {
        // Core civic issue data
        schema_version: structuredData.schema_version || '2.0',
        issue_id: structuredData.issue_id,
        area: structuredData.area || null,
        location_raw: structuredData.location_raw || {
          street: null,
          landmark: null,
          locality: null,
          city: null,
          state: null,
        },
        issue_description: structuredData.issue_description || null,
        latitude: structuredData.latitude || null,
        longitude: structuredData.longitude || null,
        pincode: structuredData.pincode || null,
        problem_type: structuredData.problem_type,
        secondary_problem_type: structuredData.secondary_problem_type || null,
        multi_issue_detected: structuredData.multi_issue_detected || false,
        severity_score: structuredData.severity_score || null,
        urgency_level: structuredData.urgency_level || null,
        incident_date_estimate: structuredData.incident_date_estimate || null,
        repeat_complaint: structuredData.repeat_complaint || null,

        // Metadata
        _meta: structuredData._meta || {
          ocr_quality: 'unknown',
          source_language: 'en',
          extraction_confidence: 'low',
          fields_extracted: [],
          fields_nulled: [],
          translation_applied: false,
          fail_safe_triggered: false,
          processing_notes: null,
        },

        // System fields
        status: 'pending',
        gcsUri,
        jobId: jobId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store incident in Firestore
      const incidentRef = db.collection('incidents').doc();
      await incidentRef.set(incidentData);
      logger.info(`Incident ${incidentRef.id} stored in Firestore`);

      // Find and assign best volunteer matches
      const matches = await findBestVolunteers(incidentData, 2);
      const assignedVolunteerIds = [];

      if (matches && matches.length > 0) {
        logger.info(`Found ${matches.length} volunteer matches`);
        
        for (const { volunteer } of matches) {
          try {
            await assignVolunteerToIssueAtomic(volunteer._id, incidentRef.id);
            assignedVolunteerIds.push(volunteer._id);
            logger.info(`Assigned volunteer ${volunteer._id} to incident ${incidentRef.id}`);
          } catch (e) {
            logger.warn(
              `Volunteer ${volunteer._id} could not be assigned: ${e.message}`
            );
          }
        }

        // Update incident with assigned volunteers
        if (assignedVolunteerIds.length > 0) {
          await incidentRef.update({
            assignedVolunteers: assignedVolunteerIds,
          });
        }
      } else {
        logger.info('No matching volunteers found for incident');
      }

      // Send email notification to admins
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@relix.local';
      const urgencyBadge = incidentData.urgency_level
        ? `[${incidentData.urgency_level.toUpperCase()}]`
        : '[UNKNOWN]';

      const html = `
        <h2>New RELIX Civic Issue Report ${urgencyBadge}</h2>
        <p><strong>Incident ID:</strong> ${incidentRef.id}</p>
        <p><strong>Problem Type:</strong> ${incidentData.problem_type}</p>
        <p><strong>Area:</strong> ${incidentData.area || 'Unknown'}</p>
        <p><strong>Description:</strong> ${incidentData.issue_description || 'No description'}</p>
        <p><strong>Severity Score:</strong> ${incidentData.severity_score || 'Not assessed'}/10</p>
        <p><strong>Urgency Level:</strong> ${incidentData.urgency_level || 'Unknown'}</p>
        <p><strong>Extraction Confidence:</strong> ${
          incidentData._meta.extraction_confidence || 'Unknown'
        }</p>
        <p><strong>Volunteers Assigned:</strong> ${assignedVolunteerIds.length}</p>
        <hr />
        <p><small>OCR Quality: ${incidentData._meta.ocr_quality}</small></p>
        <p><small>Source Language: ${incidentData._meta.source_language}</small></p>
        ${
          incidentData._meta.fail_safe_triggered
            ? '<p style="color: red;"><strong>⚠️ Fail-safe output triggered (low OCR quality)</strong></p>'
            : ''
        }
      `;

      try {
        await sendRelixEmailAlert(adminEmail, `New RELIX Issue ${urgencyBadge}`, html);
        logger.info(`Email notification sent to ${adminEmail}`);
      } catch (emailError) {
        logger.warn(`Failed to send email notification: ${emailError.message}`);
      }

      // Return success response
      return res.status(200).json({
        success: true,
        incidentId: incidentRef.id,
        firestoreDocId: incidentRef.id,
        problem_type: incidentData.problem_type,
        urgency_level: incidentData.urgency_level,
        volunteersAssigned: assignedVolunteerIds.length,
        extraction_confidence: incidentData._meta.extraction_confidence,
        fail_safe_triggered: incidentData._meta.fail_safe_triggered,
      });
    } catch (error) {
      logger.error(`OCR callback processing error: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message,
      });
    }
  })
);

export default router;
