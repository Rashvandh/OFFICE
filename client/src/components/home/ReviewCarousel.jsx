import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard.jsx';

export default function ReviewCarousel({ reviews = [] }) {
  const [startIndex, setStartIndex] = useState(0);

  if (!reviews.length) return null;

  const prev = () =>
    setStartIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setStartIndex((i) => (i + 1) % reviews.length);

  const visible = [];
  const count = Math.min(3, reviews.length);
  for (let i = 0; i < count; i += 1) {
    visible.push(reviews[(startIndex + i) % reviews.length]);
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {visible.map((review) => (
          <TestimonialCard key={review.id} review={review} />
        ))}
      </div>
      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous reviews"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-softgrey bg-white text-forest transition hover:border-forest"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next reviews"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-softgrey bg-white text-forest transition hover:border-forest"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
