import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import api from '../services/api'

const defaultEvents = [
  {
    _id: '1',
    title: 'Spring Sip & Shop',
    date: '2026-04-18T12:00:00Z',
    description: 'Browse local artisan vendors, find one-of-a-kind treasures, and enjoy delicious Campos wine! Perfect afternoon for finding unique gifts and relaxing on the estate.',
    image: 'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Events-Concerts.jpg',
    price: 0,
  },
  {
    _id: '2',
    title: 'Mother’s Day Rose 5K & Walk',
    date: '2026-05-10T09:00:00Z',
    description: 'Celebrate Mom with a morning 5k walk/run through our picturesque 44-acre vineyards, followed by complimentary wine tasting, local food trucks, and live music.',
    image: 'https://camposfamilyvineyards.com/wp-content/uploads/2024/03/IG-1-MothersDay5k-Alzheimers-2024-03.jpg',
    price: 35,
  },
  {
    _id: '3',
    title: 'Wine Down Friday with Live Music',
    date: '2026-05-22T17:00:00Z',
    description: 'Unwind your week at Campos Family Vineyards. Enjoy award-winning wines, gourmet food trucks, and live acoustic music on our spacious lawn.',
    image: 'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/UpTownFunk-IMG.jpg',
    price: 0,
  }
];

const eventTypes = [
  { title: "Weddings", desc: "Breathtaking vineyard ceremonies and receptions" },
  { title: "Private Parties", desc: "Birthdays, anniversaries, and family reunions" },
  { title: "Corporate Events", desc: "Retreats, meetings, and team building" },
  { title: "Bridal Showers", desc: "Elegant gatherings with wine and charcuterie" },
  { title: "Concerts", desc: "Live music under the stars with food & wine" },
];

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/events')
        if (data.events && data.events.length > 0) {
          setEvents(data.events)
        } else {
          setEvents(defaultEvents)
        }
      } catch {
        setEvents(defaultEvents)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <PageTransition>
      <Helmet>
        <title>Events & Concerts | Campos Family Vineyards</title>
        <meta name="description" content="Join us for Wine Down Fridays, concerts, Spring Sip & Shop, festivals, and private events at Campos Family Vineyards in Byron, CA." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 bg-charcoal py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Venue-Header.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">At the Vineyard</span>
            <h1 className="heading-hero text-cream mb-4">Events & Gathering</h1>
            <p className="body-elegant text-cream/70 max-w-2xl mx-auto">
              From Wine Down Fridays to concert events, Campos Family Vineyards is the place to be! Come visit us to enjoy live music, delicious food from local vendors, and award-winning wines.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Video Feature Section */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow text-gold block mb-2">Experience Campos</span>
            <h2 className="heading-section text-charcoal mb-4">Family-Friendly Atmosphere</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
            <p className="text-charcoal/70 font-sans leading-relaxed">
              From Wine Down Fridays to concert events, Campos Family Vineyards is the place to be! Come visit us to enjoy live music, delicious food from various vendors, and of course, Campos Family Vineyards wine.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-charcoal aspect-video relative"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe 
              title="Campos Family Vineyards - Family-Friendly Atmosphere" 
              src="https://www.youtube.com/embed/_awDwz5weQg?rel=0"
              frameBorder="0" 
              allowFullScreen="allowfullscreen" 
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Consider Us For Section */}
      <section className="section-py bg-ivory border-t border-gold/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow text-gold block mb-2">Host With Us</span>
            <h2 className="heading-section text-charcoal mb-4">Consider Us For Your Next Event</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
            <p className="text-charcoal/70 font-sans italic text-lg">
              "We'll bring the wine, you bring the good vibes!"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {eventTypes.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-cream p-8 text-center rounded-lg shadow-md border border-gold/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-gold text-xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm font-sans text-charcoal/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="section-py bg-cream border-t border-gold/10">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="eyebrow text-gold block mb-2">Calendar</span>
              <h2 className="heading-section text-charcoal">Upcoming Events</h2>
            </div>
            <Link to="/gallery" className="btn-secondary mt-4 md:mt-0 inline-flex items-center gap-2">
              <span>View Past Event Photo Gallery</span>
              <span>→</span>
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, i) => (
                <motion.article
                  key={event._id || event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gold/10"
                >
                  <div className="aspect-video bg-charcoal overflow-hidden relative">
                    {event.image ? (
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🍷</div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="eyebrow text-gold mb-2 font-semibold">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="font-serif text-2xl text-charcoal mb-3">{event.title}</h3>
                    <p className="text-sm text-charcoal/70 font-sans leading-relaxed mb-6 flex-grow">{event.description}</p>
                    
                    <div className="pt-4 border-t border-cream flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-charcoal">
                        {event.price > 0 ? `$${event.price}` : 'Free Admission'}
                      </span>
                      {event.ticketUrl ? (
                        <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-xs">
                          Get Tickets
                        </a>
                      ) : (
                        <Link to="/contact" className="btn-secondary py-2 px-4 text-xs">RSVP</Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Private Events Banner */}
      <section className="section-py bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(/assets/images/events-bg.jpg)', backgroundSize: 'cover' }} />
        <div className="section-container relative z-10 text-center">
          <span className="eyebrow text-gold block mb-4">Host Your Occasion</span>
          <h2 className="heading-section text-cream mb-6">Plan a Special Gathering at Campos</h2>
          <p className="body-elegant text-cream/70 max-w-2xl mx-auto mb-10">
            Looking to host a wedding, corporate retreat, or private celebration at our vineyard? Our estate provides an unmatched setting for unforgettable memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vendor-interest" className="btn-primary">Vendor Interest Application</Link>
            <Link to="/contact" className="btn-secondary">Inquire About Venue Booking</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default EventsPage
