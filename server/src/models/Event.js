import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: String,
  date: { type: Date, required: true },
  endDate: Date,
  startTime: String,
  endTime: String,
  location: { type: String, default: 'Campos Family Vineyards — 3501 Byer Rd., Byron, CA 94514' },
  category: {
    type: String,
    enum: ['concert', 'wine-release', 'food-pairing', 'private', 'festival', 'club-member', 'general'],
    default: 'general',
  },
  image: { url: String, alt: String },
  price: { type: Number, default: 0 },
  memberPrice: Number,
  capacity: Number,
  ticketsSold: { type: Number, default: 0 },
  ticketsAvailable: Number,
  isPublic: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  requiresTicket: { type: Boolean, default: false },
  stripeProductId: String,
  stripePriceId: String,
  tags: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

eventSchema.index({ date: 1 });
eventSchema.index({ slug: 1 });

export default mongoose.model('Event', eventSchema);
