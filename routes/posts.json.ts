import { define, SITE } from "../utils.ts";
import { getBlogPosts, readingTimeMinutes } from "../lib/content.ts";

export const handler = define.handlers({
  async GET() {
    const posts = await getBlogPosts();
    const body = {
      site: {
        name: SITE.name,
        url: SITE.url,
        description: SITE.defaultDescription,
      },
      count: posts.length,
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        tags: p.tags,
        author: p.author,
        readingTimeMinutes: readingTimeMinutes(p.content),
        url: `${SITE.url}/blog/${p.slug}`,
      })),
    };
    return new Response(JSON.stringify(body, null, 2), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
});
