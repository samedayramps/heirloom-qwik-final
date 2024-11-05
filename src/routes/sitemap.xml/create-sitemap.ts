export interface SitemapEntry {
  loc: string;
  priority: number;
  lastmod?: string; // Optional last modified date
  changefreq?: string; // Optional change frequency
}

export function createSitemap(entries: SitemapEntry[], baseUrl: string) {
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array');
  }

  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  return `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(
  (entry) => `
  <url>
    <loc>${baseUrl}${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    <priority>${entry.priority}</priority>
  </url>`,
).join('')}
</urlset>`.trim();
} 