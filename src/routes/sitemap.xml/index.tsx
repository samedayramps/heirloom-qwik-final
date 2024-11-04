import type { RequestHandler } from '@builder.io/qwik-city';
import { CONTENT } from '../films/content';

// Define your site's URLs
const filmUrls = CONTENT.films.map(film => `/films/${film.slug}`);

const SITE_URLS = [
  '/',
  '/about',
  '/films',
  '/blog',
  ...filmUrls
] as const;

// Cache configuration
const CACHE_CONFIG = {
  staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 days
  maxAge: 60 * 60, // 1 hour
} as const;

export const onGet: RequestHandler = async ({ cacheControl, url, send }) => {
  console.log('Generating sitemap...', {
    origin: url.origin,
    urls: SITE_URLS,
    env: process.env.NODE_ENV
  });

  cacheControl(CACHE_CONFIG);

  // Determine the correct origin
  const origin = process.env.NODE_ENV === 'production'
    ? 'https://heirloomweddingfilms.com'  // Replace with your actual domain
    : url.origin;

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITE_URLS.map(path => `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  console.log('Generated sitemap:', sitemap);

  // Send response with correct headers
  send(new Response(sitemap, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  }));
}; 