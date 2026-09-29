import { NavLink, Outlet, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: '📊', end: true },
  { label: 'Products', to: '/admin/products', icon: '🍷' },
  { label: 'Orders', to: '/admin/orders', icon: '📦' },
  { label: 'Bookings', to: '/admin/bookings', icon: '📅' },
  { label: 'Events', to: '/admin/events', icon: '🎉' },
  { label: 'Messages', to: '/admin/messages', icon: '💬' },
  { label: 'Club Members', to: '/admin/members', icon: '⭐' },
];

const AdminLayout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal flex flex-col fixed top-0 left-0 bottom-0 z-40">
        <div className="p-6 border-b border-cream/10">
          <Link to="/admin" className="block">
            <span className="font-serif text-base font-semibold tracking-widest uppercase text-cream block">Campos Family</span>
            <span className="font-sans text-xs tracking-widest-xl uppercase text-gold block">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Admin navigation">
          {adminNav.map(({ label, to, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-sans text-sm transition-all duration-200
                ${isActive
                  ? 'bg-gold/20 text-gold'
                  : 'text-cream/60 hover:text-cream hover:bg-cream/5'
                }`
              }
            >
              <span className="text-base" aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-cream/10">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-cream/50 font-sans">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-cream/30 font-sans">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 text-center px-3 py-2 text-xs font-sans text-cream/60 hover:text-cream hover:bg-cream/5 rounded transition-colors">
              View Site
            </Link>
            <button onClick={logout} className="flex-1 text-center px-3 py-2 text-xs font-sans text-cream/60 hover:text-wine hover:bg-wine/5 rounded transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 overflow-y-auto" id="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
