/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'ephesis': ['Ephesis', 'cursive'],
        'opensans': ['Open Sans', 'sans-serif']
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
}
