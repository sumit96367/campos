import { useState, useEffect } from 'react'
import api from '../../services/api'

const AdminMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/members').then(({ data }) => setMembers(data.members || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Wine Club Members</h1>
      {loading ? <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-champagne">{['Name', 'Email', 'Tier', 'Joined', 'Status'].map(h => <th key={h} className="text-left eyebrow text-[10px] text-charcoal/50 pb-4 pr-6">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-champagne">
              {members.length === 0 && <tr><td colSpan={5} className="py-12 text-center font-sans text-sm text-charcoal/40">No club members yet</td></tr>}
              {members.map(m => (
                <tr key={m._id} className="hover:bg-cream/50">
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">{m.firstName} {m.lastName}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/60">{m.email}</td>
                  <td className="py-4 pr-6"><span className="eyebrow text-[9px] px-2 py-1 bg-gold/10 text-gold">{m.tier}</span></td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal/60">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="py-4"><span className={`eyebrow text-[9px] px-2 py-1 ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default AdminMembers
