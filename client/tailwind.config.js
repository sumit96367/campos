/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EE',
        ivory: '#FFFDF7',
        champagne: '#F1E8D4',
        gold: {
          DEFAULT: '#B8963E',
          dark: '#9A7C2F',
          light: '#D4AF6A',
        },
        charcoal: '#2B2622',
        wine: '#5B1F2B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-lg': '0.15em',
        'widest-xl': '0.2em',
      },
      boxShadow: {
        'elegant': '0 4px 32px rgba(43, 38, 34, 0.08)',
        'elegant-lg': '0 12px 60px rgba(43, 38, 34, 0.14)',
        'elegant-sm': '0 2px 12px rgba(43, 38, 34, 0.08)',
        'gold': '0 0 40px rgba(184, 150, 62, 0.2)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B8963E 0%, #D4AF6A 50%, #B8963E 100%)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
