import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: String,
  status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' },
  source: { type: String, enum: ['footer', 'home', 'checkout', 'popup', 'api'], default: 'footer' },
  unsubscribedAt: Date,
  unsubscribeToken: String,
  tags: [String],
}, { timestamps: true });

subscriberSchema.index({ email: 1 });

export default mongoose.model('Subscriber', subscriberSchema);
