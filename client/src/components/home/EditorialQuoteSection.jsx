import { Quote } from 'lucide-react';
import { UI_CONTENT } from '../../content/siteContent.js';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { BotanicalDivider } from '../ui/BotanicalMotif.jsx';

export default function EditorialQuoteSection() {
  const copy = UI_CONTENT.en.quoteAndTestimonials;

  return (
    <Section surface="herbal" ariaLabelledBy="editorial-quote-heading">
      <Container>
        {/* Bold Statement / Editorial Quote */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <BotanicalDivider tone="cream" className="mb-5" />
          <blockquote
            id="editorial-quote-heading"
            className="font-serif text-2xl font-medium italic leading-snug text-[var(--color-cream)] sm:text-4xl lg:text-[40px]"
          >
            {copy.quote}
          </blockquote>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
            — {copy.attribution}
          </p>
        </Reveal>

        {/* Clearly Marked Sample Testimonials */}
        <div className="mt-14 border-t border-white/15 pt-12">
          <Reveal className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              {copy.testimonialsEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-fluid-h2 font-semibold text-[var(--color-cream)]">
              {copy.testimonialsTitleLead}{' '}
              <span className="italic text-[var(--color-gold)]">
                {copy.testimonialsTitleHighlight}
              </span>
            </h2>
            <p className="mt-1.5 text-xs text-[var(--color-cream)]/65">
              {copy.sampleDisclaimer}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {copy.testimonials.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={idx * 0.08}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xs"
              >
                <div>
                  <Quote className="h-5 w-5 text-[var(--color-gold)] opacity-80" />
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/90">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3.5 text-xs">
                  <p className="font-semibold text-[var(--color-cream)]">
                    {item.author}
                  </p>
                  <p className="text-[var(--color-gold)]/90">
                    {item.location} • {item.product} (Sample)
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
