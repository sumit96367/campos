import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'

const OrderConfirmationPage = () => (
  <PageTransition>
    <Helmet><title>Order Confirmed | Campos Family Vineyards</title></Helmet>
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🍾</div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Order Confirmed!</h1>
        <p className="body-elegant mb-10">
          Thank you for your order. You will receive a confirmation email shortly with your order details and tracking information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/wines" className="btn-primary">Continue Shopping</Link>
          <Link to="/account" className="btn-secondary">View My Orders</Link>
        </div>
      </div>
    </div>
  </PageTransition>
)

export default OrderConfirmationPage
