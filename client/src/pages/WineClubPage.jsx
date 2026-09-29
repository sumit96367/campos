import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const TIERS = [
  {
    id: 'red-2-pack',
    name: 'Red 2-Pack',
    price: 90,
    bottles: 2,
    type: 'Red Wine',
    description: 'Two bottles of our finest red wines, selected by our winemaker each quarter.',
    popular: false,
  },
  {
    id: 'mixed-3-pack',
    name: 'Mixed 3-Pack',
    price: 125,
    bottles: 3,
    type: 'Mixed Selection',
    description: 'Our most popular option — three bottles spanning our full collection, expertly curated.',
    popular: true,
  },
  {
    id: 'reserve',
    name: 'Reserve Club',
    price: 200,
    bottles: 3,
    type: 'Reserve Selection',
    description: 'The pinnacle of the Campos experience — three bottles of our rarest and most acclaimed reserve wines.',
    popular: false,
  },
];

const BENEFITS = [
  { icon: '🍷', title: 'Complimentary Tastings', desc: 'Up to 4 complimentary tastings per month for members and guests.' },
  { icon: '🏷️', title: '20% Off All Purchases', desc: '20% discount on all bottle purchases, every visit, every order.' },
  { icon: '🎟️', title: 'Event Discounts', desc: 'Special pricing on concerts, private events, and festivals.' },
  { icon: '📦', title: 'Quarterly Shipments', desc: 'Curated wines shipped directly to your door every quarter.' },
  { icon: '🗝️', title: 'Members-Only Access', desc: 'Exclusive access to the Barrel Room Lounge and private picnic area.' },
  { icon: '⭐', title: 'First-Pick Releases', desc: 'First access to new vintage releases before the public, with member pricing.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const GALLERY_IMAGES = [
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Wine-Release-01.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Events-07.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-05.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-04.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-06.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Events-08.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-01.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Tasting-Room-01.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-04.jpg",
  "https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-05.jpg"
];

/**
 * WineClubPage — membership tiers, benefits, and signup CTA.
 * Content sourced from camposfamilyvineyards.com.
 */
const WineClubPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Wine Club | Campos Family Vineyards</title>
        <meta name="description" content="Join the Campos Family Vineyards Wine Club. Complimentary tastings, 20% off purchases, quarterly shipments, and exclusive member events." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/wine-club-bg.jpg)' }} />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative z-10 section-container py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-4">Exclusive Membership</motion.span>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-cream mb-4">The Wine Club</motion.h1>
            <motion.div variants={fadeUp}><div className="w-12 h-px bg-gold mx-auto mb-6" /></motion.div>
            <motion.p variants={fadeUp} className="text-cream/70 font-sans max-w-2xl mx-auto text-lg">
              Join our community of wine lovers and receive exclusive benefits, first-access releases, and quarterly shipments of our finest wines.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <section className="section-py bg-ivory" aria-labelledby="benefits-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">Member Perks</span>
            <h2 id="benefits-heading" className="heading-section text-charcoal mb-4">Why Join the Wine Club?</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {BENEFITS.map(({ icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="bg-cream rounded-lg p-8">
                <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
                <h3 className="font-serif text-xl text-charcoal mb-2">{title}</h3>
                <p className="text-sm font-sans text-charcoal/70 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media / Video & Gallery */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="heading-section text-charcoal mb-4">Experience the Club</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
          </div>
          
          {/* YouTube Video */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-w-16 aspect-h-9 w-full shadow-2xl rounded overflow-hidden bg-charcoal relative" style={{ paddingBottom: '56.25%' }}
            >
              <iframe 
                title="Campos Family Vineyards Wine Club" 
                src="https://www.youtube.com/embed/ZLzBvFJGkFs?rel=0" 
                frameBorder="0" 
                allowFullScreen="allowfullscreen" 
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </motion.div>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {GALLERY_IMAGES.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square rounded overflow-hidden shadow bg-charcoal"
              >
                <img 
                  src={src} 
                  alt={`Wine Club Event ${index + 1}`} 
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-py bg-ivory" aria-labelledby="tiers-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">Choose Your Level</span>
            <h2 id="tiers-heading" className="heading-section text-charcoal mb-4">Membership Tiers</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="body-elegant max-w-xl mx-auto">
              Every membership includes all six core benefits. Choose the tier that fits your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-lg overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-500
                  ${tier.popular
                    ? 'bg-charcoal ring-2 ring-gold text-cream'
                    : 'bg-ivory text-charcoal'
                  }`}
              >
                {tier.popular && (
                  <div className="bg-gold text-white text-xs font-sans font-medium tracking-widest uppercase text-center py-2 px-4">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <p className={`eyebrow mb-2 ${tier.popular ? 'text-gold' : ''}`}>{tier.type}</p>
                  <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-serif text-4xl">${tier.price}</span>
                    <span className={`font-sans text-sm ${tier.popular ? 'text-cream/60' : 'text-charcoal/50'}`}>/quarter</span>
                  </div>

                  <div className="w-8 h-px mb-6" style={{ backgroundColor: tier.popular ? 'rgba(184,150,62,0.5)' : 'rgba(43,38,34,0.15)' }} />

                  <p className={`text-sm font-sans leading-relaxed mb-6 ${tier.popular ? 'text-cream/70' : 'text-charcoal/70'}`}>
                    {tier.description}
                  </p>

                  <div className={`flex items-center gap-2 mb-8 text-sm font-sans ${tier.popular ? 'text-cream/60' : 'text-charcoal/60'}`}>
                    <span>{tier.bottles} bottles per quarter</span>
                  </div>

                  <Link
                    to="/register"
                    className={tier.popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                  >
                    Join Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-charcoal/50 font-sans">
              No commitment. Cancel anytime. All members enjoy the same core benefits regardless of tier.
            </p>
          </div>
        </div>
      </section>

      {/* Olive Oil Club */}
      <section className="section-py bg-champagne" aria-labelledby="oil-club-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow block mb-4">Also Available</span>
              <h2 id="oil-club-heading" className="heading-section text-charcoal mb-4">Olive Oil Club</h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="body-elegant mb-6">
                Love great olive oil? Join our quarterly Olive Oil Club and receive premium, locally sourced
                selections delivered directly to you — from classic EVOO to flavored oils and 20-year barrel
                aged balsamic vinegar.
              </p>
              <p className="text-sm font-sans text-charcoal/60 mb-8">
                All members receive <strong>20% off</strong> every olive oil and balsamic purchase, in-store and online.
              </p>
              <Link to="/olive-oil-club" className="btn-primary inline-flex">
                Explore Olive Oil Club →
              </Link>
            </motion.div>

            {/* Club options preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: '🫒', name: 'Flavor Club', desc: '500ML rotating seasonal flavors, quarterly' },
                { icon: '🌿', name: 'EVOO Club', desc: '500ML Extra Virgin Olive Oil, quarterly' },
                { icon: '🫙', name: 'Flavor Pack', desc: 'Three 500ML flavored oils, quarterly' },
                { icon: '🍶', name: 'Balsamic Club', desc: '500ML 20-Year Barrel Aged Balsamic, quarterly' },
              ].map(({ icon, name, desc }) => (
                <div key={name} className="bg-ivory rounded-xl p-5 hover:shadow-elegant transition-shadow duration-300">
                  <span className="text-2xl mb-3 block" aria-hidden="true">{icon}</span>
                  <h3 className="font-serif text-base text-charcoal mb-1">{name}</h3>
                  <p className="text-xs font-sans text-charcoal/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* FAQ / Policies */}
      <section className="section-py bg-ivory" aria-labelledby="faq-heading">
        <div className="section-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-4">Common Questions</span>
            <h2 id="faq-heading" className="heading-section text-charcoal mb-4">Wine Club FAQ</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="space-y-4">
            {[
              { q: 'When are shipments sent?', a: 'Wine Club shipments are sent quarterly, in spring, summer, fall, and winter. We host an exclusive Wine Club Release Party for each quarterly shipment.' },
              { q: 'Can I pick up my wine instead of shipping?', a: 'Yes! Club members can choose to pick up their quarterly allotment at the tasting room during regular hours instead of having it shipped.' },
              { q: 'Can I customize my wine selection?', a: 'Our winemaker curates each shipment with care. Member preferences can be noted, and we do our best to accommodate red, white, or mixed preferences based on your chosen tier.' },
              { q: 'How do I cancel?', a: 'You may cancel your membership at any time by contacting us at least 30 days before your next shipment date. No cancellation fees.' },
              { q: 'Do member benefits apply immediately?', a: 'Yes! Once your membership is active, you immediately enjoy all member benefits including the 20% discount and complimentary tastings.' },
            ].map(({ q, a }, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-cream rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-serif text-charcoal hover:text-gold transition-colors">
                  <span>{q}</span>
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm font-sans text-charcoal/70 leading-relaxed">{a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-charcoal">
        <div className="section-container text-center">
          <h2 className="font-serif text-3xl text-cream mb-4">Ready to Join the Family?</h2>
          <p className="text-cream/60 font-sans mb-8 max-w-lg mx-auto">
            Create an account to begin your Wine Club membership and start enjoying exclusive benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">Join the Wine Club</Link>
            <Link to="/contact" className="btn-secondary border-cream/40 text-cream hover:bg-cream hover:text-charcoal">Ask a Question</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default WineClubPage;
