import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: { type: String, trim: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isEmailVerified: { type: Boolean, default: false },
  ageVerified: { type: Boolean, default: false },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: 'US' },
  },
  wineClubMember: { type: Boolean, default: false },
  wineClubTier: { type: String, enum: ['none', 'red', 'white', 'mixed', 'reserve'], default: 'none' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('User', userSchema);
