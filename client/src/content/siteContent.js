// Bilingual-ready structured content dictionary (EN primary; TA keys ready for language switcher)
export const SITE_CONFIG = {
  brandName: 'GRAMIYAM',
  tagline: 'Tradition Renown',
  region: 'Tamil Nadu, India',
  whatsappNumber: '919000000000', // Placeholder WhatsApp enquiry number
  whatsappPrefill: 'Vanakkam GRAMIYAM! I would like to enquire about your herbal formulations.',
};

export const UI_CONTENT = {
  en: {
    nav: {
      links: [
        { label: 'Home', to: '/' },
        { label: 'About Us', to: '/about' },
        { label: 'R&D', to: '/research' },
        { label: 'Store', to: '/products' },
        { label: 'Store Locator', to: '/store-locator' },
        { label: 'Franchise', to: '/franchise' },
        { label: 'Careers', to: '/careers' },
        { label: 'Feed India', to: '/feed-india' },
      ],
      shopNow: 'Shop Now',
      login: 'Login',
      account: 'Account',
      searchPlaceholder: 'Search Siddha & Ayurveda formulations...',
    },
    hero: {
      eyebrow: 'SIDDHA & AYURVEDA • TAMIL NADU',
      headlineLead: 'Rooted in',
      headlineHighlight: 'Tradition.',
      headlineTail: 'Made for Today.',
      subheadline:
        'Live the healthy life you were meant to live with authentic botanical care and classical Indian formulations.',
      primaryCta: 'Shop Now',
      secondaryCta: 'Explore R&D',
      trustItems: [
        'Traditional Siddha formulations',
        'Natural botanical ingredients',
        'Crafted in Tamil Nadu',
      ],
    },
    whyGramiyam: {
      eyebrow: 'WHY GRAMIYAM',
      titleLead: 'Crafted with',
      titleHighlight: 'Integrity',
      titleTail: '& Care',
      subtitle:
        'Every preparation balances timeless Tamil Siddha and Ayurveda wisdom with clean, consistent quality.',
      pillars: [
        {
          id: 'siddha',
          title: 'Classical Siddha Heritage',
          description:
            'Formulations guided by centuries-old Tamil botanical treatises and time-honoured household practices.',
        },
        {
          id: 'botanicals',
          title: 'Whole Botanical Sourcing',
          description:
            'Moringa, Amla, Ashwagandha, Triphala, and fresh Aloe Vera sourced cleanly with minimal processing.',
        },
        {
          id: 'quality',
          title: 'Thoughtful Quality',
          description:
            'Disciplined batch preparation focused on purity, consistency, and honest ingredient disclosure.',
        },
        {
          id: 'rituals',
          title: 'Everyday Living',
          description:
            'Accessible oils, herbal soaps, and single-herb tablets made for modern household routines.',
        },
      ],
    },
    process: {
      eyebrow: 'OUR PROCESS & BOTANICALS',
      titleLead: 'From Soil to',
      titleHighlight: 'Formulation',
      description:
        'Our preparations preserve natural plant vitality through patient shade-drying, cold-infusion oils, and careful grinding.',
      steps: [
        {
          step: '01',
          name: 'Botanical Selection',
          detail: 'Whole leaves, roots, and fruits inspected for freshness and maturity.',
        },
        {
          step: '02',
          name: 'Traditional Preparation',
          detail: 'Slow decoctions, sun and shade drying, and gentle stone-milling.',
        },
        {
          step: '03',
          name: 'Clean Packaging',
          detail: 'Hygienically sealed jars and amber glass bottles built to protect potency.',
        },
      ],
      botanicals: [
        { name: 'Ashwagandha', origin: 'Root vitality & balance' },
        { name: 'Moringa', origin: 'Tamil Nadu drumstick leaf' },
        { name: 'Triphala', origin: 'Amla, Haritaki & Bibhitaki' },
        { name: 'Aloe Vera', origin: 'Cooling botanical hydration' },
      ],
    },
    quoteAndTestimonials: {
      quote:
        '“True wellness is rarely hurried — it grows patiently in the soil, in heritage, and in small daily rituals.”',
      attribution: 'GRAMIYAM Siddha & Ayurveda Philosophy',
      testimonialsEyebrow: 'COMMUNITY VOICES (SAMPLE FEEDBACK)',
      testimonialsTitleLead: 'Notes from',
      testimonialsTitleHighlight: 'Households',
      sampleDisclaimer: 'Illustrative sample feedback shown for layout preview.',
      testimonials: [
        {
          id: 'sample-1',
          author: 'Kavitha R.',
          location: 'Coimbatore, Tamil Nadu',
          product: '5 in 1 Hair Oil',
          quote:
            'Has the comforting herbal aroma of oils my grandmother used to prepare at home. Absorbs easily without feeling heavy.',
        },
        {
          id: 'sample-2',
          author: 'Aravind S.',
          location: 'Chennai, Tamil Nadu',
          product: 'Moringa Tablets',
          quote:
            'Clean packaging and simple daily tablet format that fits neatly into a busy workday routine.',
        },
        {
          id: 'sample-3',
          author: 'Meenakshi V.',
          location: 'Madurai, Tamil Nadu',
          product: 'Aloe Vera Soap',
          quote:
            'Gentle on the skin with a fresh green scent that feels pure and refreshing even in humid weather.',
        },
      ],
    },
    newsletter: {
      eyebrow: 'STAY CONNECTED',
      titleLead: 'Seasonal Notes from',
      titleHighlight: 'GRAMIYAM',
      description:
        'Receive thoughtful Siddha & Ayurveda living notes, new botanical releases, and regional store announcements.',
    },
  },
};
