import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SHOP_BY_COLLECTION } from '../data/siteData.js';

const FEATURED_DETAIL_IMAGES = [
  {
    src: '/images/gramiyam/aloe-vera-soap.jpg',
    alt: 'GRAMIYAM Aloe Vera Soap detail',
    to: '/products/aloe-vera-soap',
  },
  {
    src: '/images/gramiyam/moringa-tablets.jpg',
    alt: 'GRAMIYAM Moringa Tablets detail',
    to: '/products/moringa',
  },
  {
    src: '/images/gramiyam/ashwagandha-plus.jpg',
    alt: 'GRAMIYAM Ashwagandha Plus detail',
    to: '/products/ashwagandha-plus',
  },
];

export default function Collections() {
  const [detailIndex, setDetailIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDetailIndex((i) => (i + 1) % FEATURED_DETAIL_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const activeDetail = FEATURED_DETAIL_IMAGES[detailIndex];

  return (
    <main className="bg-[#EDE2D1]/45 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-[92%] max-w-[1440px] rounded-[16px] border border-[#E5D9C9] bg-[#F5EDDF] p-6 shadow-soft sm:w-[90%] sm:p-10 lg:p-14">
        {/* TOP SECTION: 30% Left Editorial Heading + 70% Right Five Collections */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[30fr_70fr] lg:items-start lg:gap-10">
          {/* Left Column (30%) */}
          <div>
            <h1 className="font-serif text-4xl font-medium leading-[1.06] text-[#29251F] sm:text-5xl lg:text-[52px]">
              You might be
              <br />
              <span className="italic text-[#46583A]">interested.</span>
            </h1>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#29251F]/80">
              Discover GRAMIYAM’s traditional Siddha and Ayurveda-inspired collections, thoughtfully presented for modern living.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="group inline-flex items-center gap-4 border-b border-[#29251F] pb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#29251F] transition hover:border-[#B73524] hover:text-[#B73524]"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column (70%): All Five GRAMIYAM Collections */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
            {SHOP_BY_COLLECTION.map((col) => (
              <article key={col.id} className="group flex flex-col">
                <Link
                  to={col.link}
                  className="block aspect-[4/3] overflow-hidden rounded-sm border border-[#E5D9C9] bg-[#EDE2D1]"
                >
                  <img
                    src={col.image}
                    alt={`${col.name} — GRAMIYAM collection`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <Link to={col.link} className="mt-3 block">
                  <h2 className="font-serif text-xl font-medium text-[#29251F] transition group-hover:text-[#B73524]">
                    {col.name}
                  </h2>
                </Link>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-[#29251F]/70">
                  {col.description}
                </p>
                <Link
                  to={col.link}
                  className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[2px] text-[#B73524] hover:text-[#2F422C]"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* BOTTOM SECTION: Featured Collection Story (45% / 28% / 27%) */}
        <section className="mt-12 grid grid-cols-1 overflow-hidden rounded-sm border border-[#E5D9C9] bg-[#EDE2D1] md:grid-cols-2 lg:mt-16 lg:grid-cols-[45fr_28fr_27fr]">
          {/* Left: 45% Lifestyle Photography */}
          <div className="min-h-[260px] overflow-hidden bg-[#2F422C] md:col-span-2 lg:col-span-1 lg:min-h-[340px]">
            <img
              src="/images/gramiyam/five-in-one-hair-oil.jpg"
              alt="GRAMIYAM 5-in-1 Hair Oil lifestyle campaign"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Centre: 28% Editorial Story */}
          <div className="flex flex-col justify-center bg-[#EDE2D1] p-7 sm:p-10">
            <h2 className="font-serif text-3xl font-medium leading-[1.08] text-[#29251F] sm:text-4xl">
              Nature’s wisdom.
              <br />
              Everyday rituals.
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-[#29251F]/80 sm:text-sm">
              Explore thoughtfully presented botanical preparations inspired by the heritage of Siddha and Ayurveda.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-sm bg-[#46583A] px-5 py-3 text-[11px] font-semibold uppercase tracking-[2px] text-[#F5EDDF] transition hover:bg-[#2F422C]"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>

          {/* Right: 27% Product Detail Visual */}
          <Link
            to={activeDetail.to}
            className="group flex items-center justify-center border-t border-[#E5D9C9] bg-[#F5EDDF] p-6 md:border-l md:border-t-0"
          >
            <img
              src={activeDetail.src}
              alt={activeDetail.alt}
              loading="lazy"
              className="max-h-[270px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        </section>
      </div>
    </main>
  );
}
