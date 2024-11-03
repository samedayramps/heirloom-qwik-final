import { component$ } from '@builder.io/qwik';

export const FontLoader = component$(() => {
  const EPHESIS_URL = 'https://fonts.googleapis.com/css2?family=Ephesis&display=swap';
  
  return (
    <>
      {/* Preload self-hosted fonts */}
      <link 
        rel="preload"
        href="/fonts/playfair-display-latin.woff2" 
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload" 
        href="/fonts/open-sans-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preload critical images */}
      <link
        rel="preload"
        href="/assets/images/16-texture-square.webp"
        as="image"
        type="image/webp"
      />

      {/* Optimized Google Fonts loading for Ephesis */}
      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com" 
        crossOrigin="anonymous"
      />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous"
      />
      
      {/* Preload Google Fonts CSS */}
      <link 
        rel="preload"
        href={EPHESIS_URL}
        as="style"
      />
      
      {/* Load Google Fonts */}
      <link 
        href={EPHESIS_URL}
        rel="stylesheet"
      />

      {/* Font-face declarations */}
      <style>
        {`
          /* Self-hosted fonts */
          @font-face {
            font-family: 'Playfair Display';
            font-style: normal;
            font-weight: 400 700;
            font-display: swap;
            src: url('/fonts/playfair-display-latin.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 300 600;
            font-display: swap;
            src: url('/fonts/open-sans-latin.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `}
      </style>
    </>
  );
}); 