import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const galleryItems = [
  {
    id: 1,
    title: "Mother's Day Rose 5k 2024",
    category: "Events",
    photographer: "Discovery Bay Studios",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2024/03/IG-1-MothersDay5k-Alzheimers-2024-03.jpg",
  },
  {
    id: 2,
    title: "Christmas Tree Lighting Dec 2023",
    category: "Holidays",
    photographer: "Campos Family Vineyards",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2023/11/Christmas-at-Campos-Family-Vineyards.png",
  },
  {
    id: 3,
    title: "Mother's Day Rose 5K 2022",
    category: "Events",
    photographer: "Luy Photography",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2022/05/IG-rose-5k-2022-02.png",
  },
  {
    id: 4,
    title: "Tree Lighting 2021",
    category: "Holidays",
    photographer: "Discovery Bay Studio",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2022/01/FB-ChristmasTreeLighting-2021-01-02.png",
  },
  {
    id: 5,
    title: "Wine Tour & Tasting",
    category: "Winery",
    photographer: "Discovery Bay Studio",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Wine-with-Ric-and-Vic.jpg",
  },
  {
    id: 6,
    title: "Uptown Funk - Bruno Mars Tribute Concert",
    category: "Concerts",
    photographer: "Discovery Bay Studio",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/UpTownFunk-IMG.jpg",
  },
  {
    id: 7,
    title: "80s Night - The Breakfast Klub",
    category: "Concerts",
    photographer: "Discovery Bay Studio",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/IG-80s-night-july-2021-digital-03.jpg",
  },
  {
    id: 8,
    title: "Best of Motown Night",
    category: "Concerts",
    photographer: "Discovery Bay Studios",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Motown-Square-1000x.jpg",
  },
  {
    id: 9,
    title: "Wine Release Celebration",
    category: "Wine Club",
    photographer: "Discovery Bay Studios",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/IG-Wine-Club-Release-1-20-04-1000x.jpg",
  },
  {
    id: 10,
    title: "Farewell Mondo Concert",
    category: "Concerts",
    photographer: "Ron Essex Photography",
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Farwell-to-Mondo-1000x.jpg",
  },
];

const categories = ["All", "Events", "Concerts", "Holidays", "Winery", "Wine Club"];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalImage, setActiveModalImage] = useState(null);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <PageTransition>
      <Helmet>
        <title>Photo Gallery | Campos Family Vineyards</title>
        <meta name="description" content="Explore our photo gallery featuring concerts, weddings, tree lightings, Wine Down Fridays, and vineyard events at Campos Family Vineyards." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 bg-charcoal py-24 text-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Venue-Header.jpg)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">Capturing Memories</span>
            <h1 className="heading-hero text-cream mb-4">Photo Gallery</h1>
            <p className="body-elegant text-cream/70 max-w-xl mx-auto">
              A look back at moments of celebration, music, family, and fine wine at Campos Family Vineyards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter & Gallery Grid */}
      <section className="section-py bg-cream">
        <div className="section-container">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gold text-charcoal shadow-md font-semibold'
                    : 'bg-white text-charcoal/70 hover:bg-gold/20 border border-charcoal/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveModalImage(item)}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-500 border border-gold/10"
                >
                  <div className="aspect-square overflow-hidden bg-charcoal relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-xs uppercase tracking-widest text-gold font-sans font-bold mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl text-cream mb-1">{item.title}</h3>
                      <p className="text-xs text-cream/60 font-sans italic">{item.photographer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div 
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-charcoal rounded-xl overflow-hidden shadow-2xl border border-gold/30"
          >
            <button 
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-xl hover:bg-gold transition-colors"
            >
              ✕
            </button>
            <img 
              src={activeModalImage.image} 
              alt={activeModalImage.title} 
              className="w-full max-h-[75vh] object-contain bg-black" 
            />
            <div className="p-6 bg-charcoal text-cream flex flex-col sm:flex-row sm:items-center justify-between border-t border-cream/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold block mb-1 font-sans">{activeModalImage.category}</span>
                <h3 className="font-serif text-2xl text-cream">{activeModalImage.title}</h3>
              </div>
              <p className="text-sm font-sans text-cream/50 italic mt-2 sm:mt-0">Photo: {activeModalImage.photographer}</p>
            </div>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};

export default GalleryPage;
