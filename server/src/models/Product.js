import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: {
    type: String,
    enum: ['red', 'white', 'rosé', 'sparkling', 'olive-oil', 'balsamic', 'gift-set', 'merchandise'],
    required: true,
  },
  varietal: String, // Cabernet Sauvignon, Tempranillo, etc.
  vintage: Number,   // e.g. 2020
  region: { type: String, default: 'Contra Costa County, CA' },
  appellation: String,
  alcoholContent: String,
  servingTemp: String,
  tastingNotes: {
    aroma: String,
    palate: String,
    finish: String,
  },
  foodPairings: [String],
  awards: [{ title: String, year: Number, organization: String }],
  images: [{ url: String, alt: String }],
  inventory: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  collection: { type: String, enum: ['standard', 'give-back', 'reserve', 'seasonal'], default: 'standard' },
  giveBackCharity: String, // For Give Back Series
  metaTitle: String,
  metaDescription: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ slug: 1 });
productSchema.index({ category: 1, vintage: -1 });
productSchema.index({ featured: 1 });

export default mongoose.model('Product', productSchema);
