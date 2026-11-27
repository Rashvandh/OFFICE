import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import MegaMenu from './MegaMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchOverlay from './SearchOverlay.jsx';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Collections', to: '/collections', hasMega: true },
  { label: 'About', to: '/about' },
  { label: 'R&D', to: '/research' },
  { label: 'Journal', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
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
        className={`sticky top-0 z-30 border-b border-[#E8DFC5] bg-[#FEFBEA]/95 text-[#000000] backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container-gramiyam flex h-20 items-center justify-between gap-4">
          {/* Left: Mobile Toggle + GRAMIYAM Wordmark + Tradition Renown */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[#000000] hover:bg-[#F7F1D8] hover:text-[#C02B0B] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo/gramiyam-logo.jpg"
                alt="GRAMIYAM"
                className="h-10 w-auto object-contain mix-blend-multiply sm:h-11"
              />
              <div className="leading-none">
                <span className="block font-serif text-xl font-bold tracking-[0.06em] text-[#000000]">
                  GRAMIYAM<sup className="text-[9px] font-normal">®</sup>
                </span>
                <span className="mt-0.5 block text-[10px] font-medium tracking-[0.14em] text-[#C02B0B]">
                  — Tradition Renown —
                </span>
              </div>
            </Link>
          </div>

          {/* Centre Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((item) => {
              if (item.hasMega) {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setMegaOpen(true)}
                    className="relative"
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 py-2 text-xs font-medium transition ${
                          isActive
                            ? 'border-b-2 border-[#C02B0B] text-[#C02B0B]'
                            : 'text-[#000000] hover:text-[#C02B0B]'
                        }`
                      }
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </NavLink>
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `py-2 text-xs font-medium transition whitespace-nowrap ${
                      isActive
                        ? 'border-b-2 border-[#C02B0B] text-[#C02B0B]'
                        : 'text-[#000000] hover:text-[#C02B0B]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions: Search, Account, Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#000000] transition hover:bg-[#F7F1D8] hover:text-[#C02B0B]"
            >
              <Search className="h-4 w-4" />
            </button>

            <Link
              to="/account"
              aria-label="Customer account"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#000000] transition hover:bg-[#F7F1D8] hover:text-[#C02B0B]"
            >
              <User className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Shopping bag (${count} items)`}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#000000] transition hover:bg-[#F7F1D8] hover:text-[#C02B0B]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C02B0B] text-[9px] font-bold text-white">
                {count}
              </span>
            </button>
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
