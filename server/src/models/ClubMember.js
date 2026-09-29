import mongoose from 'mongoose';

const clubMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  tier: {
    type: String,
    enum: ['red-2-pack', 'red-3-pack', 'white-2-pack', 'mixed-2-pack', 'mixed-3-pack', 'reserve'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'pending'],
    default: 'pending',
  },
  stripeSubscriptionId: String,
  stripeCustomerId: String,
  shipmentPreference: {
    type: String,
    enum: ['ship', 'pickup'],
    default: 'ship',
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: 'US' },
  },
  nextShipmentDate: Date,
  joinedAt: { type: Date, default: Date.now },
  cancelledAt: Date,
  cancellationReason: String,
  notes: String,
  shipments: [{
    date: Date,
    status: { type: String, enum: ['pending', 'shipped', 'delivered'] },
    trackingNumber: String,
    wines: [{ name: String, vintage: Number, quantity: Number }],
  }],
}, { timestamps: true });

export default mongoose.model('ClubMember', clubMemberSchema);
