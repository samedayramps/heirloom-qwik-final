import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ send, url, cacheControl }) => {
  console.log('Generating robots.txt...', { url: url.origin });
  
  // Force no caching during development
  cacheControl({
    noCache: true,
    maxAge: 0
  });

  // Determine the correct origin
  const origin = process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com'  // Replace with your actual domain
    : url.origin;

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${origin}/sitemap.xml`;

  console.log('Generated robots.txt content:', robotsTxt);

  send(new Response(robotsTxt, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-cache, no-store, must-revalidate',
      'pragma': 'no-cache',
      'expires': '0'
    },
  }));
}; 