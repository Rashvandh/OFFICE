import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-[#C02B0B] text-white">
      <div className="container-gramiyam flex min-h-[36px] items-center justify-between gap-4 py-1.5 text-[11px] tracking-wide">
        <div className="hidden w-16 sm:block" />
        <p className="flex items-center justify-center gap-2 text-center font-normal text-white/95">
          <Leaf className="h-3.5 w-3.5 shrink-0 text-white/85" />
          <span>
            Franchise Enquiries Open — Bring{' '}
            <strong className="font-semibold">GRAMIYAM</strong> Herbal Wellness to Your Community.
          </span>
        </p>
        <Link
          to="/franchise"
          className="shrink-0 font-semibold text-white underline-offset-4 hover:underline"
        >
          Apply Now →
        </Link>
      </div>
    </div>
  );
}
