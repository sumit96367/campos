import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import useCartStore from '../store/cartStore'
import api from '../services/api'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  })

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-20 px-6">
        <div className="text-center">
          <p className="font-serif text-2xl text-charcoal/40 mb-4">Your cart is empty</p>
          <Link to="/wines" className="btn-primary">Shop Our Wines</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/orders/checkout', {
        items: items.map(i => ({ product: i._id, quantity: i.quantity, price: i.price })),
        shipping: form,
        total,
      })
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/order-confirmation')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet><title>Checkout | Campos Family Vineyards</title></Helmet>
      <div className="pt-20 min-h-screen bg-ivory section-py">
        <div className="section-container max-w-5xl">
          <h1 className="font-serif text-4xl text-charcoal mb-12">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              <div className="bg-cream p-8">
                <h2 className="font-serif text-xl text-charcoal mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className="form-label" htmlFor="co-firstName">First Name</label><input id="co-firstName" name="firstName" required value={form.firstName} onChange={handleChange} className="form-input" /></div>
                  <div><label className="form-label" htmlFor="co-lastName">Last Name</label><input id="co-lastName" name="lastName" required value={form.lastName} onChange={handleChange} className="form-input" /></div>
                  <div><label className="form-label" htmlFor="co-email">Email</label><input id="co-email" name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" /></div>
                  <div><label className="form-label" htmlFor="co-phone">Phone</label><input id="co-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" /></div>
                </div>
              </div>
              <div className="bg-cream p-8">
                <h2 className="font-serif text-xl text-charcoal mb-6">Shipping Address</h2>
                <div className="space-y-6">
                  <div><label className="form-label" htmlFor="co-address">Street Address</label><input id="co-address" name="address" required value={form.address} onChange={handleChange} className="form-input" /></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="sm:col-span-1"><label className="form-label" htmlFor="co-city">City</label><input id="co-city" name="city" required value={form.city} onChange={handleChange} className="form-input" /></div>
                    <div><label className="form-label" htmlFor="co-state">State</label><input id="co-state" name="state" required value={form.state} onChange={handleChange} className="form-input" placeholder="CA" /></div>
                    <div><label className="form-label" htmlFor="co-zip">ZIP</label><input id="co-zip" name="zip" required value={form.zip} onChange={handleChange} className="form-input" /></div>
                  </div>
                  <p className="text-xs font-sans text-charcoal/40 italic">⚠️ Adult signature (21+) required upon delivery. We cannot ship to PO Boxes.</p>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm">
                {loading ? 'Processing…' : `Place Order — $${total.toFixed(2)}`}
              </button>
            </form>

            {/* Summary */}
            <div className="bg-cream p-8 h-fit">
              <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between gap-4 text-sm font-sans">
                    <span className="text-charcoal/70 leading-snug">{item.name} <span className="text-charcoal/40">×{item.quantity}</span></span>
                    <span className="text-charcoal flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-champagne pt-4 flex justify-between">
                <span className="font-serif text-lg text-charcoal">Total</span>
                <span className="font-serif text-2xl text-charcoal">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-charcoal/40 font-sans mt-4 leading-relaxed">Shipping and taxes calculated after checkout. Must be 21+ to purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default CheckoutPage
