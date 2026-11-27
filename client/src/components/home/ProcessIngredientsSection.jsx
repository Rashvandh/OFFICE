import { UI_CONTENT } from '../../content/siteContent.js';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { ArrowRight } from 'lucide-react';

export default function ProcessIngredientsSection() {
  const copy = UI_CONTENT.en.process;

  return (
    <Section id="our-process" ariaLabelledBy="our-process-heading" surface="white">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Process Steps */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                {copy.eyebrow}
              </p>
              <h2
                id="our-process-heading"
                className="mt-2 font-serif text-fluid-h2 font-bold text-[var(--color-ink)]"
              >
                {copy.titleLead}{' '}
                <span className="italic text-[var(--color-accent)]">
                  {copy.titleHighlight}
                </span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {copy.description}
              </p>
            </Reveal>

            <div className="mt-7 space-y-4">
              {copy.steps.map((s, idx) => (
                <Reveal
                  key={s.step}
                  delay={idx * 0.08}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-cream)] p-4 shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-herbal)] font-serif text-sm font-bold text-[var(--color-cream)]">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                      {s.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-7">
              <Button to="/research" variant="outlineDark">
                <span>Explore R&amp;D Standards</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Key Botanicals & Texture Showcase */}
          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="rounded-3xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-soft)] p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/images/collections/pure-herbs.jpg"
                    alt="Single-herb botanical powders"
                    width="320"
                    height="240"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/images/collections/skin-care.jpg"
                    alt="Fresh Aloe Vera leaves and soap"
                    width="320"
                    height="240"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {copy.botanicals.map((herb) => (
                  <div
                    key={herb.name}
                    className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] px-4 py-3"
                  >
                    <p className="font-serif text-base font-semibold text-[var(--color-herbal)]">
                      {herb.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                      {herb.origin}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
