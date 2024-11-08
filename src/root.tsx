import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from './components/router-head/router-head';
import { QwikPartytown } from './components/partytown/partytown'; // Import Partytown
import "./global.css";
import './lib/web-vitals'; // Import the web vitals script

// Development mode check
const isDev = import.meta.env.MODE === 'development';

/**
 * The root of a QwikCity site always starts with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 */
export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Critical resources */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* RouterHead handles meta tags, title, links, and scripts */}
        <RouterHead />
        <QwikPartytown forward={['gtag', 'dataLayer.push']} />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-0VN4745TTH"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-0VN4745TTH');
          `}
        />
      </head>
      
      <body lang="en">
        {/* Main app content */}
        <RouterOutlet />

        {/* Only include ServiceWorker in production for better development experience */}
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
