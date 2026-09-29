import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import WineCard from '../components/wine/WineCard'
import api from '../services/api'
import { FiFilter, FiX } from 'react-icons/fi'

const CATEGORIES = ['All', 'Red Wine', 'White Wine', 'Rosé', 'Dessert Wine']

const WinesPage = () => {
  const [wines, setWines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const { data } = await api.get('/products')
        setWines(data.products || [])
      } catch (err) {
        setError('Could not load wines. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchWines()
  }, [])

  const filtered = activeCategory === 'All'
    ? wines
    : wines.filter(w => w.category === activeCategory)

  return (
    <PageTransition>
      <Helmet>
        <title>Shop Wines | Campos Family Vineyards</title>
        <meta name="description" content="Browse our complete collection of estate-grown wines from Campos Family Vineyards." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-24 pb-16 bg-charcoal border-b border-champagne">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/assets/images/wines-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div className="relative z-10 section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">The Cellar</span>
            <h1 className="heading-hero text-cream mb-6">Shop Wines</h1>
            <p className="body-elegant text-cream/70 max-w-xl mx-auto">
              Every bottle tells the story of our Byron estate. Discover our meticulously crafted collection.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-cream min-h-screen">
        <div className="section-container py-12">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-8 pb-4 border-b border-charcoal/10">
            <span className="font-serif text-lg text-charcoal">{filtered.length} Wines</span>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors"
            >
              <FiFilter />
              <span className="eyebrow text-xs uppercase tracking-widest">Filters</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 relative">
            
            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-64 shrink-0 border-r border-charcoal/10 pr-8">
              <div className="sticky top-32">
                <h3 className="font-serif text-2xl text-charcoal mb-8">Categories</h3>
                <ul className="space-y-4">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left w-full transition-all duration-300 font-sans tracking-wide text-sm ${
                          activeCategory === cat
                            ? 'text-gold font-medium pl-2 border-l-2 border-gold'
                            : 'text-charcoal/60 hover:text-charcoal hover:pl-2'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Mobile Filters Modal */}
            <AnimatePresence>
              {isMobileFiltersOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex lg:hidden"
                >
                  <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream p-8 shadow-2xl overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-12">
                      <h3 className="font-serif text-2xl text-charcoal">Filters</h3>
                      <button onClick={() => setIsMobileFiltersOpen(false)} className="text-charcoal hover:text-gold p-2">
                        <FiX size={24} />
                      </button>
                    </div>
                    
                    <ul className="space-y-6">
                      {CATEGORIES.map((cat) => (
                        <li key={cat}>
                          <button
                            onClick={() => {
                              setActiveCategory(cat);
                              setIsMobileFiltersOpen(false);
                            }}
                            className={`text-left w-full text-lg font-serif transition-colors ${
                              activeCategory === cat ? 'text-gold' : 'text-charcoal/70'
                            }`}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Product Grid */}
            <main className="flex-1">
              {loading && (
                <div className="flex justify-center items-center py-24">
                  <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              {error && (
                <div className="text-center py-24 bg-ivory rounded-lg border border-charcoal/5">
                  <p className="font-serif text-xl text-charcoal/50 mb-6">{error}</p>
                  <button onClick={() => window.location.reload()} className="btn-secondary">Try Again</button>
                </div>
              )}
              
              {!loading && !error && filtered.length === 0 && (
                <div className="text-center py-24 bg-ivory rounded-lg border border-charcoal/5">
                  <p className="font-serif text-2xl text-charcoal/40 mb-2">No wines found</p>
                  <p className="text-sm text-charcoal/40 font-sans mb-6">Try a different category or check back soon.</p>
                  <button onClick={() => setActiveCategory('All')} className="btn-secondary">Show All Wines</button>
                </div>
              )}
              
              {!loading && !error && filtered.length > 0 && (
                <>
                  <div className="hidden lg:flex justify-between items-end mb-8">
                    <p className="font-serif text-xl text-charcoal">{filtered.length} Wines</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                      {filtered.map((wine, i) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          key={wine._id}
                        >
                          <WineCard product={wine} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Wine Club CTA */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 opacity-50" />
        <div className="section-container text-center relative z-10">
          <span className="eyebrow text-gold block mb-4">Campos Family</span>
          <h2 className="font-serif text-4xl text-cream mb-6">Join the Wine Club</h2>
          <p className="body-elegant text-cream/70 max-w-xl mx-auto mb-10">
            Enjoy exclusive access to limited releases, 20% off all purchases, and quarterly shipments of our finest selections directly to your door.
          </p>
          <Link to="/wine-club" className="btn-primary inline-flex items-center gap-2">
            <span>Explore Memberships</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default WinesPage
