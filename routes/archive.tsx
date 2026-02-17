import { define } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(async function ArchivePage(ctx) {
  ctx.state.title = "Archive — RvR";
  ctx.state.description = "All blog posts";

  const posts = await getBlogPosts();

  return (
    <>
      <Nav />
      <h1 class="text-4xl font-bold mb-8">Archive</h1>
      <ul class="space-y-2">
        {posts.map((post) => (
          <li key={post.slug} class="flex gap-4 items-baseline">
            {post.date && (
              <time class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground whitespace-nowrap">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
            <a
              href={`/blog/${post.slug}`}
              class="hover:underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
});
