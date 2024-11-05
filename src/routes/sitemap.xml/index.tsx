import type { RequestHandler } from '@builder.io/qwik-city';
import { createSitemap } from './create-sitemap';
import { CONTENT } from '../films/content';

export const onGet: RequestHandler = ({ url, send }) => {
  const baseUrl = url.origin;
  const staticRoutes = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/films', priority: 0.8 },
    { loc: '/blog', priority: 0.8 },
  ];

  console.log('Static Routes:', staticRoutes);

  const filmRoutes = CONTENT.films.map(film => ({
    loc: `/films/${film.slug}`,
    priority: 0.8,
  }));

  console.log('Film Routes:', filmRoutes);

  const allRoutes = [...staticRoutes, ...filmRoutes];

  console.log('All Routes:', allRoutes);

  const sitemap = createSitemap(allRoutes, baseUrl);

  console.log('Generated Sitemap:', sitemap);

  send(new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  }));
}; 