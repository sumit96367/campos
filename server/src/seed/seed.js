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
    "name": "Gigi's Blend",
    "slug": "gigis-blend",
    "category": "red",
    "varietal": "Red Blend",
    "price": 45,
    "description": "Wine Notes   \n\n   \n\nFrom the Grandchildren’s cellar, Gigi's Blend is complex, deep, rich and full of sweet aromas.\n\n\"Gigi's Blend was created in honor of our granddaughter, Gianna,\" says Ric and Michelle Campos. \"From the moment she was born, we knew she had a special purpose in life. She's the child our daughter Jamie was told she would never have. Truly, she's God's gift. Not everything comes easily or naturally to Gianna, who has Asperger's.\n\nBeing Gianna comes with tall mountains and rough seas, but strong in spirit, she charges on. Full of excitement, love, and creativity, she charges on. Full of excitement, love, and creativity, she is bright and bold with an entrepreneurial spirit. Gianna's laugh is infectious and her big hugs, unforgettable. She bursts with endless knowledge and wisdom well beyond her age. To our family, 'special needs' really means 'World Changers!!' Gianna, also known as 'Gigi,' has changed our world for the better!\" A portion of the proceeds from the sale of Gigi's Blend will be donated to the The Temple Grandin Equine Center: Colorado State University..\n\n \n\nWine Specs\n\nVarietal: Red\nAppellation: Byron\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.3\nBottle Size: 750ml",
    "shortDescription": "Wine Notes   ",
    "tastingNotes": {
      "aroma": "Dark cherry, blackberry, vanilla bean, and toasted oak",
      "palate": "Full-bodied with ripe tannins, dark fruit compote, cacao, and warm spice",
      "finish": "Long, velvety finish with lingering warmth"
    },
    "foodPairings": [
      "Grilled ribeye",
      "Braised short ribs",
      "Aged gouda",
      "Dark chocolate"
    ],
    "collection": "give-back",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_GigisBlend_EstateRedWine_NoDate.jpg?v=1620247057",
        "alt": "Gigi's Blend"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Summer Blend",
    "slug": "summer-blend",
    "category": "white",
    "varietal": "White Blend",
    "price": 30,
    "description": "Wine Notes\n                  \n                \n\nA light and beautifully refreshing blend of Chardonnay, Chenin Blanc, and Moscato all the summertime favorites! This wine is crisp, and fresh with notes of green apple, peach & tropical fruit. Fermented in stainless steel, this one pairs well with fresh seafood or spicy Thai.  What can be better than floating in your pool or relaxing with friends sipping on our delicious Summer Blend?",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Fresh citrus blossoms, green apple, white peach",
      "palate": "Crisp and refreshing with vibrant orchard fruit and light minerality",
      "finish": "Clean, lively, and thirst-quenching finish"
    },
    "foodPairings": [
      "Chilled seafood",
      "Summer salads",
      "Goat cheese crostini",
      "Grilled fish tacos"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_SummerBlendWhiteWine_NoDate.jpg?v=1583196714",
        "alt": "Summer Blend"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Lilly Rose",
    "slug": "lilly-rose",
    "category": "rosé",
    "varietal": "Mourvèdre Rosé",
    "price": 32,
    "description": "Wine Notes  \n\nFrom the Grandchildren’s cellar,  Lilly Rose is a delicate bouquet of cherry, strawberry peach, from our sassy grape, Mourvedre.  This young grape was harvested early and fermented nicely which brought us our beautiful color.  It’s always a great day to enjoy Lilly Rose’.",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Delicate bouquet of wild cherry, ripe strawberry, and summer peach",
      "palate": "Crisp and sassy with lush red berry flavors and bright Delta acidity",
      "finish": "Refreshing, dry, and elegantly balanced"
    },
    "foodPairings": [
      "Watermelon & feta salad",
      "Charcuterie boards",
      "Grilled shrimp",
      "Prosciutto-wrapped melon"
    ],
    "collection": "estate",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_LillyRose_2017EstateMourvedre1319_NoDate.jpg?v=1751999163",
        "alt": "Lilly Rose"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Chardonnay - Stainless Aged",
    "slug": "chardonnay-stainless-aged",
    "category": "white",
    "varietal": "Chardonnay",
    "price": 33,
    "description": "Wine Notes\n                  \n                \n\nClean, crisp with a bright start and a smooth finish.  One year in stainless. Native fermentation (nothing added such as sulfites) No malo-lactic acid. Subtle hints of yellow apple, pear, pineapple, passion fruit and peach. This wine is a dry, fruity wine best served chilled at about 48 degrees. Pairs well with fish, sushi, spicy foods and a float in the pool!  A soft creamy cheese such as Brie pairs deliciously well with this Chardonnay.",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Crisp green apple, Meyer lemon, and white nectarine",
      "palate": "Clean and bright start with pure unmasked fruit; zero oak and no malolactic fermentation",
      "finish": "Smooth, zesty, and refreshing mineral finish"
    },
    "foodPairings": [
      "Oysters on the half shell",
      "Lemon butter sea bass",
      "Crab cakes",
      "Fresh garden salads"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_Chardonnay_NoDate.jpg?v=1628023017",
        "alt": "Chardonnay - Stainless Aged"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Mourvedre",
    "slug": "2016-mourvedre",
    "category": "red",
    "varietal": "Mourvèdre",
    "price": 36,
    "description": "Are you a Cabernet Sauvignon lover? If so you will love this!  Our Mourvedre wine is delicate with complex flavors, light tannins and undertones of tobacco, leather and cherry.\n\nMourvèdre is a red wine grape variety that is grown in many regions around the world including the Rhône and Provence regions of France. Just remember \"Move Over Dear.\" The Ancient Vines Mourvèdre offers distinct chocolate characteristics and a luscious deep plum flavor.\n\nWine Specs\n\nVarietal: Red\nAppellation: Byron\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.3\nBottle Size: 750ml",
    "shortDescription": "Are you a Cabernet Sauvignon lover? If so you will love this!  Our Mourvedre wine is delicate with complex flavors, light tannins and undertones of tobacco, lea...",
    "tastingNotes": {
      "aroma": "Black currant, plum, undertones of sweet tobacco and subtle earth",
      "palate": "Delicate yet complex, light tannins, rich berry compote and rustic spice",
      "finish": "Silky and lingering with savory depth"
    },
    "foodPairings": [
      "Cabernet lovers favorite: Grilled ribeye",
      "Smoked pork belly",
      "Rosemary lamb chops"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_Mourvedre_NoDate.jpg?v=1764198002",
        "alt": "Mourvedre"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Sparkling Rose",
    "slug": "sparkling-rose",
    "category": "sparkling",
    "varietal": "Sparkling Rosé",
    "price": 38,
    "description": "Wine Notes  \n\nOur Sparkling Rose comes to us all the way from Byron, CA. Our Sparkling Wines are bottled using the traditional Methode Champenoise. This process allows the last stage of fermentation to take place in the bottle. This is the same process used in the Champagne region of France to produce Champagne. This rose has strawberry flavors and hints of cherry making this sparkling wine refreshing, celebratory and enjoyable for any celebration!",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Fresh picked raspberry, wild strawberry, and subtle brioche",
      "palate": "Delicate energetic bubbles, crisp red berry notes, and bright floral accents",
      "finish": "Dry, festive, and elegantly crisp"
    },
    "foodPairings": [
      "Brunch fare",
      "Brie cheese",
      "Smoked salmon tartlets",
      "Celebratory toasts"
    ],
    "collection": "sparkling",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/EstateSparklingRoseWine.jpg?v=1751999133",
        "alt": "Sparkling Rose"
      }
    ],
    "region": "Byron, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Esperanza",
    "slug": "esperanza",
    "category": "red",
    "varietal": "Estate Durif (Petite Sirah)",
    "price": 50,
    "description": "Esperanza, the Spanish word for HOPE is near to our hearts. This wine was birthed at the heart of the COVID pandemic and debuted during our Harvest of Hope Night in October 2020.\n\nThis Petite Sirah , Cabernet Sauvignon, Merlot, Malbec, and Petite Verdot blend is rich in color and in flavor.  \n\nDeep cherry with a blackberry bouquet and hint of tobacco has a great balance of acids and tannins.  Enjoy this with friends and family as we declare a Harvest of Hope.",
    "shortDescription": "Esperanza, the Spanish word for HOPE is near to our hearts. This wine was birthed at the heart of the COVID pandemic and debuted during our Harvest of Hope Nigh...",
    "tastingNotes": {
      "aroma": "Blackberry jam, dark plum, cracked black pepper, and espresso",
      "palate": "Dense, muscular, and opulent with deep layers of blue fruit and chewy tannins",
      "finish": "Profoundly long, structured, and warm"
    },
    "foodPairings": [
      "Slow-cooked osso buco",
      "Pepper-crusted steak",
      "Aged manchego",
      "Wild boar ragu"
    ],
    "collection": "estate",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_2018EstateDurif_EsperanzaSmall.jpg?v=1613160444",
        "alt": "Esperanza"
      }
    ],
    "region": "Byron, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Sparkling Brut",
    "slug": "sparkling-brut",
    "category": "sparkling",
    "varietal": "Sparkling Blend",
    "price": 36,
    "description": "Wine Notes\n                  \n                \n\nOur Sparkling Brut comes to us all the way from Healdsburg, CA. Our Sparkling Wines are bottled using the traditional Methode Champenoise. This process allows the last stage of fermentation to take place in the bottle. This is the same process used in the Champagne region of France to produce Champagne. This Brut has tiny little bubbles which make this light dry sparkling wine perfect for beginning the evening and celebrating!",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Crisp green apple, toasted brioche, and lemon zest",
      "palate": "Fine persistent effervescence, creamy mid-palate, and refreshing citrus acidity",
      "finish": "Clean, elegant, and celebratory"
    },
    "foodPairings": [
      "Fresh oysters",
      "Caviar",
      "Fried chicken & waffles",
      "Soft artisan cheeses"
    ],
    "collection": "sparkling",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_BrutSparklingWine_HighRes.jpg?v=1583194995",
        "alt": "Sparkling Brut"
      },
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_BrutSparklingWine_HighRes_e29f56f7-8c72-47f4-aec1-a5a11be0fcb4.jpg?v=1583194998",
        "alt": "Sparkling Brut"
      }
    ],
    "region": "California (Méthode Champenoise)",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Sauvignon Blanc",
    "slug": "2018-sauvignon-blanc",
    "category": "white",
    "varietal": "Sauvignon Blanc",
    "price": 30,
    "description": "Wine Notes\n                  \n                \n\nThis is a green-skinned grape that originated in the Bordeaux Region of France. High in acid and low in sugar, this is a beautifully bright, crisp, slightly sweet every day wine.  Delicious juicy fruit forward flavors such as honeydew melon, peach, and vanilla. Pairs nicely with goat cheese, green vegetables, oysters and white fish.  Sauvignon Blanc is one of our very favorites all year round! \n\nWine Specs\n\nVintage 2018\nAppellation Lodi\nVineyard Designation Campos Family Vineyards\nAlcohol % 14.3\nBottle Size: 750ml",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Lemongrass, tropical passionfruit, and lime zest",
      "palate": "Bright, high in acid and low in sugar, beautifully crisp and refreshing",
      "finish": "Snappy and vibrant citrus finish"
    },
    "foodPairings": [
      "Herbed goat cheese",
      "Ceviche",
      "Grilled asparagus",
      "Fresh halibut"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_SauvignonBlanc_NoDate.jpg?v=1583196695",
        "alt": "Sauvignon Blanc"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Gabriel Barbera",
    "slug": "2016-gabriel-barbera-wine",
    "category": "red",
    "varietal": "Barbera",
    "price": 40,
    "description": "Wine Notes   \n\nNamed after our grandson Gabriel, this Barbera is a red Italian wine grape variety that, as of 2000, was the third most-planted red grape variety in Italy. It is known for deep color, low tannins and high levels of acid. CFV Barbera has notes of strawberry and sour cherry: flavors synonymous with light-bodied wines. Light tannin and high acidity make it taste juicy with fruit notes of peach, blackberry strawberry raspberry. Dark meats, cheese, sausages, pizza.\n\nFrom the Grandchildren’s cellar, Our Barbera is a rockstar.  This Silky and Sexy wine starts off with a violet, silky bouquet of roses and a long chewy finish. \n\n \n\nWine Specs\n\nVarietal: Red\nAppellation: Byron\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.3\nBottle Size: 750ml",
    "shortDescription": "Wine Notes   ",
    "tastingNotes": {
      "aroma": "Bright red cherry, dried cranberry, and savory Italian herbs",
      "palate": "Named after grandson Gabriel; juicy natural acidity, soft tannins, and dark plum",
      "finish": "Mouthwatering, food-friendly finish"
    },
    "foodPairings": [
      "Wood-fired Margherita pizza",
      "Bolognese pasta",
      "Lasagna",
      "Prosciutto"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_GabrielBlend_EstateBarbera_NoDate.jpg?v=1751999200",
        "alt": "Gabriel Barbera"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Layla Rae Chardonnay - Oak Aged",
    "slug": "layla-rae-chardonnay-oak-aged",
    "category": "white",
    "varietal": "Chardonnay",
    "price": 35,
    "description": "Wine Notes\n                  \n                \n\nFrom the Grandchildren’s cellar, Layla Rae has been in oak for 15 months.  Born with a golden clear color with a silky smooth hint of apricots and guava. Raise your glass while sitting on a beach with your eyes gazed at the glistening water or better yet, your back yard with loved ones!",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Golden apricot, baked pear, vanilla bean, and toasted hazelnut",
      "palate": "15 months in French oak; silky smooth and creamy with rich butterscotch nuances",
      "finish": "Luxurious, round, and warm finish"
    },
    "foodPairings": [
      "Lobster with drawn butter",
      "Roasted chicken with herbs",
      "Butternut squash risotto"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_LaylaRae_2018LodiChardonnay8902.jpg?v=1583195407",
        "alt": "Layla Rae Chardonnay - Oak Aged"
      }
    ],
    "region": "Lodi, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Golden Girl",
    "slug": "golden-girl",
    "category": "white",
    "varietal": "Pinot Gris (Skin Contact / Orange)",
    "price": 33,
    "description": "Wine Notes\n                  \n                \n\nThis 2020 Pinot Gris embodies our warm summers and vibrant sunsets. Her golden glow is derived from allowing the grapes to sit on the skins just a bit longer, then, aged in Oak in traditional French fashion. Sip & Savor bright notes of melon, green apple, tropical fruits, nectarine, honey and you may even pick up a mineral tone with a bright acid to cleanse the palette. Enjoy this new favorite with friends whether they are new or treasured!",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Vibrant summer peach, apricot peel, and wild honey",
      "palate": "Golden glow from skin contact; textured mouthfeel, rich stone fruit, and bright acidity",
      "finish": "Textured, intriguing, and smooth"
    },
    "foodPairings": [
      "Spicy Asian cuisine",
      "Roast pork with apples",
      "Tapas",
      "Aged white cheddar"
    ],
    "collection": "estate",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/GoldenGirls01.jpg?v=1643138139",
        "alt": "Golden Girl"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Judah",
    "slug": "judah",
    "category": "red",
    "varietal": "Cabernet Franc",
    "price": 42,
    "description": "Wine Notes\n                  \n                \n\nMove over, cabernet sauvignon and merlot: it’s time for cabernet franc to shine. Judah is a deep, elegant cabernet franc with an earthiness and fruitiness that give unparalleled complexity. Bell pepper and tobacco are pronounced on the nose. Flavors of toasted butterscotch and raspberry dominate the palate. The wine finishes with a subtle tingle from the acidity. Don’t let the delicate color fool you - Judah is bursting with aroma and flavor. Enjoy slightly chilled on a hot summer afternoon, or let it warm you up on a cold winter day.",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Black raspberry, roasted bell pepper, violets, and cedar",
      "palate": "Deep, elegant Cabernet Franc with savory earthiness and silky medium tannins",
      "finish": "Sophisticated, lingering, and polished"
    },
    "foodPairings": [
      "Duck breast with cherry reduction",
      "Herb-roasted lamb",
      "Mushroom risotto"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Judah01.jpg?v=1643138369",
        "alt": "Judah"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Biggies",
    "slug": "biggies",
    "category": "red",
    "varietal": "Bourbon Barrel Zinfandel",
    "price": 45,
    "description": "Wine Notes\n                  \n                \n\nDeeply aromatic, Biggies Bourbon Barrel aged Zinfandel has a smokey smooth profile with a hint of rye spice. Savor the warm, caramel chewy finish. The Oakey nose takes us back to a time when life was a bit more laid back. Our Biggies Bourbon Barrel Blend has been aged in Bourbon Barrels for several months.",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Smoky vanilla, toasted rye spice, caramel, and dark blackberry",
      "palate": "Deeply aromatic bourbon barrel aged profile, chewy fruit, warm caramel, and subtle rye warmth",
      "finish": "Bold, smoky, and richly decadent finish"
    },
    "foodPairings": [
      "BBQ brisket",
      "Smoked ribs",
      "Bacon-wrapped dates",
      "Bourbon glazed pork chops"
    ],
    "collection": "reserve",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Biggie01.jpg?v=1682952861",
        "alt": "Biggies"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Boujee",
    "slug": "boujee",
    "category": "red",
    "varietal": "Cabernet Franc (Semi-Carbonic)",
    "price": 33,
    "description": "Wine Notes  \n\nCheers to our 2021 Estate Cabernet Franc, an elegant wine carefully made in the semi-carbonic maceration method.\n\nHow did we do it? We started by placing whole clusters of grapes in a closed tank, leaving a bit of oxygen at the top. The oxygen helped yeast to form and ferment the released juices. The by-product of the fermentation was CO2, which forced the grapes that were still in-tact to begin to ferment inside of themselves. They eventually split open, where fermentation off-skin continued.\n\nThis method resulted in a beautiful, feminine, light-bodied wine low in acidity and tannins. It’s lively, refreshing, and fruit-forward without being overly tart. You’ll notice almost candy-like flavors of raspberry, strawberry, banana, and red Twizzlers with a soft finish.\n\nTease your palate with the zip and pop of this fun, flirty, Beaujolais-style wine that we affectionately call “Boujee.” Because the grapes are harvested by hand, and the winemaking process is so meticulous, we make this wine in small production.\n\nAs the name implies, this wine is for those times when you’re feeling extra luxurious - whether that’s hanging out in a bathrobe and putting on a face mask, or hosting a holiday dinner party. You do you.",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Fresh candied pomegranate, wild strawberry, and crushed herbs",
      "palate": "Semi-carbonic maceration yields an ultra-smooth, playful, bouncy red with soft tannins",
      "finish": "Bright, lively, and dangerously drinkable (serve slightly chilled!)"
    },
    "foodPairings": [
      "Charcuterie boards",
      "Bistro burgers",
      "Grilled chicken skewers",
      "Picnic fare"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/products/Campos_2021Boujee_CabernetFrancWeb.jpg?v=1677539661",
        "alt": "Boujee"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "2020 Tempranillo",
    "slug": "tempranillo",
    "category": "red",
    "varietal": "Tempranillo",
    "vintage": 2020,
    "price": 45,
    "description": "Wine Notes  \nIntroducing our Napa Valley Tempranillo, a true Spanish gem with plenty of balance and charisma. Its gorgeous ruby-red hue sets the scene for a sensory journey. Leaping out of the glass are layered flavors of black cherry, juicy plum, and fig, complemented by earthiness and cedar.\n\nWine Specs\n\nVarietal: Red\nAppellation: Napa Valley\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.5\nBottle Size: 750ml",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Ripe black cherry, fig, leather, and vanilla oak",
      "palate": "Gorgeous ruby-red hue, Spanish charisma, balanced acidity, and dusty velvety tannins",
      "finish": "Classic Old-World structure with California richness"
    },
    "foodPairings": [
      "Spanish paella",
      "Chorizo tapas",
      "Grilled flank steak",
      "Manchego cheese"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/Campos_2020Tempranilla.jpg?v=1693585830",
        "alt": "2020 Tempranillo"
      }
    ],
    "region": "Napa / Delta, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "2020 Lodi Reserve Cabernet Sauvignon",
    "slug": "2020-lodi-reserve-cabernet-sauvignon",
    "category": "red",
    "varietal": "Cabernet Sauvignon",
    "vintage": 2020,
    "price": 44,
    "description": "Wine Notes  \nGet ready to be swept o your feet by our Lodi Cabernet Sauvignon, a delicate delight that's anything but shy. This well-balanced wine leads with tobacco on the nose and then unfolds on the palate with flavors of chocolate-covered raspberries - a combination that's as divine as it sounds. Its modest tannins allow for a chewy finish. The magic in this everyday red lies in its ability to be both highly complex and delicate at the same time.\n\nWine Specs\n\nVarietal: Red\nAppellation: Lodi\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.5\nBottle Size: 750ml",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Cassis, black cherry, dark cocoa, and hints of toasted cedar",
      "palate": "Bold and sweeping with dense dark fruit, fine-grained tannins, and seamless structure",
      "finish": "Powerful, refined, and exceptionally long"
    },
    "foodPairings": [
      "Prime rib",
      "New York strip steak",
      "Gorgonzola polenta",
      "Dark chocolate truffles"
    ],
    "collection": "reserve",
    "featured": true,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/Campos_2020CabernetSauvignon.jpg?v=1693586228",
        "alt": "2020 Lodi Reserve Cabernet Sauvignon"
      }
    ],
    "region": "Lodi, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "2021 Lodi Sangiovese",
    "slug": "2021-lodi-sangiovese",
    "category": "red",
    "varietal": "Sangiovese",
    "vintage": 2021,
    "price": 38,
    "description": "Wine Notes  \nMeet our Lodi Sangiovese, a true Italian treasure. We consider Sangiovese the backbone of Italian wines because it’s a grape that adds character and flavor to popular blends like Super-Tuscan and Chianti. Rich in history, this wine invites you to join the ranks of those who have cherished its flavors for generations.\n\nDive in and discover a mosaic of flavors that range from vibrant bell pepper and spicy jalapeño to velvety dark chocolate and smoky herbs. Lodi Sangiovese stands proud in its dryness and structured tannins, and its acidic nature sets it apart from our other varietals. Allow a little oxygen to work its magic, and this wine truly shines.\n\nWine Specs\n\nVarietal: Red\nAppellation: Lodi\nVineyard Designation: Campos Family Vineyards\nAlcohol %: 14.5\nBottle Size: 750ml",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Tart red cherry, dried oregano, tobacco leaf, and orange peel",
      "palate": "Backbone of Italian wines with lively food-friendly acidity and elegant medium body",
      "finish": "Savory, bright, and mouthwatering finish"
    },
    "foodPairings": [
      "Pasta with marinara",
      "Veal parmigiana",
      "Osso buco",
      "Tuscan white bean soup"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/Campos_2021Sangiovese1.jpg?v=1693586494",
        "alt": "2021 Lodi Sangiovese"
      }
    ],
    "region": "Lodi, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Petite Sirah 2021",
    "slug": "petite-sirah-2021",
    "category": "red",
    "varietal": "Petite Sirah",
    "vintage": 2021,
    "price": 50,
    "description": "Wine Notes\n                  \n                \n\n--> NOTE: THIS ITEM IS ONLY AVAILABLE FOR LOCAL PICKUP.\n\n--> Petite Sirah wine comes from the Petite Sirah grape, a dark-skinned beauty that grows in dense clusters on the vine. This grape is small in size but big in flavor. Grown from the smallest lot on our Vineyard, this Petite Sirah has gorgeous color, deep plumy flavors and will leave you wishing you had a second bottle. Enjoy a glass or better yet, a few bottles with friends!\n\n-->",
    "shortDescription": "Wine Notes",
    "tastingNotes": {
      "aroma": "Inky dark blueberry, crushed blackberry, graphite, and black pepper",
      "palate": "Dark-skinned beauty boasting deep purple hue, massive fruit concentration, and chewy tannins",
      "finish": "Incredibly bold, rich, and unforgettable"
    },
    "foodPairings": [
      "Smoked beef ribs",
      "Venison",
      "Blue cheese burgers",
      "Hearty beef stew"
    ],
    "collection": "estate",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/Campos_2021_Petite-Sirah.jpg?v=1699649973",
        "alt": "Petite Sirah 2021"
      }
    ],
    "region": "Contra Costa County, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Estate Dessert Wine",
    "slug": "estate-dessert-wine",
    "category": "red",
    "varietal": "Fortified Red Dessert Wine",
    "price": 30,
    "description": "Wine Notes  \n\nTreat yourself to our new Estate Dessert Wine! This full-bodied, ruby red wine pairs perfectly with any dessert, offering rich flavors of black cherry, ripe plum, and dark mocha. Its moderate sweetness balances well with a variety of treats, from chocolate torte to fine cheeses and creamy desserts. Crafted with care, our Estate Dessert Wine is more than a drink—it's an experience! Perfect for special occasions or everyday celebrations, it’s sure to be a favorite addition to your collection.\n\n \n\n \n\n \n\nESTATE GROWN\nALC. 19.5% by VOL\nLodi, CA",
    "shortDescription": "Wine Notes  ",
    "tastingNotes": {
      "aroma": "Blackberry liqueur, dark chocolate fudge, and candied fig",
      "palate": "Full-bodied ruby red dessert wine with rich, decadent flavors of berries, chocolate, and spice",
      "finish": "Warm, sweet, and luxurious lingering finish"
    },
    "foodPairings": [
      "Flourless chocolate cake",
      "Stilton cheese",
      "Fresh berries",
      "Tiramisu"
    ],
    "collection": "reserve",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/EstateDessertWineCamposFamilyVineyards.jpg?v=1723672572",
        "alt": "Estate Dessert Wine"
      }
    ],
    "region": "Byron, CA",
    "alcoholContent": "14.2%"
  },
  {
    "name": "Valentines Day Special",
    "slug": "special-sparkling-rose",
    "category": "rosé",
    "varietal": "Sparkling Rosé Special",
    "price": 55,
    "description": "Special Only Available until February 28th \nFree Local Delivery!\n\nSparkling Rose\n  Wine Notes  \n\nOur Sparkling Rose comes to us all the way from Byron, CA. Our Sparkling Wines are bottled using the traditional Methode Champenoise. This process allows the last stage of fermentation to take place in the bottle. This is the same process used in the Champagne region of France to produce Champagne. This rose has strawberry flavors and hints of cherry making this sparkling wine refreshing, celebratory and enjoyable for any celebration!\n\nPrimitivo\n  Wine Notes  \n\nThis exquisite red grape originates from Southern Italy and made its journey to California and renamed Zinfandel. Our Estate Primitivo is a plush, rich, silky wine with an elegant texture and a long, balanced finish. Savor the hints of wild berry, floral, spice, and cocoa. Pour a glass, slip into something classy or comfy and enjoy with your favorite friends and family.\n\n \n\n \n\n \n\nESTATE GROWN\nALC. 15.1% by VOL\nBYRON, CA",
    "shortDescription": "Special Only Available until February 28th ",
    "tastingNotes": {
      "aroma": "Fresh wild strawberries, rose petals, and citrus bubbles",
      "palate": "Playful pink effervescence with notes of crisp cranberry, strawberry, and pomegranate",
      "finish": "Clean, joyous, and celebratory"
    },
    "foodPairings": [
      "Chocolate covered strawberries",
      "Brunch spreads",
      "Oysters",
      "Date night dinners"
    ],
    "collection": "sparkling",
    "featured": false,
    "inStock": true,
    "inventory": 50,
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0338/8407/8125/files/Lovers_Duet.png?v=1770858345",
        "alt": "Valentines Day Special"
      }
    ],
    "region": "Byron, CA",
    "alcoholContent": "14.2%"
  }
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
