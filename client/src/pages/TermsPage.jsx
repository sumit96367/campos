import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/ui/PageTransition'

const TermsPage = () => (
  <PageTransition>
    <Helmet><title>Terms of Service | Campos Family Vineyards</title></Helmet>
    <div className="pt-20 min-h-screen bg-ivory">
      <div className="bg-charcoal py-20 text-center">
        <span className="eyebrow text-gold block mb-4">Legal</span>
        <h1 className="heading-display text-cream">Terms of Service</h1>
      </div>
      <div className="section-container section-py max-w-3xl prose prose-lg font-sans text-charcoal/70 leading-relaxed space-y-6">
        <p className="text-sm text-charcoal/40">Last updated: 2024</p>
        <h2 className="font-serif text-2xl text-charcoal">Age Verification</h2>
        <p>You must be 21 years of age or older to purchase alcohol from Campos Family Vineyards. By placing an order, you confirm that you and the recipient are of legal drinking age in your jurisdiction.</p>
        <h2 className="font-serif text-2xl text-charcoal" id="responsible-drinking">Responsible Drinking</h2>
        <p>Campos Family Vineyards encourages responsible consumption of alcoholic beverages. Please drink responsibly, never drink and drive, and be aware of the effects of alcohol. If you or someone you know has a drinking problem, please seek professional help.</p>
        <h2 className="font-serif text-2xl text-charcoal">Wine Club</h2>
        <p>Wine Club membership is non-transferable. Members may cancel at any time with 30 days notice before the next scheduled shipment. All member benefits apply from the date of enrollment.</p>
        <h2 className="font-serif text-2xl text-charcoal">Contact</h2>
        <p>For questions, contact us at 3501 Byer Rd., Byron, CA 94514 or call (925) 308-7963.</p>
      </div>
    </div>
  </PageTransition>
)
export default TermsPage
