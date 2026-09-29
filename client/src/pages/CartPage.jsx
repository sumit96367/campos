import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../store/cartStore'
import PageTransition from '../components/ui/PageTransition'

const CartPage = () => {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <PageTransition>
      <Helmet><title>Cart | Campos Family Vineyards</title></Helmet>
      <div className="pt-20 min-h-screen bg-ivory section-py">
        <div className="section-container max-w-4xl">
          <h1 className="font-serif text-4xl text-charcoal mb-12">Your Cart</h1>
          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-charcoal/40 mb-4">Your cart is empty</p>
              <Link to="/wines" className="btn-primary">Shop Our Wines</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map(item => (
                  <div key={item._id} className="flex gap-6 bg-cream p-6">
                    <div className="w-20 h-24 bg-champagne flex-shrink-0 flex items-center justify-center">
                      {item.images?.[0]?.url ? <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-3xl">🍷</span>}
                    </div>
                    <div className="flex-1">
                      <p className="eyebrow text-gold mb-1">{item.category}</p>
                      <h2 className="font-serif text-lg text-charcoal mb-2">{item.name}</h2>
                      <p className="font-serif text-xl text-charcoal">${Number(item.price).toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 border border-champagne flex items-center justify-center hover:border-gold hover:text-gold transition-colors">−</button>
                        <span className="font-sans text-sm w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 border border-champagne flex items-center justify-center hover:border-gold hover:text-gold transition-colors">+</button>
                        <button onClick={() => removeItem(item._id)} className="ml-4 text-xs font-sans text-charcoal/40 hover:text-wine transition-colors tracking-wider uppercase">Remove</button>
                      </div>
                    </div>
                    <p className="font-serif text-xl text-charcoal self-center">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <button onClick={clearCart} className="text-sm font-sans text-charcoal/40 hover:text-wine transition-colors tracking-wider uppercase">Clear Cart</button>
              </div>
              <div className="bg-cream p-8 h-fit">
                <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm font-sans text-charcoal/70">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans text-charcoal/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-champagne pt-4 flex justify-between">
                    <span className="font-serif text-lg text-charcoal">Estimated Total</span>
                    <span className="font-serif text-2xl text-charcoal">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link to="/checkout" className="btn-primary w-full justify-center">Proceed to Checkout</Link>
                <Link to="/wines" className="btn-ghost w-full justify-center mt-4 text-charcoal/50">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default CartPage
