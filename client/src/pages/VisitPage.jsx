import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

const VisitPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Visit & Tasting | Campos Family Vineyards</title>
        <meta name="description" content="Visit Campos Family Vineyards in Byron, CA. Open Friday–Sunday for wine tastings. 3501 Byer Rd., Byron, CA 94514. Call (925) 308-7963." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/tasting-room.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />
        </div>
        <div className="relative z-10 section-container pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-gold block mb-4">Come See Us</span>
            <h1 className="heading-hero text-cream">Visit & Tasting</h1>
          </motion.div>
        </div>
      </div>

      {/* Info Cards */}
      <section className="section-py bg-ivory">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: '🕐',
                title: 'Tasting Room Hours',
                content: [
                  { label: 'Friday', value: '1:00 PM – 5:00 PM' },
                  { label: 'Saturday', value: '12:00 PM – 5:00 PM' },
                  { label: 'Sunday', value: '1:00 PM – 5:00 PM' },
                  { label: 'Mon – Thu', value: 'By Appointment' },
                ],
              },
              {
                icon: '📍',
                title: 'Location & Contact',
                content: [
                  { label: 'Address', value: '3501 Byer Rd.' },
                  { label: '', value: 'Byron, CA 94514' },
                  { label: 'Phone', value: '(925) 308-7963' },
                  { label: 'Region', value: 'Contra Costa County' },
                ],
              },
              {
                icon: '🍷',
                title: 'Tasting Experience',
                content: [
                  { label: 'Wine tastings', value: 'Daily' },
                  { label: 'Olive oil tasting', value: 'Available' },
                  { label: 'Picnic area', value: 'Members only' },
                  { label: 'Private events', value: 'By arrangement' },
                ],
              },
            ].map(({ icon, title, content }) => (
              <div key={title} className="bg-cream p-8">
                <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
                <h2 className="font-serif text-xl text-charcoal mb-6">{title}</h2>
                <dl className="space-y-3">
                  {content.map(({ label, value }) => (
                    <div key={value} className="flex justify-between items-baseline gap-4">
                      {label && <dt className="eyebrow text-[10px] text-charcoal/50 whitespace-nowrap">{label}</dt>}
                      <dd className={`font-sans text-sm text-charcoal ${!label ? 'ml-auto' : ''}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Tasting Experiences */}
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">What We Offer</span>
            <h2 className="heading-section text-charcoal mb-4">Tasting Experiences</h2>
            <div className="gold-divider max-w-xs mx-auto"><span className="gold-divider-icon">◆</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Wine Tasting', desc: 'Enjoy a curated flight of our estate wines, guided by knowledgeable staff who will walk you through the story of each vintage, grape variety, and growing season. The perfect introduction to the world of Campos Family wines.', price: 'Included with visit' },
              { title: 'Olive Oil Tasting', desc: 'Explore our collection of locally grown extra virgin olive oils, flavored varieties, and 20-year barrel-aged balsamic vinegar. A wonderful complement to any wine experience and the perfect gift to take home.', price: 'Included with visit' },
              { title: 'Barrel Room Lounge', desc: 'Members of our Wine Club enjoy exclusive access to the Barrel Room Lounge — a private, intimate space for members to relax, taste, and enjoy the full Campos experience away from the crowds.', price: 'Wine Club Members Only' },
              { title: 'Private Events', desc: 'Host your private event in the vineyard! From intimate gatherings to corporate events and wedding receptions, our estate provides a breathtaking backdrop for unforgettable occasions. Contact us to discuss your vision.', price: 'By Arrangement' },
            ].map(({ title, desc, price }) => (
              <div key={title} className="bg-champagne p-8 border-l-2 border-gold">
                <h3 className="font-serif text-xl text-charcoal mb-3">{title}</h3>
                <p className="text-sm font-sans text-charcoal/70 leading-relaxed mb-4">{desc}</p>
                <span className="eyebrow text-gold text-[10px]">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Directions */}
      <section className="section-py bg-charcoal">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow text-gold block mb-4">Getting Here</span>
              <h2 className="heading-section text-cream mb-8">Directions</h2>
              <p className="body-elegant text-cream/70 mb-8">
                Located in the beautiful Byron countryside of Contra Costa County, Campos Family Vineyards is easily accessible from the Bay Area and Central Valley.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <span className="text-gold mt-1">→</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-cream mb-1">From the Bay Area (East Bay)</p>
                    <p className="text-sm text-cream/60 font-sans">Take Hwy 4 east to Byron Hwy south. Turn right onto Byer Rd. The vineyard will be on your right.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-gold mt-1">→</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-cream mb-1">From the Central Valley (Stockton / Tracy)</p>
                    <p className="text-sm text-cream/60 font-sans">Take Byron Hwy north to Byer Rd. Turn left. The vineyard entrance is at 3501 Byer Rd.</p>
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=3501+Byer+Rd+Byron+CA+94514" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open in Google Maps
              </a>
            </div>
            <div className="bg-cream/5 border border-cream/10 aspect-video flex items-center justify-center">
              <div className="text-center">
                <p className="font-serif text-cream/40 text-xl mb-2">3501 Byer Rd.</p>
                <p className="font-sans text-cream/30 text-sm">Byron, CA 94514</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-champagne">
        <div className="section-container text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">Ready to Visit?</h2>
          <p className="body-elegant max-w-xl mx-auto mb-8">We look forward to welcoming you. No reservations required during regular hours. Contact us for group visits or private events.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+19253087963" className="btn-primary">Call (925) 308-7963</a>
            <Link to="/contact" className="btn-secondary">Send a Message</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default VisitPage
