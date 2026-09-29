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
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="aspect-[3/4] bg-cream/70 border border-charcoal/5 rounded-lg flex items-center justify-center p-8 overflow-hidden shadow-sm">
              {image ? (
                <img src={image} alt={wine.name} className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="text-8xl">🍷</span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="eyebrow text-gold">{wine.category}</span>
                {wine.varietal && (
                  <>
                    <span className="text-charcoal/30">·</span>
                    <span className="text-xs font-sans text-charcoal/60 uppercase tracking-widest">{wine.varietal}</span>
                  </>
                )}
                {wine.region && (
                  <>
                    <span className="text-charcoal/30">·</span>
                    <span className="text-xs font-sans text-charcoal/50">{wine.region}</span>
                  </>
                )}
              </div>
              <h1 className="heading-section text-charcoal mb-2">{wine.name}</h1>
              {wine.vintage && <p className="font-sans text-sm text-charcoal/50 mb-6">Vintage {wine.vintage}</p>}

              <div className="gold-divider justify-start gap-4 mt-0 mb-8">
                <div className="h-px bg-gold/40 w-16 flex-none" />
                <span className="text-gold text-sm">◆</span>
              </div>

              {wine.description && (
                <div className="prose prose-stone font-sans text-charcoal/75 text-sm md:text-base leading-relaxed mb-8 whitespace-pre-line">
                  {wine.description}
                </div>
              )}

              {/* Tasting Notes */}
              {wine.tastingNotes && (
                <div className="bg-cream rounded-xl border border-charcoal/5 p-6 mb-8 space-y-4">
                  <h2 className="eyebrow text-charcoal tracking-widest mb-2 font-semibold">Tasting Profile</h2>
                  {(wine.tastingNotes.aroma || wine.tastingNotes.nose) && (
                    <div>
                      <span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase font-semibold">Aroma</span>
                      <p className="font-sans text-sm text-charcoal/80 mt-0.5">{wine.tastingNotes.aroma || wine.tastingNotes.nose}</p>
                    </div>
                  )}
                  {wine.tastingNotes.palate && (
                    <div>
                      <span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase font-semibold">Palate</span>
                      <p className="font-sans text-sm text-charcoal/80 mt-0.5">{wine.tastingNotes.palate}</p>
                    </div>
                  )}
                  {wine.tastingNotes.finish && (
                    <div>
                      <span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase font-semibold">Finish</span>
                      <p className="font-sans text-sm text-charcoal/80 mt-0.5">{wine.tastingNotes.finish}</p>
                    </div>
                  )}
                  {(wine.foodPairings || wine.tastingNotes.pairings) && (
                    <div>
                      <span className="font-sans text-xs text-charcoal/50 tracking-wider uppercase font-semibold">Suggested Pairings</span>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {Array.isArray(wine.foodPairings)
                          ? wine.foodPairings.map((p, i) => (
                              <span key={i} className="text-xs bg-ivory px-3 py-1 rounded-full border border-charcoal/10 text-charcoal/70">
                                {p}
                              </span>
                            ))
                          : <p className="font-sans text-sm text-charcoal/80">{wine.tastingNotes.pairings}</p>
                        }
                      </div>
                    </div>
                  )}
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
