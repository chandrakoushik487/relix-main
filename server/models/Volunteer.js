import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  skills: [{
    type: String,
    enum: ['water', 'health', 'education', 'shelter', 'food', 'logistics']
  }],
  active_tasks: {
    type: Number,
    default: 0,
    min: 0
  },
  max_tasks: {
    type: Number,
    default: 3,
    min: 1
  },
  available: {
    type: Boolean,
    default: true
  },
  last_active: {
    type: Date,
    default: Date.now
  },
  contact_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  contact_phone: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes to meet performance specs (Tasks 29-30)
volunteerSchema.index({ latitude: 1, longitude: 1 }, { '2dsphere': true });
volunteerSchema.index({ available: 1, active_tasks: 1 });
volunteerSchema.index({ last_active: 1 });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
