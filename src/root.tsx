import { component$ } from "@builder.io/qwik";
import { useStylesScoped$ } from "@builder.io/qwik";
import styles from "./root.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>HEIRLOOM Wedding Films</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WDV40YN0D8"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WDV40YN0D8');
          `}
        </script>
      </head>
      <body>
        <slot />
      </body>
    </html>
  );
});
