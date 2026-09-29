/**
 * Database Seed Script — Imports all Campos Family Vineyards content.
 * Run with: npm run seed
 */

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Event from '../models/Event.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campos-vineyards';

const wines = [
  {
    name: "Gigi's Blend",
    slug: 'gigis-blend',
    category: 'red',
    varietal: 'Blend',
    price: 45.00,
    description: "Part of our Give Back Series, Gigi's Blend is a tribute to community and generosity. This beautifully crafted red blend embodies the warmth and spirit of the Campos family. Rich and full-bodied with layers of dark fruit, subtle spice, and a velvety finish that lingers long after the last sip.",
    shortDescription: "A rich, full-bodied red blend. Part of our Give Back Series.",
    tastingNotes: {
      aroma: "Dark cherry, blackberry, hints of vanilla and oak",
      palate: "Full-bodied with ripe tannins, notes of dark fruit, chocolate and spice",
      finish: "Long, velvety finish with lingering warmth"
    },
    foodPairings: ["Grilled ribeye", "Lamb chops", "Aged cheeses", "Dark chocolate"],
    collection: 'give-back',
    giveBackCharity: 'Amy G Give Back Series',
    featured: true,
    inStock: true,
    inventory: 48,
    images: [{ url: '/assets/wines/gigis-blend.jpg', alt: "Gigi's Blend Red Wine" }],
    region: 'Contra Costa County, CA',
  },
  {
    name: "Summer Blend",
    slug: 'summer-blend',
    category: 'red',
    varietal: 'Blend',
    price: 30.00,
    description: "Our Summer Blend captures the warmth and vibrancy of the California Delta summers. A lively, approachable red wine with bright fruit character and a refreshing finish. Perfect for casual gatherings and outdoor dining.",
    shortDescription: "A vibrant, approachable red blend — perfect for summer gatherings.",
    tastingNotes: {
      aroma: "Fresh strawberry, red cherry, light floral notes",
      palate: "Medium-bodied, bright acidity with soft tannins and red fruit character",
      finish: "Clean and refreshing"
    },
    foodPairings: ["Grilled chicken", "Pizza", "Charcuterie boards", "Light pasta dishes"],
    collection: 'standard',
    featured: false,
    inStock: false,
    inventory: 0,
    images: [{ url: '/assets/wines/summer-blend.jpg', alt: "Summer Blend Red Wine" }],
    region: 'Contra Costa County, CA',
  },
  {
    name: "Lilly Rose",
    slug: 'lilly-rose',
    category: 'rosé',
    varietal: 'Rosé',
    price: 32.00,
    description: "Lilly Rose is a delicate, elegant rosé that captures the essence of the California countryside. With its soft pink hue and crisp, refreshing character, this wine is a celebration of summer in every glass. Crafted with care from select Contra Costa County grapes.",
    shortDescription: "A crisp, elegant rosé with soft fruit and refreshing finish.",
    tastingNotes: {
      aroma: "Strawberry, watermelon, rose petals, and fresh herbs",
      palate: "Crisp and refreshing with bright acidity, notes of fresh berries and citrus",
      finish: "Clean, refreshing with a light, lingering sweetness"
    },
    foodPairings: ["Seafood", "Light salads", "Fresh fruit", "Soft cheeses"],
    collection: 'standard',
    featured: true,
    inStock: true,
    inventory: 60,
    images: [{ url: '/assets/wines/lilly-rose.jpg', alt: "Lilly Rose Rosé Wine" }],
    region: 'Contra Costa County, CA',
  },
  {
    name: "Chardonnay — Stainless Aged",
    slug: 'chardonnay-stainless-aged',
    category: 'white',
    varietal: 'Chardonnay',
    price: 33.00,
    description: "Our stainless steel-aged Chardonnay is a departure from heavily oaked styles, allowing the pure fruit character of our estate grapes to shine. Crisp, clean, and unoaked, with beautiful natural acidity and bright citrus notes.",
    shortDescription: "A crisp, unoaked Chardonnay with vibrant fruit character.",
    tastingNotes: {
      aroma: "Green apple, lemon zest, pear, and white flowers",
      palate: "Light to medium-bodied with bright acidity, crisp fruit, and mineral undertones",
      finish: "Clean, refreshing with a citrus-driven finish"
    },
    foodPairings: ["Oysters", "Grilled fish", "Light pastas", "Fresh salads"],
    collection: 'standard',
    featured: true,
    inStock: true,
    inventory: 36,
    images: [{ url: '/assets/wines/chardonnay.jpg', alt: "Chardonnay Stainless Aged" }],
    region: 'Contra Costa County, CA',
  },
  {
    name: "2020 Lodi Reserve Cabernet Sauvignon",
    slug: '2020-lodi-reserve-cabernet-sauvignon',
    category: 'red',
    varietal: 'Cabernet Sauvignon',
    vintage: 2020,
    price: 44.00,
    description: "Our 2020 Lodi Reserve Cabernet Sauvignon represents the pinnacle of our red wine program. Sourced from carefully selected Lodi vineyards, this wine showcases the bold, structured character that has made Lodi Cabernet famous. Aged in premium oak barrels to develop complexity and depth.",
    shortDescription: "A bold, structured Lodi Reserve Cabernet with depth and complexity.",
    tastingNotes: {
      aroma: "Blackcurrant, dark cherry, cedar, tobacco, and hints of dark chocolate",
      palate: "Full-bodied with firm, polished tannins. Rich dark fruit, coffee, and oak spice",
      finish: "Long, layered finish with persistent tannin structure"
    },
    foodPairings: ["Prime rib", "Grilled steaks", "Braised short ribs", "Strong aged cheeses"],
    collection: 'reserve',
    featured: true,
    inStock: true,
    inventory: 24,
    images: [{ url: '/assets/wines/cabernet-2020.jpg', alt: "2020 Lodi Reserve Cabernet Sauvignon" }],
    region: 'Lodi, CA',
    appellation: 'Lodi AVA',
  },
  {
    name: "2020 Tempranillo",
    slug: '2020-tempranillo',
    category: 'red',
    varietal: 'Tempranillo',
    vintage: 2020,
    price: 45.00,
    description: "Our 2020 Tempranillo celebrates the Spanish heritage of this noble grape, grown beautifully in the warm California Delta climate. Rustic, earthy, and leathery in the classic style Campos Family Vineyards is known for — a true expression of our terroir.",
    shortDescription: "A rustic, earthy Tempranillo with classic Spanish character.",
    tastingNotes: {
      aroma: "Dried cherry, leather, tobacco, earthy notes with hints of vanilla",
      palate: "Medium to full-bodied with firm tannins, cherry, plum, leather, and herbal notes",
      finish: "Savory, long finish with earthy complexity"
    },
    foodPairings: ["Spanish tapas", "Paella", "Roasted lamb", "Manchego cheese"],
    collection: 'standard',
    featured: true,
    inStock: true,
    inventory: 30,
    images: [{ url: '/assets/wines/tempranillo-2020.jpg', alt: "2020 Tempranillo" }],
    region: 'Contra Costa County, CA',
  },
  {
    name: "2021 Lodi Sangiovese",
    slug: '2021-lodi-sangiovese',
    category: 'red',
    varietal: 'Sangiovese',
    vintage: 2021,
    price: 38.00,
    description: "Our 2021 Lodi Sangiovese is a vibrant expression of Italy's most beloved grape variety, thriving beautifully in the California Delta climate. Bright and food-friendly with classic Italian character, this wine is a testament to our winemaker Gerardo Espinosa's skill and vision.",
    shortDescription: "A vibrant, food-friendly Sangiovese with classic Italian character.",
    tastingNotes: {
      aroma: "Sour cherry, dried herbs, tomato leaf, and earthy undertones",
      palate: "Medium-bodied with bright acidity, cherry, plum, and herbal flavors with rustic tannins",
      finish: "Crisp, savory finish with lingering cherry notes"
    },
    foodPairings: ["Italian pastas", "Margherita pizza", "Caprese salad", "Grilled vegetables"],
    collection: 'standard',
    featured: false,
    inStock: true,
    inventory: 42,
    images: [{ url: '/assets/wines/sangiovese-2021.jpg', alt: "2021 Lodi Sangiovese" }],
    region: 'Lodi, CA',
    appellation: 'Lodi AVA',
  },
  {
    name: "20 Year Barrel Aged Balsamic Vinegar",
    slug: '20-year-barrel-aged-balsamic-vinegar',
    category: 'balsamic',
    price: 24.00,
    description: "Aged for 20 years in oak barrels, our Balsamic Vinegar is a culinary treasure. Dense, rich, and complex with natural sweetness and deep umami character. Perfect for drizzling over salads, cheese, grilled meats, and even vanilla ice cream.",
    shortDescription: "20-year barrel aged balsamic vinegar — a culinary treasure.",
    tastingNotes: {
      aroma: "Rich grape must, caramel, fig, and woody oak undertones",
      palate: "Dense and syrupy with beautiful natural sweetness balanced by complex acidity",
      finish: "Long, lingering sweet-savory finish"
    },
    foodPairings: ["Fresh mozzarella", "Strawberries", "Grilled meats", "Panna cotta"],
    collection: 'standard',
    featured: false,
    inStock: true,
    inventory: 50,
    images: [{ url: '/assets/wines/balsamic.jpg', alt: "20 Year Barrel Aged Balsamic Vinegar" }],
    region: 'Contra Costa County, CA',
  },
];

const events = [
  {
    title: 'Wine Club Quarterly Release Party',
    slug: 'wine-club-quarterly-release-party',
    description: 'Join us for an exclusive Wine Club member event celebrating our latest quarterly releases. Enjoy first access to new wines, barrel tastings, and live music in our beautiful vineyard setting. Wine Club members receive complimentary admission; guests may attend for $25.',
    date: new Date('2024-10-19T14:00:00'),
    endDate: new Date('2024-10-19T18:00:00'),
    startTime: '2:00 PM',
    endTime: '6:00 PM',
    category: 'wine-release',
    price: 25,
    memberPrice: 0,
    isFeatured: true,
    isPublic: true,
    requiresTicket: false,
    tags: ['wine-club', 'members', 'quarterly', 'release'],
  },
  {
    title: 'Live Music & Wine at the Vineyard',
    slug: 'live-music-wine-vineyard',
    description: 'Spend a beautiful evening at Campos Family Vineyards with live music, great wine, and the stunning backdrop of our 44-acre estate. Local musicians perform while you sip your favorite Campos wines and enjoy the sunset over the California Delta.',
    date: new Date('2024-11-02T16:00:00'),
    startTime: '4:00 PM',
    endTime: '8:00 PM',
    category: 'concert',
    price: 20,
    memberPrice: 15,
    isFeatured: true,
    isPublic: true,
    requiresTicket: true,
    tags: ['music', 'live', 'concert', 'outdoor'],
  },
  {
    title: 'Holiday Gift Set Release',
    slug: 'holiday-gift-set-release',
    description: 'Just in time for the holiday season! Join us for the release of our exclusive Holiday Gift Sets, featuring curated wine selections, gourmet local products, and beautiful packaging. Wine Club members get first access and special pricing.',
    date: new Date('2024-12-07T11:00:00'),
    startTime: '11:00 AM',
    endTime: '5:00 PM',
    category: 'wine-release',
    price: 0,
    isFeatured: false,
    isPublic: true,
    requiresTicket: false,
    tags: ['holiday', 'gifts', 'seasonal'],
  },
];

const adminUser = {
  firstName: 'Admin',
  lastName: 'Campos',
  email: 'admin@camposfamilyvineyards.com',
  password: 'CamposAdmin2024!',
  role: 'admin',
  ageVerified: true,
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Event.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed admin user
    const admin = await User.create(adminUser);
    console.log(`👤 Admin user created: ${admin.email}`);

    // Seed wines
    const createdWines = await Product.insertMany(wines);
    console.log(`🍷 Seeded ${createdWines.length} wines`);

    // Seed events
    const createdEvents = await Event.insertMany(events);
    console.log(`🎉 Seeded ${createdEvents.length} events`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📋 Admin credentials:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${adminUser.password}`);
    console.log('\n🍷 Wine catalog imported from camposfamilyvineyards.com');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
