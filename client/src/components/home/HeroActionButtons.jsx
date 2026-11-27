import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, MapPin } from 'lucide-react';

export default function HeroActionButtons() {
  return (
    <div className="flex w-full flex-col gap-3 sm:max-w-xs lg:max-w-none">
      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C02B0B] px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#9E2208] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFBEA]"
      >
        <span>Explore Our Products</span>
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>

      <Link
        to="/about"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C02B0B]/60 bg-[#FEFBEA] px-5 py-2.5 text-[12.5px] font-medium text-[#000000] transition hover:border-[#C02B0B] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
      >
        <PlayCircle className="h-4 w-4 text-[#C02B0B]" strokeWidth={1.75} />
        <span>Our Story</span>
      </Link>

      <Link
        to="/store-locator"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C02B0B]/60 bg-[#FEFBEA] px-5 py-2.5 text-[12.5px] font-medium text-[#000000] transition hover:border-[#C02B0B] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
      >
        <MapPin className="h-4 w-4 text-[#C02B0B]" strokeWidth={1.75} />
        <span>Find a Store</span>
      </Link>
    </div>
  );
}
