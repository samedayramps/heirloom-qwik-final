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

// Production domain
const DOMAIN = {
  development: 'http://localhost:5173',
  preview: 'http://localhost:4173',
  production: 'https://heirloomweddingfilms.com'
};

// Cache configuration for production
const CACHE_CONFIG = {
  development: {
    noCache: true,
    maxAge: 0
  },
  production: {
    public: true,
    maxAge: 60 * 60, // 1 hour
    staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 days
  }
} as const;

export const onGet: RequestHandler = async ({ cacheControl, url, env, send }) => {
  try {
    const isProd = env.get('PROD') === 'true';
    const mode = env.get('MODE');
    
    console.log('Generating sitemap...', {
      origin: url.origin,
      urls: SITE_URLS.length,
      mode,
      isProd
    });

    // Set appropriate caching based on environment
    cacheControl(isProd ? CACHE_CONFIG.production : CACHE_CONFIG.development);

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
    
    // Send error response
    send(new Response('Error generating sitemap', {
      status: 500,
      headers: {
        'content-type': 'text/plain',
        'cache-control': 'no-cache, no-store, must-revalidate'
      }
    }));
  }
}; 