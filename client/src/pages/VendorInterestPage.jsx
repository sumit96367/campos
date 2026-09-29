import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const vendorFormFields = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  businessType: '',
  socialMedia: '',
  message: ''
};

const VendorInterestPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Vendor Interest | Campos Family Vineyards</title>
        <meta name="description" content="Submit your interest in becoming a vendor at Campos Family Vineyards events." />
      </Helmet>
      
      {/* Hero */}
      <div className="relative pt-20 min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/Campos-Aerial-2-scaled-1.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        </div>
        <div className="relative z-10 section-container pb-20 text-center mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">Partner with us for upcoming events</span>
            <h1 className="heading-hero text-cream mb-0 mx-auto">Vendor Interest</h1>
          </motion.div>
        </div>
      </div>

      <section className="section-py bg-cream">
        <div className="section-container max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 lg:p-16 rounded shadow-xl"
          >
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">Vendor Application</h2>
              <p className="text-charcoal/70 font-sans max-w-2xl mx-auto">
                Thank you for your interest in becoming a vendor at Campos Family Vineyards! 
                Please fill out the form below with your business details, and our events team 
                will get back to you with more information on upcoming opportunities.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="font-sans text-sm text-charcoal tracking-wide uppercase">Business Name *</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactName" className="font-sans text-sm text-charcoal tracking-wide uppercase">Contact Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-sm text-charcoal tracking-wide uppercase">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="font-sans text-sm text-charcoal tracking-wide uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="businessType" className="font-sans text-sm text-charcoal tracking-wide uppercase">Type of Product/Service *</label>
                <input
                  type="text"
                  id="businessType"
                  name="businessType"
                  required
                  placeholder="e.g. Food Truck, Jewelry, Art, etc."
                  className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="socialMedia" className="font-sans text-sm text-charcoal tracking-wide uppercase">Website or Social Media Link</label>
                <input
                  type="url"
                  id="socialMedia"
                  name="socialMedia"
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-sans text-sm text-charcoal tracking-wide uppercase">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 bg-cream/30 border border-charcoal/10 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors font-sans resize-y"
                ></textarea>
              </div>

              <div className="pt-4 text-center md:text-left">
                <button 
                  type="submit" 
                  className="btn-primary w-full md:w-auto"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default VendorInterestPage;
