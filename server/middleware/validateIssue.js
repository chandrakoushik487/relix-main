import { z } from 'zod';
import xss from 'xss';

// Dataset validation for the full RELIX issue model
export const issueValidationSchema = z.object({
  issue_id: z.string().trim().optional(),
  issue_description: z.string().min(5).max(2000).transform(val => xss(val.trim())),
  problem_type: z.enum(['Water', 'Health', 'Education', 'Housing', 'Others']),
  area: z.string().min(2).max(200).transform(val => xss(val.trim())),
  pincode: z.string().min(3).max(20).transform(val => xss(val.trim())).optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  urgency_level: z.enum(['Low', 'Medium', 'High']),
  svi_score: z.number().min(0).max(10).nullable().optional(),
  status: z.enum(['Pending', 'Assigned', 'Completed']).default('Pending'),
  upload_date: z.string().optional(),
  ocr_confidence: z.number().min(0).max(100).nullable().optional(),
  image_format: z.enum(['JPG', 'PNG']).optional(),
  file_size_mb: z.number().min(0).nullable().optional(),
  volunteer_id: z.string().uuid().nullable().optional(),
  volunteer_name: z.string().max(200).transform(val => xss(val.trim())).nullable().optional(),
  volunteer_skills: z.string().max(500).transform(val => xss(val.trim())).nullable().optional(),
  assigned_time: z.string().nullable().optional(),
  resolution_time: z.string().nullable().optional(),
  response_time_minutes: z.number().int().min(0).nullable().optional(),
  reported_by: z.string().max(100).transform(val => xss(val.trim())).nullable().optional()
});

// Used in route middleware to cleanly strip harmful text
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
