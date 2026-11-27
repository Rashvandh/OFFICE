import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';

const JOURNAL_CARDS = [
  {
    slug: 'understanding-siddha-and-ayurveda-roots',
    category: 'HERITAGE',
    title: 'Siddha and Ayurveda: A Living Tradition',
    image: '/images/collections/traditional-formulations.jpg',
  },
  {
    slug: 'how-to-build-a-botanical-hair-care-ritual',
    category: 'WELLNESS',
    title: 'Everyday Botanical Rituals',
    image: '/images/collections/hair-care.jpg',
  },
  {
    slug: 'moringa-and-everyday-plant-nourishment',
    category: 'LIFESTYLE',
    title: 'Tradition, Presented for Today.',
    image: '/images/collections/pure-herbs.jpg',
  },
];

export default function JournalSection() {
  return (
    <Section id="journal" ariaLabelledBy="journal-heading" surface="cream">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Introduction */}
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              THE GRAMIYAM JOURNAL
            </p>
            <h2
              id="journal-heading"
              className="mt-2 font-serif text-fluid-h2 font-bold text-[var(--color-ink)]"
            >
              Notes on{' '}
              <span className="italic text-[var(--color-accent)]">Traditional</span>{' '}
              Wisdom.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              Insights, practices and stories from Siddha heritage, Tamil botanicals and mindful herbal living.
            </p>
            <div className="mt-6">
              <Button to="/blogs" variant="outlineDark">
                <span>Read the Journal</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          {/* Right Three Article Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-8">
            {JOURNAL_CARDS.map((card, idx) => (
              <Reveal key={card.slug} delay={idx * 0.07}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50">
                  <Link
                    to={`/blogs/${card.slug}`}
                    className="aspect-[16/10] overflow-hidden bg-[var(--color-cream-soft)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      width="360"
                      height="225"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {card.category}
                      </span>
                      <Link to={`/blogs/${card.slug}`} className="mt-1.5 block">
                        <h3 className="font-serif text-lg font-semibold leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                          {card.title}
                        </h3>
                      </Link>
                    </div>
                    <Link
                      to={`/blogs/${card.slug}`}
                      className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
