import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item._id === product._id);
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
              )
            };
          }
          return { items: [...state.items, { ...product, quantity }] };
        });
        get().openCart();
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return get().removeItem(productId);
        set((state) => ({
          items: state.items.map(item => 
            item._id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      get cartTotal() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      get cartCount() {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    { name: 'campos-cart-storage' }
  )
);

export default useCartStore;
