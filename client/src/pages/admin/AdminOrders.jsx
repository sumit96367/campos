import { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/orders').then(({ data }) => setOrders(data.orders || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Orders</h1>
      {loading ? <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-champagne">
                {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Payment'].map(h => (
                  <th key={h} className="text-left eyebrow text-charcoal/50 text-[10px] pb-4 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne">
              {orders.length === 0 && <tr><td colSpan={6} className="py-12 text-center font-sans text-sm text-charcoal/40">No orders yet</td></tr>}
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-4 pr-6 font-sans text-xs text-charcoal/60">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">{order.user?.firstName} {order.user?.lastName}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">${Number(order.total).toFixed(2)}</td>
                  <td className="py-4 pr-6"><span className="eyebrow text-[9px] px-2 py-1 bg-champagne text-charcoal">{order.status}</span></td>
                  <td className="py-4"><span className={`eyebrow text-[9px] px-2 py-1 ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default AdminOrders
