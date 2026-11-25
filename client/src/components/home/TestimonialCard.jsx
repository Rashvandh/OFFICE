import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ review }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-softgrey bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? 'fill-gold text-gold' : 'text-softgrey'
              }`}
            />
          ))}
        </div>
        <Quote className="h-5 w-5 text-sage" />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/85">
        “{review.comment}”
      </p>

      <div className="mt-5 border-t border-softgrey pt-4">
        <p className="font-serif text-base font-medium text-forest">
          {review.author}
        </p>
        <p className="text-[11px] uppercase tracking-wider text-gold-dark">
          {review.product} {review.isSample ? '• Sample Review' : ''}
        </p>
      </div>
    </article>
  );
}
