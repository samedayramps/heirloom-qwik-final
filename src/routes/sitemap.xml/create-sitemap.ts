export interface SitemapEntry {
  loc: string;
  priority: number;
}

export function createSitemap(entries: SitemapEntry[], baseUrl: string) {
  return `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(
  (entry) => `
  <url>
    <loc>${baseUrl}${entry.loc}</loc>
    <priority>${entry.priority}</priority>
  </url>`,
).join('')}
</urlset>`.trim();
} 