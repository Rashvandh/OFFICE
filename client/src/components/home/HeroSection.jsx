import { useEffect, useState } from 'react';
import HeroContent from './HeroContent.jsx';
import HeroProductShowcase from './HeroProductShowcase.jsx';

const HERO_SLIDES = [
  {
    id: 'aloe-vera-soap',
    image: '/images/gramiyam/aloe-vera-soap.jpg',
    alt: "GRAMIYAM Aloe Vera Herbal Soap — Nature's Goodness in Every Wash",
    link: '/products/aloe-vera-soap',
  },
  {
    id: 'five-in-one-hair-oil',
    image: '/images/gramiyam/five-in-one-hair-oil.jpg',
    alt: 'GRAMIYAM 5-in-1 Hair Oil — Back to the roots, 35 natural herbs for ultimate hair care',
    link: '/products/five-in-one-hair-oil',
  },
  {
    id: 'collection-banner',
    image: '/images/gramiyam/product-collection-banner.jpg',
    alt: 'GRAMIYAM 5 in 1 Hair Oil, Ashwagandha Plus, Moringa Tablets, and Triphala Tablets',
    link: '/collections',
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="GRAMIYAM Herbal Wellness Hero"
      className="border-b border-[#E8DFC5] bg-[#FEFBEA] py-8 sm:py-12 lg:py-14"
    >
      <div className="container-gramiyam">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Left Content (~40%) */}
          <div className="w-full lg:w-[40%] lg:shrink-0">
            <HeroContent
              totalSlides={HERO_SLIDES.length}
              activeIndex={activeIndex}
              onSelectSlide={setActiveIndex}
            />
          </div>

          {/* Right Aloe Vera Product Showcase (~60%) */}
          <div className="w-full lg:w-[60%]">
            <HeroProductShowcase slide={HERO_SLIDES[activeIndex]} />
          </div>
        </div>
      </div>
    </section>
  );
}
