import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'z-gray-200',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px',
      },
      colors: {},
      fontFamily: {
        sans: ['Plus Jakarta Sans'],
        serif: ['Playfair Display'],
      },
      boxShadow: {
        'z-gray': '0px 4px 32px 0px rgba(0, 0, 0, 0.04)',
        'z-purple': '0px 4px 32px 0px rgba(120, 1, 221, 0.06)',
        'z-red': '0px 4px 32px 0px rgba(220, 39, 80, 0.06)',
        'z-green': '0px 4px 32px 0px rgba(15, 116, 115, 0.06)',
      },
    },
  },
};

export default config;
