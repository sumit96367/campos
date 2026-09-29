import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const VINEYARD_IMAGES = [
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Tasting-Room-01.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-04.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-05.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-01.jpg',
]

const PILLARS = [
  {
    icon: '🍷',
    title: 'Exceptional Wines',
    body: 'Our mission is to yield exceptional wines that reflect the true character of our 44-acre Byron estate — wines that speak of the land, the season, and the family that tends them.',
  },
  {
    icon: '🌱',
    title: 'Good Stewards',
    body: 'We are committed to being good stewards of our property, farming sustainably and respecting the land that has sustained us for two generations. The health of the vineyard is our highest priority.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Community & Family',
    body: 'We believe in providing a peaceful, relaxing environment that brings families and the community together. Campos Family Vineyards is not just a winery — it is a gathering place.',
  },
]

const ESTATE_FACTS = [
  { number: '44', label: 'Acre Estate', detail: 'Byron, California' },
  { number: '20+', label: 'Varietals Grown', detail: 'Estate-grown grapes' },
  { number: '2', label: 'Generations', detail: 'Family winemaking' },
  { number: '4×', label: 'Quarterly', detail: 'Wine & Olive Oil Club' },
]

const TIMELINE = [
  { year: '2003', event: 'The Campos family purchases the 44-acre estate in Byron, California.' },
  { year: '2010', event: 'First estate-grown vintage released. The tasting room opens its doors to the public.' },
  { year: '2014', event: 'Olive orchard planted alongside the vines. Olive oil production begins.' },
  { year: '2017', event: 'Wine Club launches, quickly becoming one of the most beloved in Contra Costa County.' },
  { year: '2020', event: 'Olive Oil Club introduced. Members now enjoy both wine and olive oil quarterly.' },
  { year: 'Today', event: 'Campos Family Vineyards continues to grow — in the vineyard, in the community, and in the hearts of all who visit.' },
]

const ABOUT_EXPLORE_LINKS = [
  {
    title: 'The Campos Journal',
    desc: 'Read vineyard updates, harvest news, event recaps, and pairing guides.',
    to: '/blog',
    label: 'Explore Blog',
    icon: '📰',
  },
  {
    title: 'Frequently Asked Questions',
    desc: 'Hours, reservations, outside food policies, child & dog rules, and venue details.',
    to: '/faq',
    label: 'View FAQs',
    icon: '❓',
  },
  {
    title: 'Donation Requests',
    desc: 'Learn about our philanthropic guidelines for registered 501(c)(3) organizations.',
    to: '/donation',
    label: 'Request Donation',
    icon: '🤝',
  },
  {
    title: 'Amy G Give Back Series',
    desc: 'Wines crafted to give back, funding ALS research, autism programs, and local charities.',
    to: '/amy-g',
    label: 'Discover Amy G',
    icon: '❤️',
  },
]

/**
 * AboutPage — Our Story / About Us for Campos Family Vineyards.
 * Source: camposfamilyvineyards.com/about-us/
 */
const AboutPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About Us & Our Story | Campos Family Vineyards</title>
        <meta
          name="description"
          content="Our mission is to yield exceptional wines and be good stewards of the property while providing a peaceful, relaxing environment that brings families and the community together."
        />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-01.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/20" />
        </div>
        <div className="relative z-10 section-container pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-4">
              Campos Family Vineyards · Byron, California
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-6 max-w-3xl">
              About Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-cream/70 font-sans text-lg max-w-2xl leading-relaxed">
              Our mission is to yield exceptional wines and be good stewards of the property while
              providing a peaceful, relaxing environment that brings families and the community together.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mission Pillars */}
      <section className="section-py bg-charcoal" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow text-gold block mb-4">Our Mission</span>
            <h2 id="mission-heading" className="font-serif text-3xl md:text-4xl text-cream mb-4">
              Family First. Land Always.
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {PILLARS.map(({ icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-cream/5 border border-cream/10 rounded-xl p-8 hover:border-gold/30 transition-colors duration-500"
              >
                <div className="text-4xl mb-5" aria-hidden="true">{icon}</div>
                <h3 className="font-serif text-xl text-cream mb-4">{title}</h3>
                <p className="text-sm font-sans text-cream/60 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Family Story & Ric and Michelle */}
      <section className="section-py bg-ivory" aria-labelledby="story-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Text */}
            <div className="lg:col-span-7">
              <span className="eyebrow text-gold block mb-4">The Beginning</span>
              <h2 id="story-heading" className="heading-section text-charcoal mb-8">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none font-sans text-charcoal/80 leading-relaxed space-y-6">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  Campos Family Vineyards creates exceptional wines that capture the best characteristics of Contra Costa County. Our winery’s idyllic location by the California Delta allows us to produce rustic, earthy, and leathery styles of red wine. We prioritize quality and attention to detail – and our wines reflect that.
                </p>
                <p>
                  Like a family, a vineyard is at its best when firmly rooted, well-tended, and blended with love. With all of the charm of Napa tucked away close to home, Campos Family Vineyards is a hidden gem. Enjoy the splendor of our unique destination with 44 acres of striking landscape and glorious sunsets.
                </p>
                <p>
                  We believe in the power of wine to bring families and communities together to create lifelong memories. We’re honored to be part of your story.
                </p>
                <p>
                  Enjoy our two beautiful indoor event spaces, wine tasting room, wedding garden, bocce ball court, and baseball field. We offer space to host weddings, concerts, corporate events, private parties, family movie nights, and much more.
                </p>
                <p>
                  To learn more about special events and gatherings, arrange a tour, purchase wine, or reserve the facilities, feel free to contact us anytime.
                </p>
              </div>

              {/* Accreditations & Badges */}
              <div className="mt-10 pt-8 border-t border-charcoal/10">
                <p className="font-serif text-sm text-charcoal mb-4">
                  Campos Family Vineyards is a proud member of:
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="bg-cream px-4 py-2 rounded-lg border border-gold/20 text-xs font-sans text-charcoal font-semibold tracking-wider">
                    🍇 Contra Costa Winegrower's Association
                  </div>
                  <div className="bg-cream px-4 py-2 rounded-lg border border-gold/20 text-xs font-sans text-charcoal font-semibold tracking-wider">
                    🌾 Harvest Time
                  </div>
                  <div className="bg-cream px-4 py-2 rounded-lg border border-gold/20 text-xs font-sans text-charcoal font-semibold tracking-wider">
                    🌿 Lodi Rules Certified Green
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with Ric and Michelle photo */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-xl shadow-lg border border-gold/15 bg-charcoal">
                <img
                  src="https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Viineyards-Ric-and-Michelle-e1690257076835.jpg"
                  alt="Ric and Michelle Campos — Founders of Campos Family Vineyards"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="p-5 bg-charcoal text-cream">
                  <p className="font-serif text-lg text-gold">Ric &amp; Michelle Campos</p>
                  <p className="text-xs font-sans text-cream/70 uppercase tracking-widest mt-0.5">
                    Proprietors &amp; Founders
                  </p>
                </div>
              </div>

              <div className="bg-cream rounded-xl p-8 border border-charcoal/5">
                <p className="font-script text-gold text-4xl mb-5">The Campos Family</p>
                <div className="space-y-3 text-sm font-sans text-charcoal/70">
                  {[
                    '44-acre estate in Byron, California',
                    'Contra Costa County\'s Antioch Dunes appellation',
                    '20+ estate-grown varietals',
                    'Sustainably farmed wine & olive oil',
                    'Two generations of family winemaking',
                    'Wine Club & Olive Oil Club — quarterly',
                  ].map((fact) => (
                    <div key={fact} className="flex gap-3 items-start">
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Winemaker: Gerardo Espinosa */}
      <section id="winemaker" className="section-py bg-cream" aria-labelledby="winemaker-heading">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-ivory rounded-2xl p-8 md:p-14 border border-gold/20 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-charcoal">
                  <img
                    src="https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Tasting-Room-01.jpg"
                    alt="Winemaker crafting fine wine at Campos Family Vineyards"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <span className="eyebrow text-gold block mb-2">Artistry in Every Bottle</span>
                <h2 id="winemaker-heading" className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                  Meet Our Winemaker: Gerardo Espinosa
                </h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <div className="space-y-4 text-sm font-sans text-charcoal/75 leading-relaxed">
                  <p>
                    Gerardo grew up learning how to make wine in his family’s vineyard. In 2008, he launched his own brand, Viñedos Aurora, which has since been rebranded to Anaya Vineyards.
                  </p>
                  <p>
                    In 2015, he and business partner Mark Nureddine opened Lodi Crush, a custom crush facility. Since then, Gerardo has devoted his full-time attention, imagination, creativity, and talent to the art of winemaking. In April 2020, he moved Lodi Crush into a larger facility in downtown Lodi, where he helps craft award-winning wines for Campos Family Vineyards.
                  </p>
                  <p>
                    Gerardo was introduced to Ric and Michelle Campos when they purchased the property, as he had been working with the previous owner. Together, they determined that their goal for the winery would be to maintain the quality and intimacy of the wines. He does this by maintaining the quality of the farming and ensuring there’s little intervention in the winemaking process.
                  </p>
                  <p className="font-medium text-charcoal">
                    His favorite part about Campos Family Vineyards wine is that it’s wine you can feel good about drinking. Most wines have an interesting story behind them, or donate to a special cause as part of the Give Back Series.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/wines" className="btn-primary text-xs">
                    Explore Gerardo's Wines
                  </Link>
                  <Link to="/amy-g" className="btn-secondary text-xs">
                    Give Back Series
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estate by the Numbers */}
      <section className="section-py bg-champagne" aria-labelledby="numbers-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">The Estate</span>
            <h2 id="numbers-heading" className="heading-section text-charcoal mb-4">
              By the Numbers
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {ESTATE_FACTS.map(({ number, label, detail }) => (
              <motion.div key={label} variants={fadeUp} className="text-center">
                <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">{number}</div>
                <div className="font-sans text-xs tracking-widest uppercase text-gold mb-1">{label}</div>
                <div className="text-xs font-sans text-charcoal/50">{detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore More from About Us */}
      <section className="section-py bg-ivory" aria-labelledby="explore-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">Explore More</span>
            <h2 id="explore-heading" className="heading-section text-charcoal mb-4">
              Discover Our Community
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_EXPLORE_LINKS.map(({ title, desc, to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="bg-cream rounded-xl p-6 border border-charcoal/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-3xl mb-4 block" aria-hidden="true">{icon}</span>
                  <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs font-sans text-charcoal/70 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>
                <div className="text-xs font-sans uppercase tracking-wider text-gold flex items-center gap-1.5 font-semibold">
                  <span>{label}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-4">The Property</span>
            <h2 className="heading-section text-charcoal mb-4">Life at Campos</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VINEYARD_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`overflow-hidden rounded-xl bg-charcoal ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
                }`}
              >
                <img
                  src={src}
                  alt={`Campos Family Vineyards ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History Timeline */}
      <section className="section-py bg-charcoal" aria-labelledby="timeline-heading">
        <div className="section-container max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow text-gold block mb-4">Our Journey</span>
            <h2 id="timeline-heading" className="font-serif text-3xl md:text-4xl text-cream mb-4">
              A Story of Growth
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-gold/20 hidden sm:block" />

            <div className="space-y-8">
              {TIMELINE.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex gap-6 sm:gap-10 items-start"
                >
                  <div className="flex-shrink-0 w-20 text-right relative">
                    <span className="font-serif text-gold text-lg">{year}</span>
                    {/* Dot on line */}
                    <span className="hidden sm:block absolute right-[-1.85rem] top-2 w-3 h-3 rounded-full border-2 border-gold bg-charcoal" />
                  </div>
                  <div className="flex-1 bg-cream/5 border border-cream/10 rounded-lg p-5">
                    <p className="text-sm font-sans text-cream/70 leading-relaxed">{event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Vineyard — Key Areas */}
      <section className="section-py bg-ivory" aria-labelledby="vineyard-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">What We Grow</span>
            <h2 id="vineyard-heading" className="heading-section text-charcoal mb-4">
              The Estate in Detail
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'The Estate',
                icon: '🏡',
                body: 'Our 44-acre property spans some of the finest growing ground in Contra Costa County. The Antioch Dunes region offers a uniquely warm climate tempered by cool afternoon breezes off the Sacramento-San Joaquin Delta.',
              },
              {
                title: 'The Varietals',
                icon: '🍇',
                body: 'We grow over 20 varietals including Cabernet Sauvignon, Zinfandel, Chardonnay, Petite Sirah, Mourvèdre, Grenache, and more — each expression a different facet of our remarkable terroir.',
              },
              {
                title: 'The Olive Orchard',
                icon: '🫒',
                body: 'Alongside our vines, our olive orchard produces exceptional extra virgin olive oils, flavored varieties, and 20-year barrel-aged balsamic vinegar — a delicious complement to any wine experience.',
              },
            ].map(({ title, icon, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-cream rounded-xl p-8 hover:shadow-elegant transition-shadow duration-300"
              >
                <div className="text-3xl mb-5" aria-hidden="true">{icon}</div>
                <h3 className="font-serif text-xl text-charcoal mb-4">{title}</h3>
                <p className="text-sm font-sans text-charcoal/65 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* YouTube Video */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-4">See the Vineyard</span>
            <h2 className="heading-section text-charcoal mb-4">Experience Campos</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="body-elegant max-w-xl mx-auto">
              Take a virtual tour of the estate — the vines, the tasting room, the olive orchard, and the
              family that makes it all possible.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-charcoal relative"
            style={{ paddingBottom: '56.25%', height: 0 }}
          >
            <iframe
              title="Campos Family Vineyards — Our Story"
              src="https://www.youtube.com/embed/ZLzBvFJGkFs?rel=0&modestbranding=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full border border-gold" />
        </div>
        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-gold block mb-4">Come Visit</span>
            <h2 className="font-serif text-4xl text-cream mb-4">Experience It Yourself</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-cream/60 font-sans mb-10 max-w-xl mx-auto leading-relaxed">
              Words can only tell part of our story. We invite you to visit the tasting room, walk the
              vineyard, and taste the difference that passion and place can make in a glass of wine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/visit" className="btn-primary">Plan a Visit</Link>
              <Link to="/wine-club" className="btn-secondary border-cream/30 text-cream hover:bg-cream hover:text-charcoal">
                Join the Wine Club
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
