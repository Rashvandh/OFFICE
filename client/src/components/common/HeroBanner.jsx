import { motion } from 'framer-motion';

export default function HeroBanner({
  eyebrow,
  title,
  subtitle,
  image = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1800&q=80',
  children,
  compact = false,
}) {
  return (
    <section
      className={`relative overflow-hidden bg-charcoal text-ivory ${
        compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#241E1B]/90 via-[#34332C]/70 to-[#8F2A1D]/30"
        aria-hidden="true"
      />
      <div className="container-gramiyam relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-light">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl font-medium leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
