import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    index: true, // Index for faster queries on unique visitors
  },
  userAgent: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // Index for faster queries
  },
  page: {
    type: String,
    default: 'home',
  },
});

// Add compound index for visitorId and timestamp for unique visitor queries
VisitorSchema.index({ visitorId: 1, timestamp: 1 });

export default mongoose.models.Visitor ||
  mongoose.model('Visitor', VisitorSchema);
