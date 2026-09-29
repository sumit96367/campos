import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const DonationPage = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    taxId: '',
    contactName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventName: '',
    requestDetails: '',
    proofOfNonprofit: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Charitable Donation Requests | Campos Family Vineyards</title>
        <meta
          name="description"
          content="Campos Family Vineyards takes great pride in supporting non-profit organizations and our local community. Learn our donation request guidelines and submit your 501(c)(3) application."
        />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-charcoal text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/40 via-transparent to-transparent pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-3">
              Giving Back · Community First
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-6">
              Donation Requests
            </motion.h1>
            <motion.p variants={fadeUp} className="text-cream/70 font-sans text-base md:text-lg leading-relaxed">
              Campos Family Vineyards is a family-owned and operated winery and vineyard. We take immense pride in supporting non-profit organizations and our local community through our philanthropic efforts and Give Back Series.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Guidelines & Form Section */}
      <section className="section-py bg-ivory">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Guidelines Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-cream rounded-2xl p-8 border border-gold/15 shadow-sm">
                <span className="eyebrow text-gold block mb-2">Important Requirements</span>
                <h2 className="font-serif text-2xl text-charcoal mb-4">
                  Request Guidelines
                </h2>
                <div className="w-10 h-px bg-gold mb-6" />
                <p className="text-sm font-sans text-charcoal/70 leading-relaxed mb-6">
                  We receive a high volume of requests and take time to carefully review each and every one. Please review the guidelines below prior to submitting:
                </p>

                <ul className="space-y-4 text-sm font-sans text-charcoal/80">
                  <li className="flex gap-3 items-start">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    <span><strong>Online Form Only:</strong> ALL donation requests must be submitted through this online portal.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    <span><strong>30-Day Notice:</strong> Requests must be received at least 30 days prior to your scheduled event date.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    <span><strong>501(c)(3) Status:</strong> You MUST be a registered 501(c)(3) nonprofit. Your charitable Tax ID is required.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    <span><strong>Letter of Proof:</strong> We require documentation / determination letter verifying valid 501(c)(3) status.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-charcoal/10">
                  <h3 className="font-serif text-sm text-charcoal mb-2">Our Give Back Series</h3>
                  <p className="text-xs font-sans text-charcoal/60 leading-relaxed">
                    Through custom vintages like Gigi’s Blend, 65 Roses, and Lou, we regularly direct proceeds to ALS research, autism programs, cystic fibrosis foundations, and dementia care.
                  </p>
                </div>
              </div>

              {/* Office hours contact */}
              <div className="bg-charcoal text-cream rounded-2xl p-6 text-sm">
                <h3 className="font-serif text-gold text-lg mb-2">Questions?</h3>
                <p className="text-cream/70 text-xs mb-4">
                  For non-donation inquiries, please contact our administrative team:
                </p>
                <div className="space-y-1.5 text-xs text-cream/90 font-sans">
                  <div><strong>Office Hours:</strong> Tuesday–Friday 9:00 AM – 5:00 PM</div>
                  <div><strong>Phone:</strong> (925) 308-7963</div>
                  <div><strong>Location:</strong> 3501 Byer Rd., Byron, CA 94514</div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-cream rounded-2xl p-8 md:p-10 border border-charcoal/5 shadow-md">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      ✓
                    </div>
                    <h2 className="font-serif text-3xl text-charcoal mb-4">
                      Request Submitted
                    </h2>
                    <p className="text-sm font-sans text-charcoal/70 max-w-md mx-auto leading-relaxed mb-8">
                      Thank you for contacting Campos Family Vineyards. We have received your donation request for <strong>{formData.organizationName}</strong>. Our philanthropy committee reviews submissions monthly and will reach out via email.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary text-xs"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl text-charcoal mb-2">
                        Organization Information
                      </h2>
                      <p className="text-xs font-sans text-charcoal/60">
                        Please provide valid non-profit credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Organization Name *
                        </label>
                        <input
                          type="text"
                          name="organizationName"
                          required
                          value={formData.organizationName}
                          onChange={handleChange}
                          placeholder="e.g. Hope for Health Foundation"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          501(c)(3) Tax ID Number *
                        </label>
                        <input
                          type="text"
                          name="taxId"
                          required
                          value={formData.taxId}
                          onChange={handleChange}
                          placeholder="XX-XXXXXXX"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          required
                          value={formData.contactName}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="contact@org.org"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(925) 000-0000"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Event Name *
                        </label>
                        <input
                          type="text"
                          name="eventName"
                          required
                          value={formData.eventName}
                          onChange={handleChange}
                          placeholder="Annual Gala & Auction"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                          Event Date * (Must be 30+ days away)
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          required
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                        Event Description & Donation Request Details *
                      </label>
                      <textarea
                        name="requestDetails"
                        rows="4"
                        required
                        value={formData.requestDetails}
                        onChange={handleChange}
                        placeholder="Please tell us about your event, expected attendance, beneficiaries, and how Campos Family Vineyards can best support your mission."
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-gold resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-charcoal/70 mb-2">
                        501(c)(3) Letter of Determination / Proof (PDF or Image)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            proofOfNonprofit: e.target.files[0] || null,
                          }))
                        }
                        className="w-full text-xs text-charcoal/70 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-charcoal file:text-cream hover:file:bg-gold hover:file:text-charcoal cursor-pointer"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 text-center justify-center font-sans tracking-widest text-xs uppercase"
                    >
                      {loading ? 'Submitting Application...' : 'Submit Donation Request'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default DonationPage
