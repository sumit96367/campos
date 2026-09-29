import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import useAuthStore from '../../store/authStore'
import useCartStore from '../../store/cartStore'

const navLinks = [
  { label: 'Wines', to: '/wines' },
  { 
    label: 'Wine Club', 
    to: '/wine-club',
    children: [
      { label: 'Wine Club', to: '/wine-club' },
      { label: 'Olive Oil Club', to: '/olive-oil-club' },
    ]
  },
  { label: 'Visit', to: '/visit' },
  { 
    label: 'Events', 
    to: '/events',
    children: [
      { label: 'Upcoming Events', to: '/events' },
      { label: 'Photo Gallery', to: '/gallery' },
    ]
  },
  { 
    label: 'About', 
    to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Meet the Winemaker', to: '/about#winemaker' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Donation Requests', to: '/donation' },
    ]
  },
  { label: 'Amy G', to: '/amy-g' },
  { label: 'Vendor Interest', to: '/vendor-interest' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [hidden, setHidden] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const { items, isOpen, toggleCart } = useCartStore()
  const cartCount = items.reduce((n, i) => n + i.quantity, 0)
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setIsScrolled(latest > 50)
    setHidden(latest > 200 && latest > prev)
  })

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const needsSolidBg = [
    '/cart', '/checkout', '/login', '/register', '/account', 
    '/privacy-policy', '/terms', '/shipping-returns', '/order-confirmation', '/olive-oil-club',
    '/donation', '/faq', '/blog', '/about-us'
  ].includes(location.pathname) || location.pathname.startsWith('/wines/') || location.pathname.startsWith('/wine-club')

  const showSolidBg = isScrolled || mobileOpen || needsSolidBg

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          showSolidBg ? 'bg-charcoal/98 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="section-container h-20 flex items-center justify-between">
          {/* Left side (Mobile toggle + Logo) */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 z-50 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-cream transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-px w-5 bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-left group"
              aria-label="Campos Family Vineyards home"
            >
              <div className="font-display text-xl md:text-2xl tracking-[0.18em] uppercase text-cream group-hover:text-gold transition-colors duration-500">
                Campos
              </div>
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/80 mt-0.5">
                Family Vineyards
              </div>
            </Link>
          </div>

          {/* Center (Desktop nav) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2" aria-label="Primary">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div 
                    key={link.to} 
                    className="relative group py-6"
                    onMouseEnter={() => setHoveredNav(link.to)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => `nav-link inline-flex items-center gap-1.5 ${isActive ? 'nav-link-active' : ''}`}
                    >
                      <span>{link.label}</span>
                      <svg className={`w-3 h-3 transition-transform duration-300 ${hoveredNav === link.to ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </NavLink>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {hoveredNav === link.to && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 min-w-[14rem] w-max max-w-xs whitespace-nowrap bg-charcoal/95 backdrop-blur-md shadow-2xl rounded-lg border border-gold/20 py-2 overflow-hidden z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="block px-5 py-2.5 font-sans text-xs tracking-wider uppercase text-cream/80 hover:text-gold hover:bg-white/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to} 
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                >{link.label}</NavLink>
              );
            })}
          </nav>

          {/* Right side (Actions) */}
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <Link to={user?.role === 'admin' ? '/admin' : '/account'} className="hidden lg:block text-cream/70 hover:text-gold transition-colors" aria-label="Account">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="hidden lg:block nav-link">Sign In</Link>
            )}
            <button onClick={toggleCart} className="relative text-cream/70 hover:text-gold transition-colors p-1" aria-label={`Cart (${cartCount} items)`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[9px] rounded-full flex items-center justify-center font-sans font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center gap-6 lg:hidden overflow-y-auto py-12"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="text-center"
              >
                <Link to={link.to} className="font-serif text-3xl md:text-4xl text-cream hover:text-gold transition-colors">
                  {link.label}
                </Link>
                {link.children && (
                  <div className="flex flex-col gap-2 mt-2">
                    {link.children.map((child) => (
                      <Link 
                        key={child.to} 
                        to={child.to} 
                        className="font-sans text-sm tracking-widest uppercase text-gold/80 hover:text-cream transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-6 border-t border-cream/10 w-48 text-center">
              {isAuthenticated
                ? <Link to={user?.role === 'admin' ? '/admin' : '/account'} className="btn-secondary border-cream/30 text-cream">Account</Link>
                : <Link to="/login" className="btn-secondary border-cream/30 text-cream">Sign In</Link>
              }
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
