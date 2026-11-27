import { UI_CONTENT } from '../../content/siteContent.js';
import Section from '../ui/Section.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import NewsletterForm from '../common/NewsletterForm.jsx';

export default function NewsletterSection() {
  const copy = UI_CONTENT.en.newsletter;

  return (
    <Section surface="sand" ariaLabelledBy="newsletter-section-heading">
      <Container>
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] p-6 text-center shadow-soft sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            {copy.eyebrow}
          </p>
          <h2
            id="newsletter-section-heading"
            className="mt-2 font-serif text-fluid-h2 font-bold text-[var(--color-ink)]"
          >
            {copy.titleLead}{' '}
            <span className="italic text-[var(--color-accent)]">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-muted)]">
            {copy.description}
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <NewsletterForm variant="light" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
