import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ item }) {
  return (
    <Link
      to={item.link}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-[#E5D9C9] bg-[#FFFAF2] transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#F2E8D7]">
        <img
          src={item.image}
          alt={item.name || item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {item.subtitle && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B93627]">
            {item.subtitle}
          </span>
        )}
        <h3 className="mt-1.5 font-serif text-xl font-medium text-[#29251F]">
          {item.name || item.title}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-[#777064]">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B93627] group-hover:text-[#8F2A1D]">
          EXPLORE
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
