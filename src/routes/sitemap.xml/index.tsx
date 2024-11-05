import type { RequestHandler } from '@builder.io/qwik-city';
import { createSitemap } from './create-sitemap';
import { CONTENT } from '../films/content';
import BLOG_POSTS from '../blog/[slug]/index';

export const onGet: RequestHandler = ({ url, send }) => {
  const baseUrl = url.origin;

  // Log CONTENT data
  console.log('CONTENT in production:', CONTENT);

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

  const blogRoutes = Object.keys(BLOG_POSTS).map(slug => ({
    loc: `/blog/${slug}`,
    priority: 0.8,
  }));

  const allRoutes = [...staticRoutes, ...filmRoutes, ...blogRoutes];

  // Log all routes
  console.log('All Routes:', allRoutes);

  const sitemap = createSitemap(allRoutes, baseUrl);

  send(new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  }));
}; 