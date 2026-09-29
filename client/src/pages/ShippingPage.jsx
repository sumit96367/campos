import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/ui/PageTransition'

const ShippingPage = () => (
  <PageTransition>
    <Helmet><title>Shipping & Returns | Campos Family Vineyards</title></Helmet>
    <div className="pt-20 min-h-screen bg-ivory">
      <div className="bg-charcoal py-20 text-center">
        <span className="eyebrow text-gold block mb-4">Information</span>
        <h1 className="heading-display text-cream">Shipping & Returns</h1>
      </div>
      <div className="section-container section-py max-w-3xl space-y-10">
        {[
          { title: 'Shipping Policy', body: 'We ship to most states in the US where online wine sales are permitted. Standard shipping takes 5–7 business days. Expedited options are available at checkout. All wine shipments require an adult signature upon delivery. We cannot ship to PO Boxes.' },
          { title: 'Wine Club Shipments', body: 'Wine Club members receive quarterly shipments. You may choose to pick up your shipment at the tasting room instead. Please update your shipping address at least 2 weeks before your shipment date.' },
          { title: 'Returns & Refunds', body: 'Due to state regulations, we cannot accept returns of alcoholic beverages except in cases of defective or damaged products. If your wine arrives damaged or corked, please contact us within 7 days of receipt and we will arrange a replacement or refund.' },
          { title: 'Contact', body: 'For shipping inquiries, please call (925) 308-7963 or visit us at 3501 Byer Rd., Byron, CA 94514.' },
        ].map(({ title, body }) => (
          <div key={title} className="bg-cream p-8">
            <h2 className="font-serif text-xl text-charcoal mb-4">{title}</h2>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
)
export default ShippingPage
