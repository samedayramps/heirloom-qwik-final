import type { RequestHandler } from '@builder.io/qwik-city';
import { CONTENT } from '../films/content';

// Define your site's URLs with error handling
const getUrls = () => {
  // Define static routes
  const staticRoutes = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/films', priority: 0.8 },
    { loc: '/blog', priority: 0.8 },
  ];

  try {
    // Add dynamic film routes
    const filmRoutes = CONTENT.films.map(film => ({
      loc: `/films/${film.slug}`,
      priority: 0.8
    }));
    return [...staticRoutes, ...filmRoutes];
  } catch (error) {
    console.error('Error getting film URLs:', error);
    return staticRoutes;
  }
};

export const onGet: RequestHandler = async ({ cacheControl, url, send }) => {
  try {
    // Set cache control headers
    cacheControl({
      public: true,
      maxAge: 3600, // 1 hour
      staleWhileRevalidate: 86400 // 24 hours
    });

    // Determine environment and base URL
    const isProd = url.hostname === 'heirloomweddingfilms.com';
    const baseUrl = isProd 
      ? 'https://heirloomweddingfilms.com'
      : url.origin;

    // Get all URLs
    const urls = getUrls();

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority }) => `  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Set response headers and send response
    send(new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': isProd 
          ? 'public, max-age=3600, s-maxage=86400' 
          : 'no-store, no-cache, must-revalidate'
      }
    }));

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Send minimal sitemap on error
    send(new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://heirloomweddingfilms.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    ));
  }
}; 