import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/ui/PageTransition'

const PrivacyPage = () => (
  <PageTransition>
    <Helmet><title>Privacy Policy | Campos Family Vineyards</title></Helmet>
    <div className="pt-20 min-h-screen bg-ivory">
      <div className="bg-charcoal py-20 text-center mb-0">
        <span className="eyebrow text-gold block mb-4">Legal</span>
        <h1 className="heading-display text-cream">Privacy Policy</h1>
      </div>
      <div className="section-container section-py max-w-3xl prose prose-lg font-sans text-charcoal/70 leading-relaxed space-y-6">
        <p className="text-sm text-charcoal/40 font-sans">Last updated: 2024</p>
        <h2 className="font-serif text-2xl text-charcoal">Information We Collect</h2>
        <p>Campos Family Vineyards collects information you provide directly to us, such as when you create an account, place an order, join our Wine Club, sign up for our newsletter, or contact us. This may include your name, email address, postal address, phone number, and payment information.</p>
        <h2 className="font-serif text-2xl text-charcoal">How We Use Your Information</h2>
        <p>We use the information we collect to process orders and payments, send you order confirmations and shipping notifications, respond to your inquiries, send you marketing communications (with your consent), and improve our website and services.</p>
        <h2 className="font-serif text-2xl text-charcoal">Information Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to fulfill your orders (e.g., shipping carriers, payment processors) or as required by law.</p>
        <h2 className="font-serif text-2xl text-charcoal">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="tel:+19253087963" className="text-gold hover:text-gold-dark">(925) 308-7963</a> or visit us at 3501 Byer Rd., Byron, CA 94514.</p>
      </div>
    </div>
  </PageTransition>
)
export default PrivacyPage
