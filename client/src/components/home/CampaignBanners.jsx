import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CampaignBanners() {
  return (
    <section className="bg-[#F7F2E8] py-16 sm:py-24">
      <div className="container-gramiyam grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Banner 1: Hair Care (7 cols) */}
        <article className="group flex flex-col justify-between border border-[#E2D8C7] bg-[#FFFDF8] lg:col-span-7">
          <Link to="/products/five-in-one-hair-oil" className="block aspect-[16/9] overflow-hidden bg-[#EEE6D7]">
            <img
              src="/images/gramiyam/five-in-one-hair-oil.jpg"
              alt="GRAMIYAM 5-in-1 Hair Oil — Back to the Roots"
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D8C7] p-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#344B32]">
                Hair Care • 5-in-1 Hair Oil
              </span>
              <h3 className="mt-1 font-serif text-2xl font-normal text-[#292820]">
                Back to the Roots
              </h3>
            </div>
            <Link
              to="/products?category=Hair+Care"
              className="inline-flex items-center gap-2 border-b border-[#292820] pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#292820] transition hover:border-[#A94732] hover:text-[#A94732]"
            >
              Explore Hair Care
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>

        {/* Banner 2: Skin Care (5 cols) */}
        <article className="group flex flex-col justify-between border border-[#E2D8C7] bg-[#FFFDF8] lg:col-span-5">
          <Link to="/products/aloe-vera-soap" className="block flex-1 overflow-hidden bg-[#EEE6D7]">
            <img
              src="/images/gramiyam/aloe-vera-soap.jpg"
              alt="GRAMIYAM Aloe Vera Soap — Nature's Goodness in Every Wash"
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D8C7] p-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A94732]">
                Skin Care • Aloe Vera Soap
              </span>
              <h3 className="mt-1 font-serif text-2xl font-normal text-[#292820]">
                Nature’s Goodness in Every Wash
              </h3>
            </div>
            <Link
              to="/products?category=Soap"
              className="inline-flex items-center gap-2 border-b border-[#292820] pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#292820] transition hover:border-[#A94732] hover:text-[#A94732]"
            >
              Explore Skin Care
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
