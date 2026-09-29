import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  inquiryType: {
    type: String,
    enum: ['general', 'event', 'booking', 'wine-club', 'wholesale', 'media', 'other'],
    default: 'general',
  },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
  repliedAt: Date,
  adminNotes: String,
  ipAddress: String,
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);
