import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { ANNOUNCEMENTS } from '../../data/siteData.js';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (dismissed || ANNOUNCEMENTS.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dismissed]);

  if (dismissed || ANNOUNCEMENTS.length === 0) return null;

  const current = ANNOUNCEMENTS[index];

  return (
    <div className="relative z-40 border-b border-softgrey bg-cream text-forest">
      <div className="container-gramiyam flex min-h-[36px] items-center justify-between gap-4 py-1.5 text-[11px] tracking-wide">
        <div className="hidden w-6 sm:block" />
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          <span className="font-medium text-charcoal">{current.text}</span>
          {current.link && (
            <Link
              to={current.link}
              className="inline-flex items-center gap-0.5 font-semibold text-forest underline-offset-4 hover:text-botanical hover:underline"
            >
              {current.cta}
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-charcoal/70 transition hover:bg-forest/10 hover:text-forest"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
