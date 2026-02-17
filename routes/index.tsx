import { define } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(async function IndexPage(ctx) {
  ctx.state.title = "RvR";
  ctx.state.description = "A developer blog by Reed";

  const posts = await getBlogPosts();

  return (
    <>
      <Nav />
      <div class="divide-y divide-light-muted-background dark:divide-dark-muted-background">
        {posts.map((post) => (
          <article key={post.slug} class="group py-8 first:pt-0">
            <a href={`/blog/${post.slug}`} class="block">
              {post.date && (
                <time class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground tracking-wide">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              )}
              <h2 class="text-2xl font-bold mt-1 mb-2 group-hover:underline">
                {post.title}
              </h2>
              {post.excerpt && (
                <div
                  class="text-sm text-light-muted-foreground dark:text-dark-muted-foreground leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}
            </a>
          </article>
        ))}
      </div>
    </>
  );
});
