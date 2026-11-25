import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';
import { productCategories } from '../../data/siteData.js';

export default function Footer() {
  const categories = productCategories.filter((c) => c !== 'All').slice(0, 6);

  return (
    <footer className="border-t border-[#E9D8C5] bg-[#293C28] text-[#FFF9F1]">
      <div className="container-gramiyam py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <BrandLogo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#FFFAF2]/85">
              Botanical care and traditional wellness inspired by India’s Siddha and Ayurveda heritage.
            </p>
            <p className="mt-4 text-xs tracking-wide text-[#EFE3D1]">
              www.gramiyam.com
            </p>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg font-medium text-[#EFE3D1]">
              Shop
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-[#FFFAF2]/85">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[#EFE3D1] transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-medium text-[#EFE3D1]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FFFAF2]/85">
              <li><Link to="/about" className="hover:text-[#EFE3D1] transition">About</Link></li>
              <li><Link to="/research" className="hover:text-[#EFE3D1] transition">R&D</Link></li>
              <li><Link to="/blogs" className="hover:text-[#EFE3D1] transition">Journal</Link></li>
              <li><Link to="/store-locator" className="hover:text-[#EFE3D1] transition">Store Locator</Link></li>
              <li><Link to="/feed-india" className="hover:text-[#EFE3D1] transition">Feed India</Link></li>
              <li><Link to="/contact" className="hover:text-[#EFE3D1] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Policies & Social */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg font-medium text-[#EFE3D1]">
              Policies & Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FFFAF2]/85">
              <li><Link to="/track-order" className="hover:text-[#EFE3D1] transition">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-[#EFE3D1] transition">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#EFE3D1] transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#EFE3D1] transition">Terms of Use</Link></li>
              <li><Link to="/returns" className="hover:text-[#EFE3D1] transition">Return & Cancellation</Link></li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/15 pt-4 text-[11px] uppercase tracking-wider text-[#EFE3D1]/85">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              <span>•</span>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
              <span>•</span>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-[11px] text-[#FFFAF2]/70 sm:flex-row">
          <p>© {new Date().getFullYear()} GRAMIYAM — Tradition Renown. All rights reserved.</p>
          <p>Siddha & Ayurveda Herbal Wellness</p>
        </div>
      </div>
    </footer>
  );
}
