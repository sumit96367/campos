import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageTransition from '../components/ui/PageTransition'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.15 } } }

const STATS = [
  { value: '44', label: 'Acres of Estate', suffix: '' },
  { value: '20+', label: 'Varietals Grown', suffix: '' },
  { value: '2', label: 'Generations of Family', suffix: '' },
  { value: '100', label: 'Estate Grown', suffix: '%' },
]

const FEATURED_WINES = [
  { name: 'Estate Cabernet Sauvignon', category: 'Red Wine', price: 36, description: 'Rich and bold with notes of dark cherry, cassis, and subtle oak. The flagship of our estate.' },
  { name: 'Estate Zinfandel', category: 'Red Wine', price: 32, description: 'Jammy and spiced with layers of blackberry, pepper, and a smooth, lingering finish.' },
  { name: 'Estate Chardonnay', category: 'White Wine', price: 28, description: 'Crisp and elegant with flavors of green apple, citrus blossom, and a hint of vanilla.' },
]

const HomePage = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <PageTransition>
      <Helmet>
        <title>Campos Family Vineyards | Estate Winery — Byron, CA</title>
        <meta name="description" content="Campos Family Vineyards is a 44-acre estate winery in Byron, CA. Discover award-winning wines, a warm tasting room, and an exclusive Wine Club." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: 'url(/assets/images/hero-vineyard.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="eyebrow text-gold/90 mb-6">
              Est. — Byron, California
            </motion.p>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-6 text-balance">
              Campos Family<br />Vineyards
            </motion.h1>
            <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl text-cream/70 italic mb-10 max-w-2xl mx-auto font-light">
              44 acres of sun-drenched vines, two generations of passion,<br className="hidden md:block" /> one enduring love of the land.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/wines" className="btn-primary">Explore Our Wines</Link>
              <Link to="/visit" className="btn-secondary border-cream/40 text-cream hover:border-gold hover:text-gold">Plan Your Visit</Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
        >
          <span className="eyebrow text-[9px]">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </section>

      {/* ── BRAND TAGLINE ─────────────────────────────────────── */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-serif text-2xl md:text-4xl lg:text-5xl text-cream/90 italic font-light leading-relaxed max-w-4xl mx-auto"
          >
            "Where every bottle tells the story of our family, our land, and the soul of Contra Costa County."
          </motion.p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px bg-gold/30 w-16" />
            <span className="text-gold font-script text-2xl">Campos Family</span>
            <div className="h-px bg-gold/30 w-16" />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="section-py bg-champagne">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map(({ value, label, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl text-charcoal mb-2 font-light tracking-wide">
                  {value}{suffix}
                </div>
                <p className="eyebrow text-gold">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WINES ───────────────────────────────────── */}
      <section className="section-py bg-ivory" aria-labelledby="featured-wines-heading">
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow block mb-4">Our Collection</motion.span>
            <motion.h2
              id="featured-wines-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-section text-charcoal mb-6"
            >
              Featured Wines
            </motion.h2>
            <div className="gold-divider max-w-xs mx-auto"><span className="gold-divider-icon">◆</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_WINES.map((wine, i) => (
              <motion.div
                key={wine.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group bg-cream hover:bg-champagne transition-colors duration-500 p-8 text-center"
              >
                <div className="w-16 h-24 bg-champagne group-hover:bg-cream rounded mx-auto mb-6 flex items-center justify-center transition-colors duration-500">
                  <span className="text-4xl">🍷</span>
                </div>
                <p className="eyebrow text-gold mb-2">{wine.category}</p>
                <h3 className="font-serif text-xl text-charcoal mb-3">{wine.name}</h3>
                <p className="text-sm text-charcoal/60 font-sans leading-relaxed mb-6">{wine.description}</p>
                <p className="font-serif text-2xl text-charcoal mb-6">${wine.price}</p>
                <Link to="/wines" className="btn-secondary text-xs">View Wine</Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/wines" className="btn-primary">View All Wines</Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────── */}
      <section className="section-py bg-cream overflow-hidden" aria-labelledby="story-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="eyebrow block mb-4 text-gold">Our Story</span>
              <h2 id="story-heading" className="heading-section text-charcoal mb-6">A Family Legacy,<br />Rooted in the Land</h2>
              <div className="gold-divider justify-start gap-4 mt-0 mb-8">
                <div className="h-px bg-gold/40 w-16 flex-none" /><span className="text-gold text-sm">◆</span>
              </div>
              <p className="body-elegant mb-6">
                Nestled in the rolling hills of Byron, California, Campos Family Vineyards is more than a winery — it is a living expression of one family's deep love for the land. With 44 acres of estate-grown vines across Contra Costa County's legendary Antioch Dunes appellation, we have been crafting wines that reflect the terroir and the soul of this remarkable place.
              </p>
              <p className="body-elegant mb-10">
                Every varietal we grow, every bottle we produce, carries with it the warmth of a family gathered around the table, sharing stories and savoring the simple pleasures of a beautiful evening in the vineyard.
              </p>
              <Link to="/about" className="btn-secondary">Read Our Full Story</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-champagne overflow-hidden">
                <img
                  src="/assets/images/about-vineyard.jpg"
                  alt="Campos Family Vineyard landscape"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-6 -left-6 bg-charcoal p-6 hidden md:block">
                <p className="font-script text-gold text-3xl">Est. Byron, CA</p>
                <p className="eyebrow text-cream/60 mt-1">Contra Costa County</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WINE CLUB CTA ────────────────────────────────────── */}
      <section className="relative overflow-hidden section-py" aria-labelledby="club-heading">
        <div className="absolute inset-0 bg-wine" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/assets/images/wine-texture.jpg)', backgroundSize: 'cover' }} />
        <div className="relative z-10 section-container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="eyebrow text-gold/80 block mb-4">Exclusive Membership</motion.span>
            <motion.h2 id="club-heading" variants={fadeUp} className="heading-section text-cream mb-6">Join the Wine Club</motion.h2>
            <motion.div variants={fadeUp}><div className="gold-divider max-w-xs mx-auto mb-8"><span className="gold-divider-icon text-gold/60">◆</span></div></motion.div>
            <motion.p variants={fadeUp} className="body-elegant text-cream/70 max-w-2xl mx-auto mb-10">
              Become a member and enjoy complimentary tastings, 20% off all purchases, quarterly shipments of curated wines delivered to your door, and exclusive first-access to new vintage releases.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/wine-club" className="btn-primary">Explore Membership</Link>
              <Link to="/register" className="btn-secondary border-cream/40 text-cream hover:border-gold hover:text-gold">Join Today</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VISIT ─────────────────────────────────────────────── */}
      <section className="section-py bg-charcoal" aria-labelledby="visit-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow text-gold block mb-4">Come See Us</span>
              <h2 id="visit-heading" className="heading-section text-cream mb-6">Visit the Tasting Room</h2>
              <div className="gold-divider justify-start gap-4 mt-0 mb-8">
                <div className="h-px bg-gold/40 w-16 flex-none" /><span className="text-gold text-sm">◆</span>
              </div>
              <p className="body-elegant text-cream/70 mb-10">
                Step into our warm, welcoming tasting room and experience the beauty of the Byron countryside. Enjoy guided wine tastings, explore our olive oil selections, and soak in the panoramic views of our 44-acre estate.
              </p>
              <Link to="/visit" className="btn-primary">Plan Your Visit</Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { day: 'Friday', hours: '1:00 PM – 5:00 PM' },
                { day: 'Saturday', hours: '12:00 PM – 5:00 PM' },
                { day: 'Sunday', hours: '1:00 PM – 5:00 PM' },
                { day: 'Mon – Thu', hours: 'By Appointment' },
              ].map(({ day, hours }) => (
                <div key={day} className="bg-cream/5 border border-cream/10 p-6">
                  <p className="eyebrow text-gold mb-1">{day}</p>
                  <p className="font-serif text-cream text-lg">{hours}</p>
                </div>
              ))}
              <div className="col-span-2 bg-gold/10 border border-gold/20 p-6">
                <p className="eyebrow text-gold mb-1">Location</p>
                <p className="font-serif text-cream text-lg">3501 Byer Rd.</p>
                <p className="font-sans text-cream/60 text-sm mt-1">Byron, CA 94514</p>
                <a href="tel:+19253087963" className="font-sans text-gold text-sm mt-2 block hover:text-gold-light transition-colors">(925) 308-7963</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <section className="py-20 bg-champagne" aria-labelledby="newsletter-heading">
        <div className="section-container max-w-2xl text-center">
          <span className="eyebrow block mb-4">Stay Connected</span>
          <h2 id="newsletter-heading" className="heading-section text-charcoal mb-4">Join Our Mailing List</h2>
          <p className="body-elegant mb-10">
            Be the first to hear about new vintage releases, special events, and exclusive offers for our wine lovers community.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="home-email" className="sr-only">Email address</label>
            <input
              id="home-email"
              type="email"
              placeholder="Your email address"
              className="flex-1 form-input rounded-none"
              required
            />
            <button type="submit" className="btn-primary rounded-none whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </PageTransition>
  )
}

export default HomePage
