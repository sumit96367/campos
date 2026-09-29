import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import { FAQS } from '../data/faqData'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIds, setOpenIds] = useState(['faq-1', 'faq-2'])

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(FAQS.map((f) => f.category))]
    return cats
  }, [])

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCat = activeCategory === 'All' || f.category === activeCategory
      const matchQuery =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [activeCategory, searchQuery])

  const toggleFaq = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Format answers with line breaks and links
  const renderAnswer = (text) => {
    const lines = text.split('\n\n')
    return lines.map((para, i) => {
      // Check for Facebook or link pattern
      let formatted = para
        .replace(
          /https:\/\/www\.facebook\.com\/camposfamilyvineyards\/?\s*(\(https:\/\/www\.facebook\.com\/camposfamilyvineyards\/?\))?/g,
          '<a href="https://www.facebook.com/camposfamilyvineyards" target="_blank" rel="noopener noreferrer" class="text-gold hover:underline font-medium">facebook.com/camposfamilyvineyards</a>'
        )
        .replace(
          /https:\/\/camposfamilyvineyards\.com\/wine-tasting\s*(\(https:\/\/camposfamilyvineyards\.com\/wine-tasting\))?/g,
          '<a href="/visit" class="text-gold hover:underline font-medium">Reserve Tasting</a>'
        )
        .replace(
          /https:\/\/camposfamilyvineyards\.com\/venue\/\s*(\(https:\/\/camposfamilyvineyards\.com\/venue\/\))?/g,
          '<a href="/contact" class="text-gold hover:underline font-medium">Venue Inquiries</a>'
        )
        .replace(
          /https:\/\/camposfamilyvineyards\.com\/events\/\s*(\(https:\/\/camposfamilyvineyards\.com\/events\/\))?/g,
          '<a href="/events" class="text-gold hover:underline font-medium">Upcoming Events</a>'
        )

      return (
        <p
          key={i}
          className="text-sm md:text-base font-sans text-charcoal/80 leading-relaxed mb-3 last:mb-0"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      )
    })
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Frequently Asked Questions | Campos Family Vineyards</title>
        <meta
          name="description"
          content="Find answers to common questions about visiting Campos Family Vineyards, wine tasting hours, reservations, outside food policies, child & dog policies, and private events."
        />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-charcoal text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-3">
              Help Center & Visitor Information
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-6">
              Frequently Asked Questions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-cream/70 font-sans text-base md:text-lg leading-relaxed mb-8">
              Everything you need to know about planning your visit to our 44-acre estate, wine tasting hours, policies, and private gatherings.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeUp} className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search questions (e.g. food, dogs, hours, reservations)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm md:text-base backdrop-blur-md transition-all"
              />
              <svg
                className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream text-xs uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="section-py bg-ivory min-h-[60vh]">
        <div className="section-container max-w-5xl">
          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans text-xs md:text-sm tracking-wide uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-gold shadow-md scale-105'
                    : 'bg-cream text-charcoal/70 hover:text-charcoal hover:bg-champagne'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Info Grid for Key Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="bg-cream rounded-xl p-5 border border-gold/10 shadow-sm flex items-start gap-4">
              <span className="text-2xl">⏰</span>
              <div>
                <h2 className="font-serif text-charcoal text-sm">Tasting Hours</h2>
                <p className="text-xs font-sans text-charcoal/70 mt-1">
                  Fri 1–5pm · Sat 12–5pm<br />Sun 1–5pm (Last call 4:30)
                </p>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-5 border border-gold/10 shadow-sm flex items-start gap-4">
              <span className="text-2xl">🧺</span>
              <div>
                <h2 className="font-serif text-charcoal text-sm">Picnics Welcome</h2>
                <p className="text-xs font-sans text-charcoal/70 mt-1">
                  Outside food allowed.<br /><strong>No outside alcohol.</strong>
                </p>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-5 border border-gold/10 shadow-sm flex items-start gap-4">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <h2 className="font-serif text-charcoal text-sm">Family Friendly</h2>
                <p className="text-xs font-sans text-charcoal/70 mt-1">
                  Kids welcome under arms-reach supervision.
                </p>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-5 border border-gold/10 shadow-sm flex items-start gap-4">
              <span className="text-2xl">🐾</span>
              <div>
                <h2 className="font-serif text-charcoal text-sm">Pet Policy</h2>
                <p className="text-xs font-sans text-charcoal/70 mt-1">
                  No pets permitted.<br />Registered service dogs only.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-cream rounded-2xl border border-cream/20">
              <p className="font-serif text-2xl text-charcoal mb-2">No matching questions found</p>
              <p className="text-sm font-sans text-charcoal/60 mb-6">
                Try searching for a different keyword or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('All')
                }}
                className="btn-primary text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => {
                const isOpen = openIds.includes(faq.id)
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-cream rounded-xl border border-charcoal/5 shadow-sm overflow-hidden transition-all duration-300 hover:border-gold/30"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-sans uppercase tracking-widest text-gold font-semibold">
                          {faq.category}
                        </span>
                        <h2 className="font-serif text-base md:text-lg text-charcoal">
                          {faq.question}
                        </h2>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 text-charcoal transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-gold text-white border-gold' : 'bg-transparent'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-charcoal/5">
                            {renderAnswer(faq.answer)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Need More Assistance / Contact Banner */}
          <div className="mt-16 bg-charcoal text-cream rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="eyebrow text-gold block mb-2">Have another question?</span>
              <h2 className="font-serif text-2xl md:text-3xl text-cream mb-4">
                We're Here to Help
              </h2>
              <p className="text-cream/70 font-sans text-sm md:text-base leading-relaxed mb-8">
                Cannot find the answer you're looking for? Reach out to our hospitality team directly or give us a call during office hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:9253087963"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(925) 308-7963</span>
                </a>
                <Link to="/contact" className="btn-secondary border-cream/30 text-cream hover:bg-cream hover:text-charcoal">
                  Contact Us Form
                </Link>
                <Link to="/visit" className="text-xs uppercase tracking-wider text-gold hover:underline py-2">
                  Plan Your Visit →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default FAQPage
