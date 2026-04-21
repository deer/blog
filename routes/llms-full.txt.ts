import { define, SITE } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";

export const handler = define.handlers({
  async GET() {
    const posts = await getBlogPosts();

    const lines: string[] = [];
    lines.push(`# ${SITE.name} — ${SITE.url}`);
    lines.push("");
    lines.push(`> ${SITE.defaultDescription}`);
    lines.push("");
    lines.push(
      "Personal site and developer blog by Reed von Redwitz. Hub for three surfaces: the *.build Java 25 ecosystem (base, codemodel, spawn, spin are open source Workday projects Reed contributes to; serve.build is his own), domain demos on top (music.build), and Denote (an AI-native documentation framework at denote.sh). Thesis: AI agents should compose through typed models, not generate text. Archive includes earlier posts on Deno, Fresh, TypeScript, and a '90 days of new tech' series from 2023.",
    );
    lines.push("");
    lines.push(
      "Built with Fresh 2.x, deployed on Deno Deploy, server-side Umami analytics (no cookies, no client-side tracking).",
    );
    lines.push("");
    lines.push("## Posts");
    lines.push("");

    for (const post of posts) {
      const date = post.date ? post.date.split(" ")[0] : "undated";
      lines.push(`### ${post.title}`);
      lines.push(`- URL: ${SITE.url}/blog/${post.slug}`);
      lines.push(`- Date: ${date}`);
      if (post.tags.length) lines.push(`- Tags: ${post.tags.join(", ")}`);
      if (post.description) lines.push(`- Description: ${post.description}`);
      lines.push("");
    }

    lines.push("## Data");
    lines.push("");
    lines.push(`- JSON index: ${SITE.url}/posts.json`);
    lines.push(`- RSS feed: ${SITE.url}/blog/feed.xml`);
    lines.push(`- Sitemap: ${SITE.url}/sitemap.xml`);
    lines.push("");
    lines.push("## Legal");
    lines.push("");
    lines.push(`- Impressum: ${SITE.url}/impressum`);
    lines.push(`- Privacy Policy: ${SITE.url}/privacy`);
    lines.push("");

    return new Response(lines.join("\n"), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
});
