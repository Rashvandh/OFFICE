import HeroHeadline from './HeroHeadline.jsx';
import LifestyleImage from './LifestyleImage.jsx';
import FeaturedProductCard from './FeaturedProductCard.jsx';
import { BotanicalCornerPattern } from '../ui/BotanicalMotif.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function LifestyleHero({ catalogueProducts = [] }) {
  const ashwagandhaProduct = catalogueProducts.find(
    (p) => p.slug === 'ashwagandha-plus' || p._id === 'ashwagandha-plus'
  );

  return (
    <section
      aria-label="GRAMIYAM Herbal Wellness Hero"
      className="relative flex min-h-hero items-end overflow-x-clip border-b border-[var(--color-gold-soft)] bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-cream)] to-[var(--color-cream-soft)]/70 pt-4 sm:pt-6 lg:pt-8"
    >
      {/* Subtle Architectural Botanical Motif Accents */}
      <BotanicalCornerPattern className="absolute -left-6 bottom-6 hidden h-40 w-44 text-[var(--color-herbal)]/15 lg:block" />
      <BotanicalCornerPattern className="absolute -right-6 top-10 hidden h-44 w-48 rotate-180 text-[var(--color-herbal)]/15 lg:block" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-4">
          {/* Left Content + Overlapping Featured Product Card */}
          <Reveal className="relative z-20 pb-4 lg:col-span-6 lg:self-center lg:pb-12">
            <HeroHeadline />
            <div className="lg:-mr-10">
              <FeaturedProductCard product={ashwagandhaProduct} />
            </div>
          </Reveal>

          {/* Right Lifestyle Portrait Anchored Flush */}
          <Reveal delay={0.1} className="relative z-10 lg:col-span-6 lg:self-end">
            <LifestyleImage />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
