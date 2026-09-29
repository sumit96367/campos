import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const footerLinks = {
  'Explore': [
    { label: 'Our Wines', to: '/wines' },
    { label: 'Wine Club', to: '/wine-club' },
    { label: 'Visit & Tasting', to: '/visit' },
    { label: 'Events', to: '/events' },
    { label: 'Our Story', to: '/about' },
    { label: 'Wine Down with Amy G', to: '/amy-g' },
    { label: 'Vendor Interest', to: '/vendor-interest' },
  ],
  'Policies': [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Shipping & Returns', to: '/shipping-returns' },
    { label: 'Responsible Drinking', to: '/terms#responsible-drinking' },
  ],
  'Visit Us': [
    { label: '3501 Byer Rd.', to: null },
    { label: 'Byron, CA 94514', to: null },
    { label: '(925) 308-7963', to: 'tel:+19253087963' },
    { label: 'Fri: 1:00 PM – 5:00 PM', to: null },
    { label: 'Sat: 12:00 PM – 5:00 PM', to: null },
    { label: 'Sun: 1:00 PM – 5:00 PM', to: null },
  ],
};

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/camposfamilyvineyards',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/camposfamilyvineyards',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

/**
 * Footer — full-width dark footer with newsletter, links, social, and legal.
 */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email, source: 'footer' });
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-charcoal text-cream" role="contentinfo">
      {/* Top section */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6" aria-label="Campos Family Vineyards">
              <div className="flex flex-col gap-0.5">
                <span className="font-serif text-xl font-semibold tracking-widest-lg uppercase text-cream">Campos Family</span>
                <span className="font-sans text-xs tracking-widest-xl uppercase text-gold">Vineyards</span>
              </div>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed font-sans mb-6 max-w-sm">
              A beautiful 44-acre vineyard and tasting room in Byron, CA. Creating exceptional wines that capture the best of Contra Costa County since our founding.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-cream/50 hover:text-gold border border-cream/10 hover:border-gold/30 rounded transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="eyebrow text-gold mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    {to ? (
                      to.startsWith('tel:') ? (
                        <a
                          href={to}
                          className="text-sm text-cream/60 hover:text-cream font-sans transition-colors duration-200"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          to={to}
                          className="text-sm text-cream/60 hover:text-cream font-sans transition-colors duration-200"
                        >
                          {label}
                        </Link>
                      )
                    ) : (
                      <span className="text-sm text-cream/60 font-sans">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="mt-16 pt-12 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-serif text-xl text-cream mb-1">Stay Connected</h3>
              <p className="text-cream/50 text-sm font-sans">
                Subscribe for wine releases, events, and exclusive member offers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-0 w-full md:w-auto"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 md:w-64 px-4 py-3 bg-cream/5 border border-cream/20 text-cream placeholder-cream/30
                           font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors
                           rounded-l rounded-r-none min-h-[44px]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gold hover:bg-gold-dark text-white font-sans text-xs tracking-widest uppercase
                           rounded-r rounded-l-none transition-colors duration-200 disabled:opacity-70 min-h-[44px] whitespace-nowrap"
              >
                {loading ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/40 text-xs font-sans text-center sm:text-left">
              © {new Date().getFullYear()} Campos Family Vineyards. All rights reserved.
            </p>
            <p className="text-cream/30 text-xs font-sans text-center">
              Please drink responsibly. Must be 21+ to purchase.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
