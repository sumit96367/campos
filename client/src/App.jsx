import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layouts
import RootLayout from './components/layout/RootLayout'
import AdminLayout from './components/layout/AdminLayout'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WinesPage from './pages/WinesPage'
import WineDetailPage from './pages/WineDetailPage'
import WineClubPage from './pages/WineClubPage'
import VisitPage from './pages/VisitPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ShippingPage from './pages/ShippingPage'
import NotFoundPage from './pages/NotFoundPage'
import AmyGPage from './pages/AmyGPage'
import VendorInterestPage from './pages/VendorInterestPage'
import GalleryPage from './pages/GalleryPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminBookings from './pages/admin/AdminBookings'
import AdminEvents from './pages/admin/AdminEvents'
import AdminMessages from './pages/admin/AdminMessages'
import AdminMembers from './pages/admin/AdminMembers'

// UI
import CustomCursor from './components/ui/CustomCursor'
import SmoothScroll from './components/ui/SmoothScroll'
import ProtectedRoute from './components/ui/ProtectedRoute'
import useAuthStore from './store/authStore'

const App = () => {
  const fetchMe = useAuthStore((s) => s.fetchMe)

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  return (
    <SmoothScroll>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public site */}
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="wines" element={<WinesPage />} />
            <Route path="wines/:slug" element={<WineDetailPage />} />
            <Route path="wine-club" element={<WineClubPage />} />
            <Route path="visit" element={<VisitPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="shipping-returns" element={<ShippingPage />} />
            <Route path="amy-g" element={<AmyGPage />} />
            <Route path="vendor-interest" element={<VendorInterestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin */}
          <Route path="admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="members" element={<AdminMembers />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  )
}

export default App
