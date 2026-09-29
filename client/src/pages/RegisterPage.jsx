import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password })
      toast.success('Account created! Welcome to the family.')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Create Account | Campos Family Vineyards</title>
      </Helmet>
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6 pt-20 pb-16">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <Link to="/" className="inline-block mb-8">
              <span className="font-display text-2xl tracking-[0.18em] uppercase text-charcoal">Campos</span>
              <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold mt-1">Family Vineyards</span>
            </Link>
            <h1 className="font-serif text-3xl text-charcoal mb-2">Join the Family</h1>
            <p className="text-sm font-sans text-charcoal/50">Create your account to start your Wine Club journey</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-cream p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="reg-firstName">First Name</label>
                  <input id="reg-firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} className="form-input" placeholder="Jane" />
                </div>
                <div>
                  <label className="form-label" htmlFor="reg-lastName">Last Name</label>
                  <input id="reg-lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} className="form-input" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="reg-email">Email Address</label>
                <input id="reg-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="form-label" htmlFor="reg-password">Password</label>
                <input id="reg-password" name="password" type="password" required autoComplete="new-password" value={form.password} onChange={handleChange} className="form-input" placeholder="Min. 8 characters" minLength={8} />
              </div>
              <div>
                <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                <input id="reg-confirm" name="confirmPassword" type="password" required autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} className="form-input" placeholder="Re-enter password" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Creating Account…' : 'Create Account'}
              </button>
              <p className="text-center text-xs font-sans text-charcoal/40 leading-relaxed">
                By creating an account, you confirm you are 21 years of age or older.
              </p>
            </form>
          </motion.div>

          <p className="text-center text-sm font-sans text-charcoal/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-gold-dark transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  )
}

export default RegisterPage
