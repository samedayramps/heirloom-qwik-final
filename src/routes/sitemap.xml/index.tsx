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

  const filmRoutes = CONTENT.films.map(film => ({
    loc: `/films/${film.slug}`,
    priority: 0.8,
  }));

  const sitemap = createSitemap([...staticRoutes, ...filmRoutes], baseUrl);

  send(new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  }));
}; 