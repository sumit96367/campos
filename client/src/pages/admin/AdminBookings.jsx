import { useState, useEffect } from 'react'
import api from '../../services/api'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/bookings').then(({ data }) => setBookings(data.bookings || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Bookings</h1>
      {loading ? <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-champagne">{['Name', 'Date', 'Guests', 'Type', 'Status'].map(h => <th key={h} className="text-left eyebrow text-[10px] text-charcoal/50 pb-4 pr-6">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-champagne">
              {bookings.length === 0 && <tr><td colSpan={5} className="py-12 text-center font-sans text-sm text-charcoal/40">No bookings yet</td></tr>}
              {bookings.map(b => (
                <tr key={b._id} className="hover:bg-cream/50">
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">{b.name}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/70">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/70">{b.guests}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/70">{b.type}</td>
                  <td className="py-4"><span className="eyebrow text-[9px] px-2 py-1 bg-champagne text-charcoal">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default AdminBookings
