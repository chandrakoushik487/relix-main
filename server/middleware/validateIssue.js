import { z } from 'zod';
import xss from 'xss';

// Dataset validation for the full RELIX issue model
// Fixed: field names, enum values, and casing now match the Firestore data model
export const issueValidationSchema = z.object({
  issue_id: z.string().trim().optional(),

  // Fix #1a: renamed issue_description -> description (matches Firestore model)
  description: z.string().min(5).max(2000).transform(val => xss(val.trim())),

  // Fix #1b: lowercase enum values (matches Firestore / Mongoose model)
  problem_type: z.enum(['water', 'health', 'education', 'shelter', 'food', 'other']),

  // Fix #1c: renamed area -> location (matches Firestore model)
  location: z.string().min(2).max(200).transform(val => xss(val.trim())),

  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),

  // Fix #1d: lowercase enum values
  urgency_level: z.enum(['low', 'medium', 'high']),

  // Computed field — set by SVI engine after creation
  svi_score: z.number().min(0).max(10).nullable().optional(),

  // Fix #1e: lowercase enums + 'resolved' instead of 'Completed'
  status: z.enum(['pending', 'assigned', 'resolved']).default('pending'),

  // Fix #1f: added missing fields that exist in the Mongoose model and routes
  people_affected: z.number().int().min(1).max(1000000).nullable().optional(),
  ngo_name: z.string().max(100).transform(val => xss(val.trim())).optional(),
  raw_ocr_text: z.string().optional(),
  job_id: z.string().nullable().optional(),

  upload_date: z.string().optional(),
  ocr_confidence: z.number().min(0).max(1).nullable().optional(),

  // Volunteer fields (optional, set during assignment)
  volunteer_id: z.string().nullable().optional(),
  volunteer_name: z.string().max(200).transform(val => xss(val.trim())).nullable().optional(),
  volunteer_skills: z.string().max(500).transform(val => xss(val.trim())).nullable().optional(),
  assigned_time: z.string().nullable().optional(),
  resolution_time: z.string().nullable().optional(),
  response_time_minutes: z.number().int().min(0).nullable().optional(),
  reported_by: z.string().max(100).transform(val => xss(val.trim())).nullable().optional()
});

// Used in route middleware to cleanly strip harmful text and validate schema
export const validateIssuePayload = (req, res, next) => {
  try {
    req.body = issueValidationSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Data Validation Failed',
      details: error.errors
    });
  }
};
