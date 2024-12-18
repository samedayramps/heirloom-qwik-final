import { component$ } from '@builder.io/qwik';

export const FontLoader = component$(() => {
  const EPHESIS_URL = 'https://fonts.googleapis.com/css2?family=Ephesis&display=swap';
  
  return (
    <>
      {/* Self-hosted fonts with font-display: swap */}
      <link
        href="/PlayfairDisplay-Regular.woff2" 
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        rel="stylesheet"
      />
      <link
        href="/OpenSans-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        rel="stylesheet"
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
      
      {/* Load Google Fonts with media strategy */}
      <link 
        href={EPHESIS_URL}
        rel="stylesheet"
        media="print"
        onLoad$={function(this: HTMLLinkElement) {
          this.media = 'all';
        }}
      />

      {/* Font-face declarations */}
      <style>
        {`
          /* Self-hosted fonts */
          @font-face {
            font-family: 'Playfair Display';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/PlayfairDisplay-Regular.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/OpenSans-Regular.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* Fallback font for Ephesis while loading */
          @font-face {
            font-family: 'Ephesis';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Arial');
            ascent-override: 90%;
            descent-override: 20%;
            line-gap-override: 0%;
          }
        `}
      </style>
    </>
  );
}); 