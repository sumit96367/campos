import { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/messages').then(({ data }) => setMessages(data.messages || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const markRead = async (id) => {
    try {
      await api.patch(`/admin/messages/${id}/read`)
      setMessages(ms => ms.map(m => m._id === id ? { ...m, isRead: true } : m))
    } catch { toast.error('Failed to update') }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Messages</h1>
      {loading ? <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-center py-12 font-sans text-sm text-charcoal/40">No messages yet</p>}
          {messages.map(msg => (
            <div key={msg._id} className={`p-6 rounded-lg border ${msg.isRead ? 'bg-cream border-champagne' : 'bg-gold/5 border-gold/30'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-lg text-charcoal">{msg.name}</p>
                  <p className="text-sm font-sans text-charcoal/50">{msg.email} · {new Date(msg.createdAt).toLocaleDateString()}</p>
                  {msg.subject && <p className="eyebrow text-gold text-[10px] mt-1">{msg.subject}</p>}
                </div>
                {!msg.isRead && <button onClick={() => markRead(msg._id)} className="eyebrow text-[9px] px-3 py-1.5 border border-gold text-gold hover:bg-gold hover:text-white transition-colors whitespace-nowrap">Mark Read</button>}
              </div>
              <p className="mt-4 text-sm font-sans text-charcoal/70 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default AdminMessages
