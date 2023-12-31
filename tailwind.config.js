/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-red': '#F3532F',
        beige: '#D9C9AD',
      },
    },
  },
  plugins: [],
};
