import { define, SITE } from "../../utils.ts";
import { getAdjacentPosts, getBlogPost } from "../../lib/content.ts";
import { HttpError } from "fresh";
import { Nav } from "../../components/Nav.tsx";

export default define.page(async function BlogPostPage(ctx) {
  const post = await getBlogPost(ctx.params.slug);
  if (!post) throw new HttpError(404, "Post not found");

  const { prev, next } = await getAdjacentPosts(ctx.params.slug);

  ctx.state.title = `${post.title} — ${SITE.name}`;
  ctx.state.description = post.description;
  ctx.state.ogType = "article";
  ctx.state.structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE.url}/blog/${post.slug}`,
    ...(post.author && {
      author: { "@type": "Person", name: post.author },
    }),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <Nav />
      <a href="/" class="text-xs hover:underline mb-8 inline-block">
        ← All posts
      </a>
      <article>
        <header class="mb-10">
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
          <h1 class="text-4xl font-bold mt-2 mb-3 leading-tight">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div class="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/archive?tag=${encodeURIComponent(tag)}`}
                  class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground hover:underline"
                >
                  #{tag}
                </a>
              ))}
            </div>
          )}
        </header>
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {(prev || next) && (
        <nav class="mt-16 grid grid-cols-2 gap-4 border-t border-light-muted-background dark:border-dark-muted-background pt-8">
          {prev
            ? (
              <a href={`/blog/${prev.slug}`} class="block hover:underline">
                <span class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                  ← Newer
                </span>
                <span class="block mt-1 text-sm">{prev.title}</span>
              </a>
            )
            : <div />}
          {next
            ? (
              <a
                href={`/blog/${next.slug}`}
                class="block hover:underline text-right"
              >
                <span class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                  Older →
                </span>
                <span class="block mt-1 text-sm">{next.title}</span>
              </a>
            )
            : <div />}
        </nav>
      )}
    </>
  );
});
