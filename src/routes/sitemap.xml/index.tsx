import type { RequestHandler } from '@builder.io/qwik-city';
import { createSitemap } from './create-sitemap';

export const onGet: RequestHandler = ({ send, env }) => {
  // Use production domain
  const baseUrl = 'https://heirloomweddingfilms.com';
  
  // Add logging to debug production issues
  console.log('Generating sitemap...');
  console.log('Environment:', env.get('MODE'));

  try {
    // Define all known routes
    const allRoutes = [
      { loc: '/', priority: 1.0 },
      { loc: '/about', priority: 0.8 },
      { loc: '/films', priority: 0.8 },
      { loc: '/blog', priority: 0.8 },
      { loc: '/films/harlie-and-garret', priority: 0.8 },
    ];

    console.log('Routes to be included:', allRoutes);

    const sitemap = createSitemap(allRoutes, baseUrl);
    
    console.log('Generated sitemap:', sitemap);

    // Set cache control headers
    const headers = new Headers({
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    });

    send(new Response(sitemap, { headers }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Send a basic sitemap in case of error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;

    send(new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }));
  }
}; 