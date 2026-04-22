import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90,
    default: null
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    default: null
  },
  problem_type: {
    type: String,
    enum: ['water', 'health', 'education', 'shelter', 'food', 'other'],
    required: true
  },
  urgency_level: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true
  },
  people_affected: {
    type: Number,
    min: 1,
    max: 1000000,
    default: null
  },
  description: {
    type: String,
    maxlength: 2000,
    trim: true,
    default: ''
  },
  ngo_name: {
    type: String,
    maxlength: 100,
    trim: true,
    default: 'Unknown NGO'
  },
  ocr_confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'resolved'],
    default: 'pending'
  },
  raw_ocr_text: {
    type: String,
    default: ''
  },
  job_id: {
    type: String,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes to meet performance specs (Tasks 25-28)
issueSchema.index({ urgency_level: 1, status: 1 });
issueSchema.index({ created_at: -1 });
// 2dsphere indexing for geolocation
issueSchema.index({ latitude: 1, longitude: 1 }, { '2dsphere': true });
issueSchema.index({ ngo_name: 1 });

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
