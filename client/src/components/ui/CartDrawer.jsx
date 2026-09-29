import { AnimatePresence, motion } from 'framer-motion'
import useCartStore from '../../store/cartStore'
import { Link } from 'react-router-dom'

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, cartTotal } = useCartStore()
  const total = typeof cartTotal === 'function' ? cartTotal() : items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 flex flex-col shadow-elegant-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-champagne">
              <div>
                <h2 className="font-serif text-xl text-charcoal">Your Cart</h2>
                <p className="eyebrow text-gold mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={closeCart} className="text-charcoal/50 hover:text-gold transition-colors p-2" aria-label="Close cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-serif text-2xl text-charcoal/40 mb-4">Your cart is empty</p>
                  <button onClick={closeCart} className="btn-secondary text-xs">Continue Browsing</button>
                </div>
              ) : items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="w-16 h-20 bg-champagne flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.images?.[0]?.url ? (
                      <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🍷</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-charcoal leading-tight truncate">{item.name}</h3>
                    <p className="font-sans text-sm text-charcoal/50 mt-0.5">${Number(item.price).toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-6 h-6 border border-champagne flex items-center justify-center text-charcoal/60 hover:border-gold hover:text-gold transition-colors text-sm">−</button>
                      <span className="font-sans text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-6 h-6 border border-champagne flex items-center justify-center text-charcoal/60 hover:border-gold hover:text-gold transition-colors text-sm">+</button>
                      <button onClick={() => removeItem(item._id)} className="ml-auto text-charcoal/30 hover:text-wine transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="font-serif text-base text-charcoal flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-champagne space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-charcoal/60 tracking-wider uppercase">Subtotal</span>
                  <span className="font-serif text-2xl text-charcoal">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-charcoal/40 font-sans">Shipping & taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={closeCart} className="btn-primary w-full justify-center">
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-center text-xs font-sans text-charcoal/40 hover:text-charcoal/70 transition-colors tracking-wider uppercase py-2">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
