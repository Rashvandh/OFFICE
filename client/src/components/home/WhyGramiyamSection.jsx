import { ArrowRight, Leaf, Sprout, ShieldCheck, Sun } from 'lucide-react';
import { UI_CONTENT } from '../../content/siteContent.js';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';

const PILLAR_ICONS = {
  siddha: Leaf,
  botanicals: Sprout,
  quality: ShieldCheck,
  rituals: Sun,
};

export default function WhyGramiyamSection() {
  const copy = UI_CONTENT.en.whyGramiyam;

  return (
    <Section id="why-gramiyam" ariaLabelledBy="why-gramiyam-heading" surface="sand">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Heritage Photograph */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold-soft)] bg-[var(--color-cream)] p-3 shadow-soft">
              <img
                src="/images/collections/traditional-formulations.jpg"
                alt="Traditional stone mortar with Tamil Siddha herbs and roots"
                width="600"
                height="480"
                loading="lazy"
                className="aspect-[5/4] w-full rounded-2xl object-cover"
              />
              <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-[var(--color-muted)]">
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--color-herbal)]">
                  Tamil Nadu Heritage
                </span>
                <span>Est. Siddha Practice</span>
              </div>
            </div>
          </Reveal>

          {/* Right Why Gramiyam 4 Pillars */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                {copy.eyebrow}
              </p>
              <h2
                id="why-gramiyam-heading"
                className="mt-2 font-serif text-fluid-h2 font-bold text-[var(--color-ink)]"
              >
                {copy.titleLead}{' '}
                <span className="italic text-[var(--color-accent)]">
                  {copy.titleHighlight}
                </span>{' '}
                {copy.titleTail}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {copy.subtitle}
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {copy.pillars.map((pillar, idx) => {
                const Icon = PILLAR_ICONS[pillar.id] || Leaf;
                return (
                  <Reveal
                    key={pillar.id}
                    delay={idx * 0.06}
                    className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/45"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-herbal)]/10 text-[var(--color-herbal)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-3.5 font-serif text-lg font-semibold text-[var(--color-ink)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
                      {pillar.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-7">
              <Button to="/about" variant="herbal">
                <span>Discover Our Story</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
