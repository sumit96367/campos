import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const OIL_CLUBS = [
  {
    id: 'flavor-club',
    name: 'Flavor Club',
    icon: '🫒',
    description: 'One 500ML bottle of savory, locally grown flavor selections, delivered quarterly.',
    details: 'Discover our rotating selection of premium flavored olive oils infused with local herbs, citrus, and spices. Each quarter brings a new, surprising flavor sourced from California growers.',
    highlight: 'Rotating seasonal flavors',
    popular: false,
  },
  {
    id: 'evoo-club',
    name: 'EVOO Club',
    icon: '🌿',
    description: 'One 500ML bottle of locally grown Extra Virgin Olive Oil, delivered quarterly.',
    details: 'Pure, cold-pressed Extra Virgin Olive Oil harvested from California olive groves. Rich in polyphenols and antioxidants, with a fresh, peppery finish characteristic of premium EVOO.',
    highlight: 'Cold-pressed & unfiltered',
    popular: true,
  },
  {
    id: 'flavor-pack',
    name: 'Flavor Pack',
    icon: '🫙',
    description: 'Three 500ML bottles of savory flavored olive oils, delivered quarterly.',
    details: 'Our most generous olive oil club option. Receive three distinct flavored olive oils each quarter — perfect for entertaining, gifting, or building your own gourmet pantry collection.',
    highlight: 'Best value — 3 bottles',
    popular: false,
  },
  {
    id: 'balsamic-club',
    name: 'Balsamic Club',
    icon: '🍶',
    description: 'One 500ML bottle of 20-Year Barrel Aged Balsamic Vinegar, delivered quarterly.',
    details: 'A true culinary treasure — thick, syrupy, and deeply complex. Our 20-year barrel aged balsamic is sourced from small Italian producers and aged in a succession of oak, cherry, and chestnut barrels.',
    highlight: '20-Year barrel aged',
    popular: false,
  },
];

const MEMBER_BENEFITS = [
  { icon: '💰', title: '20% Off All Purchases', desc: 'Members receive 20% off all olive oil and balsamic purchases — online and in the tasting room.' },
  { icon: '📦', title: 'Quarterly Shipments', desc: 'Your selected oils are curated and shipped directly to your door four times a year.' },
  { icon: '🌾', title: 'Locally Sourced', desc: 'All oils are sourced from local California growers, ensuring freshness and supporting regional agriculture.' },
  { icon: '🎁', title: 'Perfect for Gifting', desc: 'Club memberships make exceptional gifts for foodies, home cooks, and gourmet enthusiasts.' },
  { icon: '🧑‍🍳', title: 'Tasting Room Access', desc: 'Try all our oils before you commit — visit our tasting room to sample the full collection.' },
  { icon: '🔄', title: 'Flexible & No Commitment', desc: 'Cancel or pause anytime. No long-term commitments — just great olive oil, delivered seasonally.' },
];

const FLAVORS = [
  'Basil', 'Garlic', 'Rosemary', 'Lemon', 'Truffle', 'Blood Orange',
  'Herbs de Provence', 'Chili', 'Oregano & Sundried Tomato', 'Tuscan Herb',
];

const GALLERY_IMAGES = [
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Tasting-Room-01.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-04.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-05.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-01.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/08/Campos-Family-Vineyards-Events-04.jpg',
  'https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Events-07.jpg',
];

const FAQ = [
  {
    q: 'How does the Olive Oil Club work?',
    a: "Select your preferred club tier and we'll ship your chosen olive oils or balsamic directly to your door every quarter — in spring, summer, fall, and winter. You'll receive an email before each shipment.",
  },
  {
    q: 'Can I pick up my olive oils instead of having them shipped?',
    a: 'Absolutely! Club members can choose to pick up their quarterly allotment at our tasting room during regular hours. Just let us know your preference when signing up.',
  },
  {
    q: 'What flavors are included in the Flavor Club?',
    a: "Our selection rotates each quarter based on seasonal availability and new productions. Past flavors have included basil, garlic, lemon, truffle, blood orange, rosemary, and herbs de Provence. It's always a surprise!",
  },
  {
    q: 'Do I need to be a Wine Club member to join?',
    a: "No! The Olive Oil Club is completely independent. Anyone can join — you don't need to be a Wine Club member, though many of our members enjoy both.",
  },
  {
    q: 'How do I cancel?',
    a: 'You may cancel your membership at any time by contacting us at least 30 days before your next shipment date. There are no cancellation fees.',
  },
  {
    q: 'Does the 20% discount apply to in-person purchases?',
    a: 'Yes! Your 20% member discount applies to all olive oil and balsamic vinegar purchases, both online and in the tasting room.',
  },
];

/**
 * OliveOilClubPage — Dedicated page for the Campos Olive Oil Club membership.
 * Content sourced from camposfamilyvineyards.com/olive-oil-club/
 */
const OliveOilClubPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Olive Oil Club | Campos Family Vineyards</title>
        <meta
          name="description"
          content="Join the Campos Family Vineyards Olive Oil Club. Locally sourced olive oils and balsamic vinegar delivered quarterly. 20% off all purchases for members."
        />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-24 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://camposfamilyvineyards.com/wp-content/uploads/2021/09/Campos-Family-Vineyards-Tasting-Room-04.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-charcoal/75" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>
        <div className="relative z-10 section-container py-24 text-center w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-4">
              Locally Sourced · Quarterly Delivered
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl text-cream mb-4">
              Olive Oil Club
            </motion.h1>
            <motion.div variants={fadeUp}>
              <div className="w-16 h-px bg-gold mx-auto mb-6" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-cream/80 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
              Try our locally sourced olive oils right in our tasting room — then join the club to receive
              premium selections shipped directly to you every quarter.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href="#clubs" className="btn-primary">
                Join the Club
              </a>
              <Link to="/visit" className="btn-secondary border-cream/40 text-cream hover:bg-cream hover:text-charcoal">
                Visit Tasting Room
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Intro Banner */}
      <section className="bg-gold/10 border-y border-gold/20 py-6">
        <div className="section-container">
          <p className="text-center font-serif text-charcoal text-lg italic">
            "All members receive 20% off every olive oil and balsamic vinegar purchase — in-store and online."
          </p>
        </div>
      </section>

      {/* YouTube Video */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-4">See It For Yourself</span>
            <h2 className="heading-section text-charcoal mb-4">The Campos Experience</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="body-elegant max-w-xl mx-auto">
              Get a taste of life at Campos Family Vineyards — from our tasting room to the olive groves.
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
              title="Campos Family Vineyards — Olive Oil Club"
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

      {/* Club Tiers */}
      <section id="clubs" className="section-py bg-ivory" aria-labelledby="clubs-heading">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="eyebrow block mb-4">Choose Your Club</span>
            <h2 id="clubs-heading" className="heading-section text-charcoal mb-4">
              Membership Options
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="body-elegant max-w-2xl mx-auto">
              Every club delivers premium, locally grown oils to your door quarterly. Choose the membership
              that matches your palate and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {OIL_CLUBS.map((club, i) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-500
                  ${club.popular ? 'ring-2 ring-gold' : 'ring-1 ring-charcoal/10'}`}
              >
                {club.popular && (
                  <div className="bg-gold text-white text-xs font-sans font-semibold tracking-widest uppercase text-center py-2">
                    Most Popular
                  </div>
                )}
                <div
                  className={`p-8 h-full flex flex-col ${
                    club.popular ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl" aria-hidden="true">
                      {club.icon}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl">{club.name}</h3>
                      <span className="text-xs font-sans tracking-widest uppercase text-gold">
                        {club.highlight}
                      </span>
                    </div>
                  </div>

                  <div
                    className="w-8 h-px mb-5"
                    style={{
                      backgroundColor: club.popular ? 'rgba(184,150,62,0.4)' : 'rgba(43,38,34,0.15)',
                    }}
                  />

                  <p
                    className={`font-sans text-sm leading-relaxed mb-4 ${
                      club.popular ? 'text-cream/80' : 'text-charcoal/80'
                    }`}
                  >
                    {club.description}
                  </p>
                  <p
                    className={`font-sans text-xs leading-relaxed mb-6 ${
                      club.popular ? 'text-cream/60' : 'text-charcoal/60'
                    }`}
                  >
                    {club.details}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to="/register"
                      className={
                        club.popular
                          ? 'btn-primary w-full justify-center'
                          : 'btn-secondary w-full justify-center'
                      }
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavors Showcase */}
      <section className="section-py bg-charcoal" aria-labelledby="flavors-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="eyebrow text-gold block mb-4">Rotating Selection</span>
            <h2 id="flavors-heading" className="font-serif text-3xl md:text-4xl text-cream mb-4">
              Sample Flavored Oils
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-cream/60 font-sans max-w-xl mx-auto text-sm">
              Our Flavor Club rotates each quarter. Here are some fan favorites from past seasons —
              your next shipment will be a delicious surprise.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {FLAVORS.map((flavor) => (
              <motion.span
                key={flavor}
                variants={fadeUp}
                className="px-5 py-2.5 border border-gold/30 text-cream/80 font-sans text-sm tracking-wider rounded-full hover:border-gold hover:text-gold transition-colors duration-300"
              >
                {flavor}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-ivory" aria-labelledby="benefits-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-4">Member Perks</span>
            <h2 id="benefits-heading" className="heading-section text-charcoal mb-4">
              Why Join the Olive Oil Club?
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MEMBER_BENEFITS.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-cream rounded-xl p-7 hover:shadow-elegant transition-shadow duration-300"
              >
                <div className="text-3xl mb-4" aria-hidden="true">
                  {icon}
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">{title}</h3>
                <p className="text-sm font-sans text-charcoal/65 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-section text-charcoal mb-4">Experience the Tasting Room</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="body-elegant max-w-xl mx-auto">
              Visit us to taste the full olive oil collection before joining. Our knowledgeable staff
              will guide you through each varietal and flavor.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="aspect-square rounded-xl overflow-hidden bg-charcoal shadow"
              >
                <img
                  src={src}
                  alt={`Campos tasting room ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-ivory" aria-labelledby="faq-heading">
        <div className="section-container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-4">Common Questions</span>
            <h2 id="faq-heading" className="heading-section text-charcoal mb-4">
              Olive Oil Club FAQ
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-cream rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-serif text-charcoal hover:text-gold transition-colors">
                  <span>{q}</span>
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 pt-4 text-sm font-sans text-charcoal/70 leading-relaxed border-t border-charcoal/5">
                  {a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full border border-gold" />
        </div>
        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-gold block mb-4">Ready to Join?</span>
            <h2 className="font-serif text-4xl text-cream mb-4">Start Your Olive Oil Journey</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-cream/60 font-sans mb-10 max-w-lg mx-auto">
              Create a free account to sign up for the Olive Oil Club and start enjoying quarterly
              deliveries of premium, locally sourced oils.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary">
                Create Account &amp; Join
              </Link>
              <Link
                to="/contact"
                className="btn-secondary border-cream/30 text-cream hover:bg-cream hover:text-charcoal"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Also see Wine Club */}
      <section className="py-10 bg-champagne border-t border-gold/15">
        <div className="section-container text-center">
          <p className="text-charcoal/70 font-sans text-sm mb-3">Also interested in wines?</p>
          <Link
            to="/wine-club"
            className="inline-flex items-center gap-2 font-serif text-charcoal hover:text-gold transition-colors text-lg group"
          >
            Explore our Wine Club
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default OliveOilClubPage;
