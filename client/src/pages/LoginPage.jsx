import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Sign In | Campos Family Vineyards</title>
      </Helmet>
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <Link to="/" className="inline-block mb-8">
              <span className="font-display text-2xl tracking-[0.18em] uppercase text-charcoal">Campos</span>
              <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold mt-1">Family Vineyards</span>
            </Link>
            <h1 className="font-serif text-3xl text-charcoal mb-2">Welcome Back</h1>
            <p className="text-sm font-sans text-charcoal/50">Sign in to your account</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-cream p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input id="login-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="form-label" htmlFor="login-password">Password</label>
                <input id="login-password" name="password" type="password" required autoComplete="current-password" value={form.password} onChange={handleChange} className="form-input" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Signing In…' : 'Sign In'}
              </button>
            </form>
          </motion.div>

          <p className="text-center text-sm font-sans text-charcoal/50 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:text-gold-dark transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  )
}

export default LoginPage
