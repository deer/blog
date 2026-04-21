import { define } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(async function ArchivePage(ctx) {
  ctx.state.title = "Archive — RvR";
  ctx.state.description = "All blog posts";

  const posts = await getBlogPosts();

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  const byYear = new Map<string, typeof posts>();
  for (const post of posts) {
    const year = post.date
      ? new Date(post.date).getUTCFullYear().toString()
      : "Undated";
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }

  return (
    <>
      <Nav />
      <h1 class="text-4xl font-bold mb-8">Archive</h1>

      {allTags.length > 0 && (
        <div class="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <a
              href={`/archive?tag=${encodeURIComponent(tag)}`}
              key={tag}
              class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground hover:underline"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} class="mb-10">
          <h2 class="text-lg font-semibold mb-4">{year}</h2>
          <ul class="space-y-2">
            {yearPosts.map((post) => (
              <li key={post.slug} class="flex gap-4 items-baseline">
                {post.date && (
                  <time class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
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
        </section>
      ))}
    </>
  );
});
