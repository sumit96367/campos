import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

const NotFoundPage = () => (
  <PageTransition>
    <Helmet><title>Page Not Found | Campos Family Vineyards</title></Helmet>
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-script text-gold text-8xl mb-4">404</p>
          <h1 className="font-serif text-4xl text-charcoal mb-4">Page Not Found</h1>
          <p className="body-elegant mb-10">Looks like this page has wandered off into the vineyard. Let's get you back on track.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">Return Home</Link>
            <Link to="/wines" className="btn-secondary">Browse Our Wines</Link>
          </div>
        </motion.div>
      </div>
    </div>
  </PageTransition>
)

export default NotFoundPage
