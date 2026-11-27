import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroProductShowcase({ slide }) {
  return (
    <div className="relative z-10 w-full">
      <Link
        to={slide.link}
        aria-label={slide.alt}
        className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.55 }}
            transition={{ duration: 0.35 }}
            className="block h-auto w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </AnimatePresence>

        {/* Seamless Edge Blending into Heritage Cream (#FEFBEA) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FEFBEA] to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#FEFBEA] to-transparent sm:w-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#FEFBEA] to-transparent sm:h-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#FEFBEA] to-transparent sm:h-10"
        />
      </Link>
    </div>
  );
}
