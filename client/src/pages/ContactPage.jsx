import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import api from '../services/api'
import toast from 'react-hot-toast'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Thank you! We\'ll be in touch soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Contact | Campos Family Vineyards</title>
        <meta name="description" content="Get in touch with Campos Family Vineyards. Visit us at 3501 Byer Rd., Byron, CA or call (925) 308-7963." />
      </Helmet>

      {/* Hero */}
      <div className="pt-20 bg-charcoal py-24">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">We'd Love to Hear From You</span>
            <h1 className="heading-hero text-cream">Contact Us</h1>
          </motion.div>
        </div>
      </div>

      <section className="section-py bg-ivory">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info */}
            <div>
              <h2 className="heading-section text-charcoal mb-8">Get in Touch</h2>
              <div className="space-y-8">
                {[
                  { icon: '📍', title: 'Address', lines: ['3501 Byer Rd.', 'Byron, CA 94514'] },
                  { icon: '📞', title: 'Phone', lines: ['(925) 308-7963'] },
                  { icon: '🕐', title: 'Tasting Room Hours', lines: ['Friday: 1:00 PM – 5:00 PM', 'Saturday: 12:00 PM – 5:00 PM', 'Sunday: 1:00 PM – 5:00 PM', 'Mon–Thu: By Appointment'] },
                  { icon: '🌐', title: 'Follow Us', lines: ['facebook.com/camposfamilyvineyards', 'instagram.com/camposfamilyvineyards'] },
                ].map(({ icon, title, lines }) => (
                  <div key={title} className="flex gap-5">
                    <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <h3 className="eyebrow text-charcoal mb-2">{title}</h3>
                      {lines.map(line => <p key={line} className="text-sm font-sans text-charcoal/70 leading-relaxed">{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-cream p-8 md:p-10">
              <h2 className="font-serif text-2xl text-charcoal mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input id="contact-name" name="name" type="text" required value={form.name} onChange={handleChange} className="form-input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-phone">Phone (optional)</label>
                  <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" placeholder="(555) 000-0000" />
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <select id="contact-subject" name="subject" required value={form.subject} onChange={handleChange} className="form-input">
                    <option value="">Select a topic…</option>
                    <option value="general">General Inquiry</option>
                    <option value="tasting">Tasting Room & Visits</option>
                    <option value="wine-club">Wine Club</option>
                    <option value="events">Events & Private Parties</option>
                    <option value="wholesale">Wholesale / Trade</option>
                    <option value="media">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" rows={5} required value={form.message} onChange={handleChange} className="form-input resize-none" placeholder="Tell us how we can help…" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default ContactPage
