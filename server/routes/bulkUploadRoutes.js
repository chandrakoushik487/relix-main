import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import { db } from '../config/firebase.js';
import { uploadCsvMiddleware } from '../middleware/upload.js';
import { asyncHandler } from '../utils/asyncWrapper.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Helper to map CSV headers to Firestore keys
const mapRowToIssue = (row) => {
  const findValue = (keys) => {
    const foundKey = Object.keys(row).find(k => 
      keys.some(searchKey => k.toLowerCase().replace(/[\s_-]/g, '').includes(searchKey.toLowerCase()))
    );
    return foundKey ? row[foundKey] : null;
  };

  return {
    issue_id: findValue(['issueid', 'id']) || `ISS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    issue_description: findValue(['description', 'desc', 'problem', 'issue']) || 'No description provided.',
    problem_type: findValue(['type', 'category', 'problemtype']) || 'Others',
    urgency_level: findValue(['urgency', 'priority', 'level']) || 'Medium',
    status: findValue(['status', 'state']) || 'Pending',
    area: findValue(['area', 'location', 'region', 'locality']) || 'Unknown',
    pincode: findValue(['pincode', 'zip', 'zipcode']),
    latitude: parseFloat(findValue(['lat', 'latitude'])) || 0,
    longitude: parseFloat(findValue(['lng', 'long', 'longitude'])) || 0,
    svi_score: parseFloat(findValue(['svi', 'score', 'vulnerability'])) || 0,
    reported_by: findValue(['reporter', 'reportedby', 'source']) || 'Bulk Upload',
    upload_date: findValue(['date', 'timestamp', 'uploaddate']) || new Date().toISOString(),
  };
};

router.post('/csv', uploadCsvMiddleware.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No CSV file provided.' });
  }

  if (!db) {
      return res.status(500).json({ success: false, error: 'Firestore database not connected.' });
  }

  const results = [];
  const errors = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const batch = db.batch();
        const collectionRef = db.collection('issues');
        let count = 0;

        for (const row of results) {
          const issueData = mapRowToIssue(row);
          const docRef = collectionRef.doc(); // Generate auto ID
          batch.set(docRef, issueData);
          count++;
          
          // Firestore batches are limited to 500 operations
          if (count >= 500) break; 
        }

        await batch.commit();

        // Cleanup file
        fs.unlinkSync(filePath);

        res.status(200).json({
          success: true,
          message: `Successfully processed ${count} rows from CSV.`,
          count: count,
          skipped: results.length - count
        });
      } catch (err) {
        logger.error(`Bulk upload processing error: ${err.message}`);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.status(500).json({ success: false, error: 'Failed to process CSV data.', details: err.message });
      }
    })
    .on('error', (err) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      res.status(500).json({ success: false, error: 'Failed to read CSV file.', details: err.message });
    });
}));

export default router;
