import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import useCartStore from '../store/cartStore'
import api from '../services/api'
import toast from 'react-hot-toast'
import { mockWines } from '../data/mockWines'

const WineDetailPage = () => {
  const { slug } = useParams()
  const [wine, setWine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`)
        setWine(data.product)
      } catch {
        console.warn('Backend unavailable, falling back to mock data.')
        const fallbackWine = mockWines.find(w => w.slug === slug)
        setWine(fallbackWine || null)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-20">
      <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!wine) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-20 px-6">
      <div className="text-center">
        <p className="font-serif text-2xl text-charcoal/40 mb-4">Wine not found</p>
        <Link to="/wines" className="btn-secondary">Back to Wines</Link>
      </div>
    </div>
  )

  const image = wine.images?.[0]?.url

  const handleAddToCart = () => {
    addItem(wine, qty)
    toast.success(`${wine.name} added to cart!`)
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{wine.name} | Campos Family Vineyards</title>
        <meta name="description" content={wine.description || `${wine.name} — estate wine from Campos Family Vineyards, Byron, CA.`} />
      </Helmet>

      <div className="pt-20 bg-ivory min-h-screen">
        <div className="section-container section-py">
          {/* Breadcrumb */}
          <nav className="mb-12 flex items-center gap-2 eyebrow text-[10px]" aria-label="Breadcrumb">
            <Link to="/wines" className="text-charcoal/50 hover:text-gold transition-colors">Wines</Link>
            <span className="text-charcoal/30">→</span>
            <span className="text-charcoal/60">{wine.category}</span>
            <span className="text-charcoal/30">→</span>
            <span className="text-charcoal">{wine.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="aspect-[3/4] bg-champagne flex items-center justify-center overflow-hidden">
              {image ? (
                <img src={image} alt={wine.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-8xl">🍷</span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
              <p className="eyebrow text-gold mb-4">{wine.category}</p>
              <h1 className="heading-section text-charcoal mb-2">{wine.name}</h1>
              {wine.vintage && <p className="font-sans text-sm text-charcoal/50 mb-6">Vintage {wine.vintage}</p>}

              <div className="gold-divider justify-start gap-4 mt-0 mb-8">
                <div className="h-px bg-gold/40 w-16 flex-none" />
                <span className="text-gold text-sm">◆</span>
              </div>

              {wine.description && <p className="body-elegant mb-8">{wine.description}</p>}

              {/* Tasting Notes */}
              {wine.tastingNotes && (
                <div className="bg-cream p-6 mb-8 space-y-3">
                  <h2 className="eyebrow text-charcoal mb-4">Tasting Notes</h2>
                  {wine.tastingNotes.nose && <div><span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase">Nose</span><p className="font-sans text-sm text-charcoal/70 mt-1">{wine.tastingNotes.nose}</p></div>}
                  {wine.tastingNotes.palate && <div><span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase">Palate</span><p className="font-sans text-sm text-charcoal/70 mt-1">{wine.tastingNotes.palate}</p></div>}
                  {wine.tastingNotes.finish && <div><span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase">Finish</span><p className="font-sans text-sm text-charcoal/70 mt-1">{wine.tastingNotes.finish}</p></div>}
                  {wine.tastingNotes.pairings && <div><span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase">Food Pairings</span><p className="font-sans text-sm text-charcoal/70 mt-1">{wine.tastingNotes.pairings}</p></div>}
                </div>
              )}

              {/* Price & Add to Cart */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-serif text-4xl text-charcoal">${Number(wine.price).toFixed(2)}</span>
                <span className="font-sans text-sm text-charcoal/40">per bottle</span>
              </div>

              {wine.stock > 0 || wine.inStock !== false ? (
                <div className="flex gap-4">
                  <div className="flex items-center border border-champagne">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-charcoal/60 hover:text-gold transition-colors">−</button>
                    <span className="px-4 py-3 font-sans text-sm min-w-[3rem] text-center">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(wine.stock || 10, q + 1))} className="px-4 py-3 text-charcoal/60 hover:text-gold transition-colors">+</button>
                  </div>
                  <button onClick={handleAddToCart} className="btn-primary flex-1">
                    Add to Cart
                  </button>
                </div>
              ) : (
                <p className="font-sans text-sm text-charcoal/50 italic">This wine is currently out of stock. Contact us for availability.</p>
              )}

              {/* Winery Info */}
              <div className="mt-10 pt-10 border-t border-champagne grid grid-cols-2 gap-6">
                {wine.region && <div><span className="eyebrow text-charcoal/40 block mb-1">Region</span><span className="font-sans text-sm text-charcoal">{wine.region}</span></div>}
                {wine.varietal && <div><span className="eyebrow text-charcoal/40 block mb-1">Varietal</span><span className="font-sans text-sm text-charcoal">{wine.varietal}</span></div>}
                {wine.alcohol && <div><span className="eyebrow text-charcoal/40 block mb-1">Alcohol</span><span className="font-sans text-sm text-charcoal">{wine.alcohol}%</span></div>}
                {wine.vintage && <div><span className="eyebrow text-charcoal/40 block mb-1">Vintage</span><span className="font-sans text-sm text-charcoal">{wine.vintage}</span></div>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default WineDetailPage
