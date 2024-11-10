import type { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";

export const onGet: RequestHandler = (ev) => {
  const siteRoutes = routes
    .map(([route]) => route as string)
    .filter(route => route !== "/");  // Exclude the '/' route

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://heirloomweddingfilms.com/</loc>
        <priority>1.0</priority>
      </url>
      ${siteRoutes.map(route => `
        <url>
          <loc>https://heirloomweddingfilms.com${route}</loc>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
}; 