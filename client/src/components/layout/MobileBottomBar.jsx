import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Store, Search, ShoppingBag, User, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { SITE_CONFIG } from '../../content/siteContent.js';
import SearchOverlay from './SearchOverlay.jsx';

export default function MobileBottomBar() {
  const { count, openDrawer } = useCart();
  const { isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappPrefill
  )}`;

  return (
    <>
      {/* Floating WhatsApp Quick Enquiry Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
        className="fixed bottom-20 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3D2B] lg:bottom-6 lg:right-6"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </a>

      {/* Sticky Mobile Bottom Bar (< lg) */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)]/95 px-2 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        <div className="grid grid-cols-5 items-center gap-1 text-[11px] font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
              }`
            }
          >
            <Home className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
              }`
            }
          >
            <Store className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>Store</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg text-[var(--color-muted)]"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={openDrawer}
            className="relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg text-[var(--color-muted)]"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute right-3 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <NavLink
            to={isAuthenticated ? '/account' : '/login'}
            className={({ isActive }) =>
              `flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
              }`
            }
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>{isAuthenticated ? 'Account' : 'Login'}</span>
          </NavLink>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
