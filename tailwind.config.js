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
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151', // gray-700
            h2: {
              fontFamily: 'Playfair Display, serif',
              color: '#1F2937', // gray-800
              marginTop: '2em',
            },
            p: {
              fontFamily: 'Open Sans, sans-serif',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              color: '#315141',
              '&:hover': {
                color: '#52453A',
              },
            },
            strong: {
              color: '#1F2937', // gray-800
            },
            'ul > li': {
              '&::before': {
                backgroundColor: '#d5c6ad',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
