import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const AboutPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Our Story | Campos Family Vineyards</title>
        <meta name="description" content="Learn the story behind Campos Family Vineyards — a 44-acre family-owned estate winery in Byron, CA, rooted in tradition and a love of the land." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/about-hero.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        </div>
        <div className="relative z-10 section-container pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-4">Campos Family Vineyards</motion.span>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-0 max-w-3xl">Our Story</motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Family Story */}
      <section className="section-py bg-ivory">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="eyebrow text-gold block mb-4">The Beginning</span>
              <h2 className="heading-section text-charcoal mb-8">A Passion for the Vine</h2>
              <div className="prose prose-lg max-w-none font-sans text-charcoal/70 leading-relaxed space-y-6">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  Nestled in the rolling hills of Byron, California, Campos Family Vineyards is the realization of a lifelong dream. Our journey began with a deep appreciation for the land and a belief that great wine is grown in the vineyard, not made in the winery.
                </p>
                <p>
                  The Campos family has farmed this remarkable 44-acre estate in Contra Costa County for over a generation, drawing on the unique terroir of the Antioch Dunes region to craft wines of exceptional character and depth. The warm days and cool, foggy nights of Byron create ideal conditions for our estate-grown varietals, allowing each grape to develop slowly and fully.
                </p>
                <p>
                  From our carefully tended Cabernet Sauvignon and Zinfandel vines to our award-winning Chardonnay, every varietal we grow reflects the soul of this special place. We farm sustainably, respecting the land that sustains us and the community that surrounds us.
                </p>
                <p>
                  Beyond wine, we also cultivate a thriving olive orchard, producing small-batch extra virgin olive oils and flavored oils that have become beloved by our visitors and Wine Club members alike. The olive trees, like our vines, are tended with the same patient care and deep respect for the seasons that defines everything we do at Campos Family Vineyards.
                </p>
                <p>
                  We invite you to visit, to taste, and to become part of the Campos family story. Whether you join us in the tasting room, become a Wine Club member, or simply enjoy a bottle with your family at home, we are grateful to share this journey with you.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              <div className="aspect-[3/4] bg-champagne overflow-hidden">
                <img src="/assets/images/family-photo.jpg" alt="The Campos family" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="bg-cream p-8">
                <p className="font-script text-gold text-4xl mb-4">The Campos Family</p>
                <div className="space-y-3 text-sm font-sans text-charcoal/70">
                  <div className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>44-acre estate in Byron, California</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>Contra Costa County's Antioch Dunes appellation</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>20+ estate-grown varietals</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>Sustainably farmed wine & olive oil</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>Two generations of family winemaking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vineyard */}
      <section className="section-py bg-charcoal">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'The Estate', body: 'Our 44-acre property spans some of the finest growing ground in Contra Costa County. The Antioch Dunes region offers a uniquely warm climate tempered by cool afternoon breezes off the Sacramento-San Joaquin Delta.' },
              { title: 'The Varietals', body: 'We grow over 20 varietals including Cabernet Sauvignon, Zinfandel, Chardonnay, Petite Sirah, Mourvèdre, Grenache, and more — each expression a different facet of our remarkable terroir.' },
              { title: 'The Olive Orchard', body: 'Alongside our vines, our olive orchard produces exceptional extra virgin olive oils, flavored varieties, and 20-year barrel-aged balsamic vinegar — a delicious complement to any wine experience.' },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="bg-cream/5 border border-cream/10 p-8"
              >
                <h3 className="font-serif text-xl text-cream mb-4">{title}</h3>
                <p className="text-sm font-sans text-cream/60 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-champagne">
        <div className="section-container text-center">
          <h2 className="heading-section text-charcoal mb-6">Come Experience It Yourself</h2>
          <p className="body-elegant max-w-xl mx-auto mb-10">
            Words can only tell part of our story. We invite you to visit the tasting room, walk the vineyard, and taste the difference that passion and place can make in a glass of wine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/visit" className="btn-primary">Plan a Visit</Link>
            <Link to="/wine-club" className="btn-secondary">Join the Wine Club</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
