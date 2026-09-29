import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/v1/products
export const getProducts = asyncHandler(async (req, res) => {
  const {
    category, varietal, vintage, minPrice, maxPrice, featured,
    collection, inStock, search, sort = '-createdAt', page = 1, limit = 12,
  } = req.query;

  const filter = { isActive: true };
  if (category) filter.category = category;
  if (varietal) filter.varietal = new RegExp(varietal, 'i');
  if (vintage) filter.vintage = Number(vintage);
  if (featured === 'true') filter.featured = true;
  if (collection) filter.collection = collection;
  if (inStock === 'true') filter.inStock = true;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { varietal: new RegExp(search, 'i') },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sort).skip(skip).limit(Number(limit));

  res.json({
    success: true,
    count: products.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    products,
  });
});

// @desc    Get single product by slug
// @route   GET /api/v1/products/:slug
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, product });
});

// @desc    Create product (Admin)
// @route   POST /api/v1/products
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// @desc    Update product (Admin)
// @route   PUT /api/v1/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, product });
});

// @desc    Delete product (Admin)
// @route   DELETE /api/v1/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, message: 'Product deactivated' });
});

// @desc    Get featured products
// @route   GET /api/v1/products/featured
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true, isActive: true }).limit(6);
  res.json({ success: true, products });
});
