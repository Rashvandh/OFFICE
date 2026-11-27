import { useRef } from 'react';
import CollectionCard from './CollectionCard.jsx';

export default function CollectionCarousel({
  collections,
  activeIndex = 0,
  scrollRef,
}) {
  const internalRef = useRef(null);
  const trackRef = scrollRef || internalRef;

  return (
    <div className="w-full">
      {/* Desktop: 5 equal-width cards in one horizontal row */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            isHighlighted={activeIndex === index}
          />
        ))}
      </div>

      {/* Tablet & Mobile: Smooth swipeable horizontal carousel */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 no-scrollbar lg:hidden"
      >
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-[32%]"
          >
            <CollectionCard
              collection={collection}
              isHighlighted={activeIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
