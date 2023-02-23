/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {},
  variants: {},
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
