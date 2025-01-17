import kobaltePlugin from '@kobalte/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        contentShow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        contentHide: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'content-show': 'contentShow 250ms ease-out',
        'content-hide': 'contentHide 250ms ease-in forwards'
      }
    },
  },
  plugins: [
    kobaltePlugin,
  ],
}

