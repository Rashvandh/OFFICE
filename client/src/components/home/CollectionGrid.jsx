import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'hair-care',
    name: 'Hair Care',
    description: 'Traditional herbal hair oils and cleansers.',
    image: '/images/collections/hair-care.jpg',
    link: '/products?category=Hair+Care',
  },
  {
    id: 'skin-care',
    name: 'Skin Care',
    description: 'Handmade aloe vera soaps and gentle care.',
    image: '/images/collections/skin-care.jpg',
    link: '/products?category=Soap',
  },
  {
    id: 'pure-herbs',
    name: 'Pure Herbs',
    description: 'Single-herb moringa, amla and botanical powders.',
    image: '/images/collections/pure-herbs.jpg',
    link: '/products?category=Pure+Herbs',
  },
  {
    id: 'herbal-wellness',
    name: 'Herbal Wellness',
    description: 'Daily formulations inspired by ashwagandha, triphala and moringa.',
    image: '/images/collections/herbal-wellness.jpg',
    link: '/products?category=Herbal+Wellness',
  },
  {
    id: 'traditional-formulations',
    name: 'Traditional Formulations',
    description: 'Authentic Siddha and Ayurveda preparations.',
    image: '/images/collections/traditional-formulations.jpg',
    link: '/products',
  },
];

export default function CollectionGrid() {
  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="border-b border-[#E8DFC5] bg-[#FEFBEA] py-14 sm:py-20">
      <div className="container-gramiyam grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column */}
        <div className="lg:col-span-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C02B0B]">
            OUR COLLECTIONS
          </p>
          <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-[#000000]">
            Shop by
            <br />
            Collection
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-[#4A453B]">
            Five herbal collections crafted for your everyday wellness.
          </p>
          <div className="mt-4 h-[1px] w-14 bg-[#C02B0B]" />

          <div className="mt-6 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollBy(-280)}
              aria-label="Scroll collections left"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DFC5] bg-[#FFFDF8] text-[#000000] transition hover:border-[#C02B0B] hover:text-[#C02B0B]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(280)}
              aria-label="Scroll collections right"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DFC5] bg-[#FFFDF8] text-[#000000] transition hover:border-[#C02B0B] hover:text-[#C02B0B]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Five Image-Led Collection Tiles */}
        <div className="lg:col-span-9">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
          >
            {COLLECTIONS.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group flex w-[210px] shrink-0 flex-col border border-[#E8DFC5] bg-[#F7F1D8]/55 transition hover:border-[#C02B0B] lg:w-auto"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F7F1D8]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-[#000000]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#4A453B]">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#C02B0B]/40 text-[#C02B0B] transition group-hover:bg-[#C02B0B] group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
