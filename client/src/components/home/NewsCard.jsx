import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';

export default function NewsCard({ article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-softgrey bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/news/${article.slug}`} className="aspect-[16/10] overflow-hidden bg-cream">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
          <span className="text-gold-dark">{article.category}</span>
          <span className="inline-flex items-center gap-1 text-charcoal/55">
            <Calendar className="h-3 w-3" />
            {formatDate(article.date)}
          </span>
        </div>
        <Link to={`/news/${article.slug}`} className="mt-2 block">
          <h3 className="font-serif text-xl font-medium leading-snug text-forest group-hover:text-botanical">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal/75">
          {article.excerpt}
        </p>
        <Link
          to={`/news/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
