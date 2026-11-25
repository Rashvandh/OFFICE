import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { WELLNESS_QUIZ_QUESTIONS } from '../../data/siteData.js';
import { PrimaryButton, SecondaryButton } from '../common/Buttons.jsx';

const RESULT_RECOMMENDATIONS = {
  'Pure Herbs': {
    title: 'Pure Herbs & Grounding Rituals',
    summary:
      'You lean toward simple, time-honoured botanical powders and tablets such as Ashwagandha Plus, Moringa, or Triphala to complement your daily routine.',
    to: '/products?category=Pure+Herbs',
  },
  'Hair Care': {
    title: 'Botanical Hair & Scalp Care',
    summary:
      'Traditional herbal oils such as Pathu Thalai Thailam paired with gentle botanical cleansing may suit your interest in unhurried hair care rituals.',
    to: '/products?category=Hair+Care',
  },
  'Body Care': {
    title: 'Soothing Botanical Skin & Body Care',
    summary:
      'Plant-based soaps and cooling gels such as Kuppaimeni Soap and Aloe Vera Gel align with your preference for gentle daily personal care.',
    to: '/products?category=Body+Care',
  },
  'Herbal Wellness': {
    title: 'Classical Siddha & Ayurveda Exploration',
    summary:
      'Discover classical formulations like Sarva Lakshana and Manmatharas alongside our R&D overview of Vata, Pitta, and Kapha principles.',
    to: '/research',
  },
};

export default function WellnessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const total = WELLNESS_QUIZ_QUESTIONS.length;
  const currentQuestion = WELLNESS_QUIZ_QUESTIONS[step];
  const selectedOption = answers[currentQuestion?.id];

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const getRecommendation = () => {
    const counts = {};
    Object.values(answers).forEach((opt) => {
      if (opt?.tag) counts[opt.tag] = (counts[opt.tag] || 0) + 1;
    });
    const topTag =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Pure Herbs';
    return RESULT_RECOMMENDATIONS[topTag] || RESULT_RECOMMENDATIONS['Pure Herbs'];
  };

  const progress = showResult ? 100 : Math.round(((step + 1) / total) * 100);
  const recommendation = getRecommendation();

  return (
    <div className="rounded-sm border border-softgrey bg-white p-6 shadow-soft sm:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          <Sparkles className="h-3.5 w-3.5" />
          Informational Wellness Discovery
        </span>
        <span className="text-xs font-medium text-charcoal/65">
          {showResult ? 'Completed' : `Question ${step + 1} of ${total}`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full bg-forest transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-serif text-2xl font-medium text-forest sm:text-3xl">
              {currentQuestion.question}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`rounded-sm border p-4 text-left text-sm transition-all ${
                      isSelected
                        ? 'border-forest bg-forest text-ivory shadow-sm'
                        : 'border-softgrey bg-ivory/60 text-charcoal hover:border-forest/50 hover:bg-cream/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <SecondaryButton
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </SecondaryButton>

              <PrimaryButton onClick={handleNext} disabled={!selectedOption}>
                {step === total - 1 ? 'See Suggestions' : 'Next'}
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Suggested Exploration
            </p>
            <h3 className="font-serif text-3xl font-medium text-forest">
              {recommendation.title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-charcoal/80">
              {recommendation.summary}
            </p>
            <p className="rounded-sm border-l-2 border-gold bg-cream/70 px-4 py-3 text-xs text-charcoal/75">
              Note: This quiz is purely informational to help you browse Gramiyam’s wellness categories. It does not diagnose medical conditions or prescribe treatment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton to={recommendation.to}>
                Explore Suggested Category
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
              <SecondaryButton onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5" />
                Retake Quiz
              </SecondaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
