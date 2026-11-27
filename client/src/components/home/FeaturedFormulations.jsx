import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { BotanicalDivider } from '../ui/BotanicalMotif.jsx';
import ProductCard from './ProductCard.jsx';

const FEATURED_PRODUCT_SPECS = [
  {
    slug: 'manmatharas',
    name: 'Manmatharas',
    cardDescription: 'Traditional herbal wellness formulation.',
    fallbackImage: '/images/gramiyam/manmatharas.jpg',
  },
  {
    slug: 'moringa',
    name: 'Moringa Tablets',
    cardDescription: 'Nutrient-rich moringa for everyday wellness.',
    fallbackImage: '/images/gramiyam/moringa-tablets.jpg',
  },
  {
    slug: 'ashwagandha-plus',
    name: 'Ashwagandha Plus',
    cardDescription: 'Herbal support for natural vitality.',
    fallbackImage: '/images/gramiyam/ashwagandha-plus.jpg',
  },
  {
    slug: 'triphala',
    name: 'Triphala Tablets',
    cardDescription: 'A classical blend for daily balance.',
    fallbackImage: '/images/gramiyam/triphala-tablets.jpg',
  },
  {
    slug: 'five-in-one-hair-oil',
    name: '5 in 1 Hair Oil',
    cardDescription: 'A complete herbal hair care solution.',
    fallbackImage: '/images/gramiyam/five-in-one-hair-oil.jpg',
  },
];

export default function FeaturedFormulations({ catalogueProducts = [] }) {
  const products = FEATURED_PRODUCT_SPECS.map((spec) => {
    const match = catalogueProducts.find(
      (item) => item.slug === spec.slug || item._id === spec.slug
    );
    return {
      _id: match?._id || spec.slug,
      slug: match?.slug || spec.slug,
      name: match?.name || spec.name,
      category: match?.category || 'Herbal Wellness',
      price: match?.price ?? null,
      image: match?.image || spec.fallbackImage,
      cardDescription: spec.cardDescription,
      ...(match || {}),
    };
  });

  if (!products.length) return null;

  return (
    <Section
      id="featured-formulations"
      ariaLabelledBy="featured-formulations-heading"
      surface="herbal"
    >
      <Container className="relative z-10">
        <Reveal className="mb-10 text-center sm:mb-12">
          <BotanicalDivider tone="cream" className="mb-3" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
            FEATURED FORMULATIONS
          </p>
          <h2
            id="featured-formulations-heading"
            className="mx-auto mt-3 max-w-4xl font-serif text-fluid-h2 font-semibold text-[var(--color-cream)]"
          >
            Selected Preparations from{' '}
            <span className="italic text-[var(--color-gold)]">GRAMIYAM</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-cream)]/75">
            Honest Tamil Siddha and Ayurveda preparations bottled with respect for traditional craft.
          </p>
        </Reveal>

        {/* Responsive Auto-Fit / Column Grid */}
        <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
