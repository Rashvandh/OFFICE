import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

const COLLECTION_CARDS = [
  {
    id: 'five-in-one-hair-oil',
    slug: 'five-in-one-hair-oil',
    category: 'Hair Care',
    name: '5-in-1 Hair Oil',
    image: '/images/gramiyam/five-in-one-hair-oil.jpg',
    to: '/products/five-in-one-hair-oil',
  },
  {
    id: 'moringa-tablets',
    slug: 'moringa',
    category: 'Pure Herbs',
    name: 'Moringa Tablets',
    image: '/images/gramiyam/moringa-tablets.jpg',
    to: '/products/moringa',
  },
  {
    id: 'ashwagandha-plus',
    slug: 'ashwagandha-plus',
    category: 'Herbal Wellness',
    name: 'Ashwagandha Plus',
    image: '/images/gramiyam/ashwagandha-plus.jpg',
    to: '/products/ashwagandha-plus',
  },
];

export default function EditorialCollectionSection({ catalogueProducts = [] }) {
  const getVerifiedPrice = (slug) => {
    const match = catalogueProducts.find(
      (p) => p.slug === slug || p._id === slug
    );
    if (match && typeof match.price === 'number' && !Number.isNaN(match.price)) {
      return formatCurrency(match.price);
    }
    return null;
  };

  return (
    <section className="bg-[#F5EBDD] py-14 sm:py-20">
      <div className="mx-auto w-[92%] max-w-[1440px] rounded-[12px] border border-[#E5D9C9] bg-[#F6EFE2] p-6 shadow-soft sm:w-[90%] sm:p-10 lg:p-14">
        {/* TOP SECTION: 40% Left Editorial Heading + 60% Right Three Cards */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Column (~40% -> 5 of 12 cols) */}
          <div className="lg:col-span-5 lg:pr-6">
            <h2 className="font-serif text-4xl font-medium leading-[1.06] text-[#29251F] sm:text-5xl lg:text-[54px]">
              You might be
              <br />
              <span className="italic text-[#46583A]">interested.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#29251F]/80">
              Explore traditional Siddha and Ayurveda-inspired collections, thoughtfully presented for everyday living.
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

          {/* Right Column (~60% -> 7 of 12 cols): 3 Vertical Product/Collection Cards */}
          <div className="lg:col-span-7">
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
              {COLLECTION_CARDS.map((card) => {
                const verifiedPrice = getVerifiedPrice(card.slug);
                return (
                  <Link
                    key={card.id}
                    to={card.to}
                    className="group flex w-[230px] shrink-0 flex-col sm:w-auto"
                  >
                    <div className="aspect-[3/3.6] overflow-hidden rounded-sm border border-[#E5D9C9] bg-[#F2E8D7] p-2.5">
                      <img
                        src={card.image}
                        alt={`${card.name} — GRAMIYAM ${card.category}`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#46583A]">
                      {card.category}
                    </span>
                    <h3 className="mt-0.5 font-serif text-xl font-medium text-[#29251F] transition group-hover:text-[#B73524]">
                      {card.name}
                    </h3>
                    {verifiedPrice && (
                      <p className="mt-0.5 text-xs font-medium text-[#29251F]/80">
                        {verifiedPrice}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 48% Lifestyle Image + 26% Story + 26% Product Visual */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-sm border border-[#E5D9C9] bg-[#F2E8D7] lg:mt-16 lg:grid-cols-[48fr_26fr_26fr]">
          {/* Left: Lifestyle / Campaign Photography (48%) */}
          <div className="min-h-[240px] overflow-hidden bg-[#2F422C] lg:min-h-[320px]">
            <img
              src="/images/gramiyam/five-in-one-hair-oil.jpg"
              alt="GRAMIYAM 5-in-1 Hair Oil lifestyle campaign"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Centre: Product Story (26%) */}
          <div className="flex flex-col justify-center bg-[#F2E8D7] p-7 sm:p-9">
            <h3 className="font-serif text-3xl font-medium leading-[1.08] text-[#29251F] sm:text-4xl">
              Tradition
              <br />
              in every ritual.
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-[#29251F]/80 sm:text-sm">
              Discover GRAMIYAM’s botanical preparations, inspired by traditional Siddha and Ayurveda knowledge and presented for modern everyday routines.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-sm bg-[#2F422C] px-5 py-3 text-[11px] font-semibold uppercase tracking-[2px] text-[#F6EFE2] transition hover:bg-[#46583A]"
              >
                EXPLORE GRAMIYAM
              </Link>
              {getVerifiedPrice('aloe-vera-soap') && (
                <span className="text-sm font-medium text-[#29251F]">
                  {getVerifiedPrice('aloe-vera-soap')}
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Detail Visual (26%) */}
          <div className="flex items-center justify-center border-t border-[#E5D9C9] bg-[#FFF9F1] p-6 lg:border-l lg:border-t-0">
            <img
              src="/images/gramiyam/aloe-vera-soap.jpg"
              alt="GRAMIYAM Aloe Vera Soap close-up"
              loading="lazy"
              className="max-h-[260px] w-full object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
