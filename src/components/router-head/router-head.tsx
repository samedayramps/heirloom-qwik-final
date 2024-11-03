import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { FontLoader } from "../fonts/font-loader";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      {/* Critical Meta Tags */}
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Add FontLoader component */}
      <FontLoader />

      {/* Defer non-critical scripts */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WDV40YN0D8"
        type="text/partytown"
      />
      <script type="text/partytown">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WDV40YN0D8');
        `}
      </script>

      {/* Dynamic head elements */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props}>
          {s.style}
        </style>
      ))}

      {/* Defer all scripts */}
      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} defer>
          {s.script}
        </script>
      ))}

      {/* Add these font preconnect and stylesheet links */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Ephesis&display=swap" rel="stylesheet" />
    </>
  );
});
