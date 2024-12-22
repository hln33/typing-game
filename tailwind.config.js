import kobaltePlugin from '@kobalte/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    kobaltePlugin,
  ],
}

