import { component$ } from '@builder.io/qwik';

export const FontLoader = component$(() => {
  const EPHESIS_URL = 'https://fonts.googleapis.com/css2?family=Ephesis&display=swap';
  
  return (
    <>
      {/* Preload self-hosted fonts */}
      <link 
        rel="preload"
        href="/fonts/PlayfairDisplay-Regular.woff2" 
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload" 
        href="/fonts/OpenSans-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload" 
        href="/fonts/OpenSans-Italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Optimized Google Fonts loading for Ephesis */}
      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com" 
      />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin=""
      />
      
      {/* Load Google Fonts */}
      <link 
        href={EPHESIS_URL}
        rel="stylesheet"
      />

      {/* Font-face declarations */}
      <style
        dangerouslySetInnerHTML={`
          /* Self-hosted fonts */
          @font-face {
            font-family: 'Playfair Display';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/PlayfairDisplay-Regular.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/OpenSans-Regular.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-family: 'Open Sans';
            font-style: italic;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/OpenSans-Italic.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `}
      />
    </>
  );
}); 