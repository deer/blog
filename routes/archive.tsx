import { define } from "../utils.ts";
import { getBlogPosts } from "../lib/content.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(async function ArchivePage(ctx) {
  const activeTag = ctx.url.searchParams.get("tag");
  ctx.state.title = activeTag
    ? `Archive: #${activeTag} — RvR`
    : "Archive — RvR";
  ctx.state.description = activeTag
    ? `Posts tagged ${activeTag}`
    : "All blog posts";

  const allPosts = await getBlogPosts();
  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

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
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">
        Archive
        {activeTag && (
          <span class="text-light-muted-foreground dark:text-dark-muted-foreground font-normal">
            : #{activeTag}
          </span>
        )}
      </h1>

      {allTags.length > 0 && (
        <div class="flex flex-wrap gap-2 mb-10">
          {activeTag && (
            <a
              href="/archive"
              class="text-xs underline text-light-foreground dark:text-dark-foreground"
            >
              clear filter
            </a>
          )}
          {allTags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <a
                href={`/archive?tag=${encodeURIComponent(tag)}`}
                key={tag}
                aria-current={isActive ? "true" : undefined}
                class={`text-xs hover:underline ${
                  isActive
                    ? "font-semibold text-light-foreground dark:text-dark-foreground"
                    : "text-light-muted-foreground dark:text-dark-muted-foreground"
                }`}
              >
                #{tag}
              </a>
            );
          })}
        </div>
      )}

      {posts.length === 0 && (
        <p class="text-light-muted-foreground dark:text-dark-muted-foreground">
          No posts{activeTag ? ` tagged #${activeTag}` : ""}.
        </p>
      )}

      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} class="mb-10">
          <h2 class="text-lg font-semibold mb-4">{year}</h2>
          <ul class="space-y-2">
            {yearPosts.map((post) => (
              <li key={post.slug} class="flex gap-4 items-baseline">
                {post.date && (
                  <time
                    datetime={new Date(post.date).toISOString()}
                    class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground whitespace-nowrap"
                  >
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
