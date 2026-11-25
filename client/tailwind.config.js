/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#B93627', // GRAMIYAM Terracotta
          dark: '#8F2A1D',    // Deep Terracotta
          light: '#CE4A3A',
        },
        botanical: {
          DEFAULT: '#455B3C', // Botanical Green
          dark: '#293C28',    // Deep Green
        },
        sage: {
          DEFAULT: '#D8B4A6',
          light: '#E9D8C5',
          muted: '#777064',
        },
        ivory: '#F5EBDD',     // Warm Ivory
        cream: '#FFF9F1',     // Cream
        heritage: '#E9D8C5',  // Natural Beige
        gold: {
          DEFAULT: '#B99A60',
          light: '#D4BE91',
          dark: '#967A44',
        },
        charcoal: '#29251F',  // Dark Text
        softgrey: '#E9D8C5',  // Borders
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 34px rgba(41, 37, 31, 0.07)',
        card: '0 4px 20px rgba(41, 37, 31, 0.04)',
      },
    },
  },
  plugins: [],
};
