import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from './components/router-head/router-head';
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
      </head>
      
      <body lang="en">
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
