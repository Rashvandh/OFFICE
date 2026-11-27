import { useRef, useState } from 'react';
import CollectionNavigation from './CollectionNavigation.jsx';
import CollectionCarousel from './CollectionCarousel.jsx';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { BotanicalCornerPattern } from '../ui/BotanicalMotif.jsx';

const COLLECTIONS = [
  {
    id: 'hair-care',
    iconKey: 'hair-care',
    title: 'Hair Care',
    description: 'Traditional herbal hair oils and cleansers.',
    image: '/images/collections/hair-care.jpg',
    link: '/products?category=Hair+Care',
  },
  {
    id: 'skin-care',
    iconKey: 'skin-care',
    title: 'Skin Care',
    description: 'Handmade aloe vera soaps and gentle care.',
    image: '/images/collections/skin-care.jpg',
    link: '/products?category=Soap',
  },
  {
    id: 'pure-herbs',
    iconKey: 'pure-herbs',
    title: 'Pure Herbs',
    description: 'Single-herb moringa, amla and botanical powders.',
    image: '/images/collections/pure-herbs.jpg',
    link: '/products?category=Pure+Herbs',
  },
  {
    id: 'herbal-wellness',
    iconKey: 'herbal-wellness',
    title: 'Herbal Wellness',
    description:
      'Daily formulations inspired by ashwagandha, triphala and moringa.',
    image: '/images/collections/herbal-wellness.jpg',
    link: '/products?category=Herbal+Wellness',
  },
  {
    id: 'traditional-formulations',
    iconKey: 'traditional-formulations',
    title: 'Traditional Formulations',
    description: 'Authentic Siddha and Ayurveda preparations.',
    image: '/images/collections/traditional-formulations.jpg',
    link: '/products',
  },
];

export default function CollectionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? COLLECTIONS.length - 1 : prev - 1));
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === COLLECTIONS.length - 1 ? 0 : prev + 1));
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Section id="collections" ariaLabelledBy="collections-heading" surface="cream">
      {/* Signature Hand-Drawn Botanical Leaf Motif */}
      <BotanicalCornerPattern className="absolute -left-4 top-2 hidden h-36 w-40 text-[var(--color-herbal)]/15 lg:block" />
      <BotanicalCornerPattern className="absolute -right-4 bottom-2 hidden h-36 w-40 rotate-180 text-[var(--color-herbal)]/15 lg:block" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-8">
          {/* Left Introduction Panel */}
          <Reveal className="shrink-0 lg:w-[22%]">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                OUR COLLECTIONS
              </span>
              <span className="h-[1px] w-7 bg-[var(--color-accent)]/50" aria-hidden="true" />
            </div>

            <h2
              id="collections-heading"
              className="mt-3 font-serif text-fluid-h2 font-bold text-[var(--color-ink)]"
            >
              Shop by{' '}
              <span className="italic text-[var(--color-accent)]">
                Collection
              </span>
            </h2>

            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-[var(--color-muted)]">
              Five herbal collections crafted for your everyday wellness. Swipe or explore by ritual.
            </p>

            <div className="my-5 h-[2px] w-12 bg-[var(--color-accent)]" aria-hidden="true" />

            <CollectionNavigation onPrev={handlePrev} onNext={handleNext} />
          </Reveal>

          {/* Right Collection Row / Swipeable Snap Carousel */}
          <div className="min-w-0 flex-1">
            <CollectionCarousel
              collections={COLLECTIONS}
              activeIndex={activeIndex}
              scrollRef={carouselRef}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
