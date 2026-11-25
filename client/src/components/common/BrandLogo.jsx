import { Link } from 'react-router-dom';

export default function BrandLogo({ dark = false, size = 'md' }) {
  const heightClass = size === 'sm' ? 'h-11 sm:h-12' : 'h-14 sm:h-16';

  return (
    <Link
      to="/"
      className="inline-flex items-center focus-visible:outline-offset-4"
      aria-label="GRAMIYAM — Siddha & Ayurveda Home"
    >
      {dark ? (
        <div className="rounded-sm bg-ivory px-3 py-1.5 shadow-sm">
          <img
            src="/logo/gramiyam-logo.jpg"
            alt="GRAMIYAM — Siddha & Ayurveda"
            className={`${heightClass} w-auto object-contain mix-blend-multiply`}
          />
        </div>
      ) : (
        <img
          src="/logo/gramiyam-logo.jpg"
          alt="GRAMIYAM — Siddha & Ayurveda"
          className={`${heightClass} w-auto object-contain mix-blend-multiply`}
        />
      )}
    </Link>
  );
}
