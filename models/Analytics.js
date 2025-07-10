// models/Analytics.js
import mongoose from 'mongoose';
const analyticsSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  browser: {
    type: String
  },
  platform: {
    type: String
  },
  country: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;