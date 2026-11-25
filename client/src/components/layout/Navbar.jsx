import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import MegaMenu from './MegaMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchOverlay from './SearchOverlay.jsx';

const NAV_LINKS = [
  { label: 'Shop', to: '/products' },
  { label: 'Categories', to: '/products?view=categories', hasMega: true },
  { label: 'About', to: '/about' },
  { label: 'R&D', to: '/research' },
  { label: 'Journal', to: '/blogs' },
  { label: 'Account', to: '/account' },
];

export default function Navbar() {
  const { count, openDrawer } = useCart();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={`sticky top-0 z-30 border-b border-[#E9D8C5] bg-[#FFF9F1]/95 text-[#29251F] backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container-gramiyam flex h-20 items-center justify-between gap-4">
          {/* Left: Official GRAMIYAM Logo + Siddha & Ayurveda */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[#29251F] hover:bg-[#F5EBDD] hover:text-[#B93627] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo/gramiyam-logo.jpg"
                alt="GRAMIYAM — Siddha & Ayurveda"
                className="h-11 w-auto object-contain mix-blend-multiply sm:h-12"
              />
              <span className="hidden border-l border-[#E9D8C5] pl-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#455B3C] sm:inline-block">
                Siddha & Ayurveda
              </span>
            </Link>
          </div>

          {/* Right: Uppercase Minimal Navigation + Search + Bag */}
          <div className="flex items-center gap-5 xl:gap-7">
            <nav aria-label="Main Navigation" className="hidden items-center gap-5 xl:gap-6 lg:flex">
              {NAV_LINKS.map((item) => {
                if (item.hasMega) {
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => setMegaOpen(true)}
                      className="relative"
                    >
                      <NavLink
                        to="/collections"
                        className="inline-flex items-center gap-1 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#29251F] transition hover:text-[#B93627]"
                      >
                        {item.label}
                        <ChevronDown className="h-3 w-3" />
                      </NavLink>
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition whitespace-nowrap ${
                        isActive
                          ? 'text-[#B93627] font-semibold'
                          : 'text-[#29251F] hover:text-[#B93627]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#29251F] transition hover:bg-[#F5EBDD] hover:text-[#B93627]"
              >
                <Search className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={openDrawer}
                aria-label={`Shopping bag (${count} items)`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#E9D8C5] bg-[#F5EBDD] px-3 text-[#29251F] transition hover:border-[#B93627] hover:text-[#B93627]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="text-xs font-semibold">{count}</span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
        </AnimatePresence>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
