import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "1:00 PM"
  partySize: { type: Number, required: true, min: 1, max: 20 },
  tastingType: {
    type: String,
    enum: ['standard', 'reserve', 'private', 'cave', 'food-pairing'],
    default: 'standard',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending',
  },
  specialRequests: String,
  stripePaymentIntentId: String,
  depositPaid: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  cancellationReason: String,
  cancelledAt: Date,
  reminderSent: { type: Boolean, default: false },
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
  if (!this.bookingNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.bookingNumber = `BK-${timestamp}-${random}`;
  }
  next();
});

bookingSchema.index({ date: 1, timeSlot: 1 });

export default mongoose.model('Booking', bookingSchema);
