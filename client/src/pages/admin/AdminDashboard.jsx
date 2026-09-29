import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '📦' },
    { label: 'Active Products', value: stats.totalProducts, icon: '🍷' },
    { label: 'Upcoming Bookings', value: stats.totalBookings, icon: '📅' },
    { label: 'Revenue', value: `$${Number(stats.totalRevenue || 0).toLocaleString()}`, icon: '💰' },
    { label: 'Club Members', value: stats.clubMembers, icon: '⭐' },
    { label: 'Subscribers', value: stats.activeSubscribers, icon: '📧' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: '💬' },
  ] : []

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-2">Dashboard</h1>
      <p className="text-sm font-sans text-charcoal/50 mb-10">Campos Family Vineyards — Admin Panel</p>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map(({ label, value, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-cream rounded-lg p-6"
            >
              <div className="text-2xl mb-3" aria-hidden="true">{icon}</div>
              <p className="font-serif text-3xl text-charcoal mb-1">{value ?? '—'}</p>
              <p className="eyebrow text-charcoal/50 text-[10px]">{label}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
