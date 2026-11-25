import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-charcoal/65">
      <Link to="/" className="hover:text-forest transition-colors">
        Home
      </Link>
      {items.map((item, idx) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-charcoal/40" />
          {item.to && idx < items.length - 1 ? (
            <Link to={item.to} className="hover:text-forest transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-forest">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
