import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { UI_CONTENT } from '../../content/siteContent.js';
import Button from '../ui/Button.jsx';

export default function HeroHeadline() {
  const copy = UI_CONTENT.en.hero;

  return (
    <div>
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-gold-soft)] bg-white/80 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[var(--color-herbal)]">
        <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
        <span>{copy.eyebrow}</span>
      </div>

      {/* Fluid Serif Headline with Italic Accent Word */}
      <h1 className="mt-4 font-serif text-fluid-h1 font-bold text-[var(--color-ink)]">
        {copy.headlineLead}{' '}
        <span className="italic text-[var(--color-accent)]">
          {copy.headlineHighlight}
        </span>
        <br />
        {copy.headlineTail}
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-[17px]">
        {copy.subheadline}
      </p>

      {/* Primary + Secondary CTAs */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button to="/products" variant="primary" size="lg">
          <span>{copy.primaryCta}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button to="/research" variant="outlineDark" size="lg">
          <span>{copy.secondaryCta}</span>
        </Button>
      </div>

      {/* Subtle Trust Strip */}
      <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-gold-soft)] pt-4 text-xs font-medium text-[var(--color-muted)]">
        {copy.trustItems.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[var(--color-herbal)]" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
