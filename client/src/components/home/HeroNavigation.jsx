import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Menu, User, LogIn, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { UI_CONTENT } from '../../content/siteContent.js';
import MobileMenu from '../layout/MobileMenu.jsx';
import SearchOverlay from '../layout/SearchOverlay.jsx';

export default function HeroNavigation() {
  const { count, openDrawer } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navCopy = UI_CONTENT.en.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-cream)]/92 py-1.5 backdrop-blur-md'
            : 'bg-[var(--color-cream)]/85 py-3 backdrop-blur-sm'
        }`}
      >
        <div className="container-gramiyam">
          <div
            className={`flex items-center justify-between gap-2 rounded-full border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] transition-all duration-300 ${
              scrolled
                ? 'px-3.5 py-1.5 shadow-[0_10px_28px_-12px_rgba(23,22,20,0.16)] sm:px-5'
                : 'px-3.5 py-2 shadow-[0_8px_24px_-12px_rgba(23,22,20,0.10)] sm:px-6'
            }`}
          >
            {/* Left: Official GRAMIYAM Logo + Tagline */}
            <Link
              to="/"
              className="flex min-h-[44px] shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              <img
                src="/logo/gramiyam-logo.jpg"
                alt="GRAMIYAM"
                width="40"
                height="40"
                className={`w-auto object-contain mix-blend-multiply transition-all duration-300 ${
                  scrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-10'
                }`}
              />
              <div className="leading-none">
                <span className="block font-serif text-base font-bold tracking-[0.06em] text-[var(--color-ink)] sm:text-xl">
                  GRAMIYAM<sup className="text-[9px] font-normal">®</sup>
                </span>
                <span className="mt-0.5 block text-[9px] font-medium tracking-[0.14em] text-[var(--color-accent)] sm:text-[9.5px]">
                  — Tradition Renown —
                </span>
              </div>
            </Link>

            {/* Centre: Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden items-center gap-3.5 xl:flex xl:gap-5"
            >
              {navCopy.links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `whitespace-nowrap py-1.5 text-[12.5px] font-medium transition-colors ${
                      isActive
                        ? 'border-b-2 border-[var(--color-accent)] font-semibold text-[var(--color-accent)]'
                        : 'text-[var(--color-ink)]/85 hover:text-[var(--color-accent)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right: Search + Login (visible on mobile & desktop) + Cart + Desktop Shop Now + Mobile Hamburger */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition hover:bg-[var(--color-cream-soft)] hover:text-[var(--color-accent)]"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>

              <Link
                to={isAuthenticated ? '/account' : '/login'}
                aria-label={isAuthenticated ? 'My account' : 'Login to your account'}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-gold-soft)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {isAuthenticated ? (
                  <>
                    <User className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.85} />
                    <span className="hidden sm:inline">
                      {user?.name?.split(' ')[0] || navCopy.account}
                    </span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.85} />
                    <span className="text-[11.5px] sm:text-[12px]">{navCopy.login}</span>
                  </>
                )}
              </Link>

              <button
                type="button"
                onClick={openDrawer}
                aria-label={`Shopping bag with ${count} items`}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition hover:bg-[var(--color-cream-soft)] hover:text-[var(--color-accent)]"
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              </button>

              {/* Shop Now visible on desktop; lives inside mobile slide-in drawer on < xl */}
              <Link
                to="/products"
                className="hidden min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[12px] font-semibold text-white shadow-xs transition hover:bg-[var(--color-accent-hover)] xl:inline-flex"
              >
                <span>{navCopy.shopNow}</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition hover:bg-[var(--color-cream-soft)] hover:text-[var(--color-accent)] xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navCopy.links}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
