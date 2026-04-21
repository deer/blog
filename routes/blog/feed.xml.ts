import { define, SITE } from "../../utils.ts";
import { getBlogPosts } from "../../lib/content.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await getBlogPosts();
    const baseUrl = SITE.url;

    const escape = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

    const items = posts.map((post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${baseUrl}/blog/${escape(post.slug)}</link>
      <guid>${baseUrl}/blog/${escape(post.slug)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
    </item>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name} blog</title>
    <link>${baseUrl}/blog</link>
    <description>${SITE.defaultDescription}</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  },
});
