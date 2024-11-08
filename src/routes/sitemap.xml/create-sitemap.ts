export interface SitemapEntry {
  loc: string;
  priority: number;
  lastmod?: string; // Optional last modified date
  changefreq?: string; // Optional change frequency
}

export function createSitemap(entries: SitemapEntry[], baseUrl: string) {
  // Remove trailing slash from baseUrl if it exists
  baseUrl = baseUrl.replace(/\/$/, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(
  (entry) => `  <url>
    <loc>${baseUrl}${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    <priority>${entry.priority}</priority>
  </url>`
).join('\n')}
</urlset>`.trim();
} 