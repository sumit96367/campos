import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import WineCard from '../components/wine/WineCard'
import api from '../services/api'

const CATEGORIES = ['All', 'Red Wine', 'White Wine', 'Rosé', 'Dessert Wine']

const WinesPage = () => {
  const [wines, setWines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

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
        <title>Our Wines | Campos Family Vineyards</title>
        <meta name="description" content="Browse the complete collection of estate-grown wines from Campos Family Vineyards in Byron, CA. Reds, whites, rosé, and more." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 bg-charcoal py-24">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(/assets/images/wines-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">Estate Collection</span>
            <h1 className="heading-hero text-cream mb-4">Our Wines</h1>
            <p className="body-elegant text-cream/60 max-w-xl mx-auto">
              Every bottle a story. Every sip a journey through the heart of Byron, California.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-ivory border-b border-champagne sticky top-20 z-30">
        <div className="section-container py-4 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`eyebrow text-[10px] px-5 py-2 border whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold border-gold text-white'
                  : 'border-champagne text-charcoal/60 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section-py bg-cream">
        <div className="section-container">
          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-center py-24">
              <p className="font-serif text-xl text-charcoal/50 mb-6">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-secondary">Try Again</button>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-charcoal/40 mb-2">No wines found</p>
              <p className="text-sm text-charcoal/40 font-sans mb-6">Try a different category or check back soon.</p>
              <button onClick={() => setActiveCategory('All')} className="btn-secondary">Show All Wines</button>
            </div>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((wine, i) => (
                <motion.div
                  key={wine._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.07, 0.4) }}
                >
                  <WineCard product={wine} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wine Club CTA */}
      <section className="py-20 bg-charcoal">
        <div className="section-container text-center">
          <h2 className="font-serif text-3xl text-cream mb-4">Love What You See?</h2>
          <p className="body-elegant text-cream/60 max-w-xl mx-auto mb-8">
            Join the Wine Club and receive 20% off all purchases, plus quarterly shipments of our finest selections.
          </p>
          <Link to="/wine-club" className="btn-primary">Join the Wine Club</Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default WinesPage
