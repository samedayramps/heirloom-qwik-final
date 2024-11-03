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
            color: '#374151',
            h2: {
              fontFamily: 'Playfair Display, serif',
              color: '#1F2937',
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
              color: '#1F2937',
            },
            'ul > li': {
              '&::before': {
                backgroundColor: '#d5c6ad',
              },
            },
          },
        },
      },
      screens: {
        'xs': '400px',
      },
      animation: {
        'notification-pulse': 'notificationPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'popup-appear': 'popupAppear 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'popup-exit': 'popupExit 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'backdrop-appear': 'backdropAppear 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
      keyframes: {
        notificationPulse: {
          '0%, 100%': { backgroundColor: '#7D323B' },
          '50%': { backgroundColor: '#6a2b32' },
        },
        popupAppear: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.96) translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        },
        popupExit: {
          '0%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.96) translateY(20px)'
          },
        },
        backdropAppear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
      },
      colors: {
        brand: {
          DEFAULT: '#7D323B',
          dark: '#6a2b32',
        },
        beige: '#d5c6ad',
        'beige-dark': '#c0b298',
        'off-white': '#faf9f6',
        'charcoal': '#2d2d2d',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
