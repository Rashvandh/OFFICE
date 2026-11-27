/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#A31F1A', // Primary Crimson / Deep Red Accent
          dark: '#861814',
          light: '#B92923',
        },
        herbal: {
          DEFAULT: '#1F3D2B', // Deep Herbal Green
          dark: '#14291C',
          light: '#2C543B',
        },
        botanical: {
          DEFAULT: '#A31F1A',
          dark: '#861814',
        },
        sage: {
          DEFAULT: '#555046',
          light: '#F7F1D8',
          muted: '#6E685D',
        },
        ivory: '#FEFBEA',
        cream: '#F7F1D8',
        heritage: '#E6DEC6',
        cardwhite: '#FFFDF8',
        gold: {
          DEFAULT: '#C4A462',
          light: '#DFC793',
          dark: '#9C7E40',
        },
        charcoal: '#171614',
        secondary: '#555046',
        softgrey: '#E6DEC6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -12px rgba(23, 22, 20, 0.12)',
        card: '0 4px 16px -4px rgba(23, 22, 20, 0.06)',
        lift: '0 20px 44px -14px rgba(31, 61, 43, 0.18)',
      },
    },
  },
  plugins: [],
};
