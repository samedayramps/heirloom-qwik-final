import type { RequestHandler } from '@builder.io/qwik-city';
import { CONTENT } from '../films/content';

// Define your site's URLs with error handling
const getUrls = () => {
  const baseUrls = [
    '/',
    '/about',
    '/films',
    '/blog',
  ];

  try {
    // Add film URLs if available
    if (CONTENT.films.length) {
      const filmUrls = CONTENT.films.map(film => `/films/${film.slug}`);
      return [...baseUrls, ...filmUrls];
    }
    
    console.log('No film content found, using base URLs only');
    return baseUrls;
  } catch (error) {
    console.error('Error getting film URLs:', error);
    return baseUrls;
  }
};

const SITE_URLS = getUrls();

// Production domain
const DOMAIN = {
  development: 'http://localhost:5173',
  preview: 'http://localhost:4173',
  production: 'https://heirloomweddingfilms.com'
} as const;

export const onGet: RequestHandler = async ({ url, env, send }) => {
  try {
    const isProd = env.get('PROD') === 'true';
    const mode = env.get('MODE');
    
    console.log('Generating sitemap...', {
      origin: url.origin,
      urls: SITE_URLS,
      urlsCount: SITE_URLS.length,
      mode,
      isProd,
      hasFilms: Boolean(CONTENT.films.length)
    });

    // Determine the correct origin
    const origin = isProd 
      ? DOMAIN.production
      : mode === 'preview' 
        ? DOMAIN.preview 
        : DOMAIN.development;

    // Generate sitemap XML with proper formatting
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITE_URLS.map(path => `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    console.log('Generated sitemap content:', sitemap);

    // Send response with correct headers
    send(new Response(sitemap, {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': isProd 
          ? 'public, max-age=3600, s-maxage=86400' 
          : 'no-cache, no-store, must-revalidate',
        'x-robots-tag': isProd ? 'all' : 'noindex'
      },
    }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Send error response with base URLs only
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN.production}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    send(new Response(fallbackSitemap, {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'no-cache, no-store, must-revalidate'
      }
    }));
  }
}; 