import type { RequestHandler } from '@builder.io/qwik-city';
import { createSitemap } from './create-sitemap';

export const onGet: RequestHandler = ({ send }) => {
  // Use production domain
  const baseUrl = 'https://heirloomweddingfilms.com';

  // Define all known routes
  const allRoutes = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/films', priority: 0.8 },
    { loc: '/blog', priority: 0.8 },
    { loc: '/films/harlie-and-garret', priority: 0.8 },
  ];

  const sitemap = createSitemap(allRoutes, baseUrl);

  send(new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  }));
}; 