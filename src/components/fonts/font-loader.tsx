import { component$ } from '@builder.io/qwik';

export const FontLoader = component$(() => {
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

      {/* Google Fonts for Ephesis only */}
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
      <link 
        href="https://fonts.googleapis.com/css2?family=Ephesis&display=swap" 
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

          /* Font fallbacks */
          .font-playfair {
            font-family: "Playfair Display", Georgia, serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
          }
          
          .font-opensans {
            font-family: "Open Sans", system-ui, -apple-system, sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
            font-variation-settings: "wdth" 100;
          }
          
          .font-ephesis {
            font-family: "Ephesis", cursive;
            font-weight: 400;
            font-style: normal;
            font-size: 1.6em;
            line-height: 1;
          }

          /* Font variations */
          .font-opensans-light { font-weight: 300; }
          .font-opensans-regular { font-weight: 400; }
          .font-opensans-medium { font-weight: 500; }
          .font-opensans-semibold { font-weight: 600; }
        `}
      </style>
    </>
  );
}); 