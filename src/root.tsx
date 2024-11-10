import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from './components/router-head/router-head';
import "./global.css";
import './lib/web-vitals';

const isDev = import.meta.env.MODE === 'development';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TM49ZMV');
        `} />

        {/* Critical resources */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* RouterHead handles meta tags, title, links, and scripts */}
        <RouterHead />
      </head>
      
      <body lang="en">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TM49ZMV"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>

        {/* Hidden form for Netlify Forms detection */}
        <form
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          hidden
        >
          <input type="hidden" name="form-name" value="contact" />
          <input name="bot-field" />
          <input type="text" name="firstName" />
          <input type="text" name="lastName" />
          <input type="email" name="email" />
          <input type="tel" name="phoneNumber" />
          <input type="date" name="weddingDate" />
          <input type="text" name="weddingVenue" />
          <textarea name="message"></textarea>
        </form>

        {/* Main app content */}
        <RouterOutlet />

        {/* Only include ServiceWorker in production for better development experience */}
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
