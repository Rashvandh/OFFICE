import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeritageSection() {
  return (
    <section className="border-b border-[#E8DFC5] bg-[#F7F1D8]/55">
      <div className="container-gramiyam grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <div className="overflow-hidden border border-[#E8DFC5]">
            <img
              src="/images/collections/traditional-formulations.jpg"
              alt="Traditional wooden mortar and pestle with herbal ingredients"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C02B0B]">
            OUR HERITAGE
          </p>
          <h2 className="mt-2 font-serif text-4xl font-medium leading-[1.1] text-[#000000] sm:text-5xl">
            Ancient Wisdom.
            <br />
            Thoughtfully Brought
            <br />
            <span className="italic text-[#C02B0B]">Into Everyday Life.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A453B] sm:text-base">
            Inspired by Siddha and Ayurveda knowledge, GRAMIYAM presents botanical formulations with respect for traditional practices and thoughtful quality standards.
          </p>
          <div className="mt-7">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-sm bg-[#C02B0B] px-6 py-3.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#9A2208]"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
