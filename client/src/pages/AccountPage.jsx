import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import useAuthStore from '../store/authStore'
import api from '../services/api'
import toast from 'react-hot-toast'

const AccountPage = () => {
  const { user, logout } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/orders/my')
        setOrders(data.orders || [])
      } catch { setOrders([]) }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  return (
    <PageTransition>
      <Helmet><title>My Account | Campos Family Vineyards</title></Helmet>
      <div className="pt-20 min-h-screen bg-ivory section-py">
        <div className="section-container max-w-4xl">
          <div className="flex items-start justify-between mb-12">
            <div>
              <span className="eyebrow text-gold block mb-2">Welcome back</span>
              <h1 className="font-serif text-4xl text-charcoal">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-sm font-sans text-charcoal/50 mt-1">{user?.email}</p>
            </div>
            <button onClick={logout} className="btn-secondary text-xs">Sign Out</button>
          </div>

          <h2 className="font-serif text-2xl text-charcoal mb-8">Order History</h2>
          {loading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>
          ) : orders.length === 0 ? (
            <div className="bg-cream p-12 text-center">
              <p className="font-serif text-xl text-charcoal/40 mb-4">No orders yet</p>
              <p className="text-sm text-charcoal/40 font-sans mb-6">Ready to try something new?</p>
              <a href="/wines" className="btn-secondary">Shop Our Wines</a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="bg-cream p-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow text-gold mb-1">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="font-sans text-sm text-charcoal">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl text-charcoal">${Number(order.total).toFixed(2)}</p>
                    <span className={`eyebrow text-[10px] ${order.status === 'delivered' ? 'text-green-600' : 'text-gold'}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default AccountPage
