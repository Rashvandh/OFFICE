import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import NewsletterForm from '../common/NewsletterForm.jsx';
import { BotanicalDivider } from '../ui/BotanicalMotif.jsx';

const FOOTER_GROUPS = [
  {
    id: 'shop',
    title: 'Shop',
    links: [
      { label: 'Hair Care', to: '/products?category=Hair+Care' },
      { label: 'Skin Care', to: '/products?category=Soap' },
      { label: 'Pure Herbs', to: '/products?category=Pure+Herbs' },
      { label: 'Herbal Wellness', to: '/products?category=Herbal+Wellness' },
      { label: 'All Collections', to: '/collections' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'R&D', to: '/research' },
      { label: 'Journal', to: '/blogs' },
      { label: 'Store Locator', to: '/store-locator' },
      { label: 'Franchise', to: '/franchise' },
      { label: 'Careers', to: '/careers' },
      { label: 'Feed India', to: '/feed-india' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Track Order', to: '/track-order' },
      { label: 'Shipping Policy', to: '/shipping-policy' },
      { label: 'Cancellation & Refund', to: '/returns' },
    ],
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] = useState('shop');

  const toggleGroup = (id) => {
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  return (
    <footer className="bg-[var(--color-herbal)] pb-24 text-[var(--color-cream)] lg:pb-0">
      <div className="container-gramiyam py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-[var(--color-cream)] px-4 py-2.5"
            >
              <img
                src="/logo/gramiyam-logo.jpg"
                alt="GRAMIYAM — Tradition Renown"
                width="44"
                height="44"
                loading="lazy"
                className="h-11 w-auto object-contain mix-blend-multiply"
              />
              <div>
                <span className="block font-serif text-xl font-bold tracking-wider text-[var(--color-ink)]">
                  GRAMIYAM
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Tradition Renown
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-cream)]/80">
              Herbal Products, Siddha, Ayurveda, and Natural Wellness crafted in Tamil Nadu to honour traditional Indian botanical wisdom.
            </p>
            <p className="mt-3 text-xs tracking-wider text-[var(--color-gold)]">
              www.gramiyam.com
            </p>
          </div>

          {/* Mobile Accordion + Desktop Columns */}
          <div className="grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-y-0 md:border-y-0 md:gap-6 lg:col-span-5">
            {FOOTER_GROUPS.map((group) => {
              const isOpen = openGroup === group.id;
              return (
                <div key={group.id} className="py-3 md:py-0">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className="flex min-h-[44px] w-full items-center justify-between text-left font-serif text-lg font-medium text-[var(--color-cream)] md:hidden"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--color-gold)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <h3 className="hidden font-serif text-lg font-medium text-[var(--color-cream)] md:block">
                    {group.title}
                  </h3>

                  <ul
                    className={`mt-2 space-y-2 text-[13px] text-[var(--color-cream)]/75 md:mt-4 md:block ${
                      isOpen ? 'block pb-2' : 'hidden'
                    }`}
                  >
                    {group.links.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="inline-flex min-h-[36px] items-center transition hover:text-[var(--color-gold)] md:min-h-0"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg font-medium text-[var(--color-cream)]">
              Newsletter
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-cream)]/75">
              Subscribe for seasonal herbal notes, new launches, and updates from GRAMIYAM.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="dark" />
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-wider text-[var(--color-cream)]/70">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-[var(--color-gold)] md:min-h-0"
              >
                Instagram
              </a>
              <span className="self-center">•</span>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-[var(--color-gold)] md:min-h-0"
              >
                Facebook
              </a>
              <span className="self-center">•</span>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-[var(--color-gold)] md:min-h-0"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <BotanicalDivider tone="cream" className="my-8 opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 text-[11.5px] text-[var(--color-cream)]/70 sm:flex-row">
          <p>© {new Date().getFullYear()} GRAMIYAM — Tradition Renown. Crafted in Tamil Nadu, India.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-[var(--color-gold)]">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[var(--color-gold)]">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
