import { define, SITE } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";

const staticPages = ["/", "/about", "/archive", "/contact", "/projects"];

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await getBlogPosts();
    const baseUrl = SITE.url;

    const urls = staticPages.map((path) =>
      `  <url><loc>${baseUrl}${path}</loc></url>`
    );

    for (const post of posts) {
      const loc = `${baseUrl}/blog/${post.slug}`;
      const lastmod = post.date
        ? `<lastmod>${
          new Date(post.date).toISOString().split("T")[0]
        }</lastmod>`
        : "";
      urls.push(`  <url><loc>${loc}</loc>${lastmod}</url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: { "content-type": "application/xml; charset=utf-8" },
    });
  },
});
