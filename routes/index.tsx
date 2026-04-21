import { define, SITE } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(async function IndexPage(ctx) {
  ctx.state.title = "RvR";
  ctx.state.description = "A developer blog by Reed";
  ctx.state.structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.defaultDescription,
        inLanguage: "en",
        author: { "@id": `${SITE.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.author.name,
        url: SITE.url,
        sameAs: [SITE.author.github, SITE.author.linkedin],
      },
    ],
  };

  const posts = await getBlogPosts();

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <div class="divide-y divide-light-muted-background dark:divide-dark-muted-background">
        {posts.map((post) => (
          <article key={post.slug} class="group py-8 first:pt-0">
            <a href={`/blog/${post.slug}`} class="block">
              {post.date && (
                <time
                  datetime={new Date(post.date).toISOString()}
                  class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground tracking-wide"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              )}
              {post.tags.length > 0 && (
                <div class="flex gap-2 mt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 class="text-2xl font-bold mt-1 mb-2 group-hover:underline">
                {post.title}
              </h2>
              {post.description && (
                <p class="text-sm text-light-muted-foreground dark:text-dark-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              )}
            </a>
          </article>
        ))}
      </div>
    </>
  );
});
