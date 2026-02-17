import { define, SITE } from "../../utils.ts";
import { getBlogPost } from "../../lib/content.ts";
import { HttpError } from "fresh";
import { Nav } from "../../components/Nav.tsx";

export default define.page(async function BlogPostPage(ctx) {
  const post = await getBlogPost(ctx.params.slug);
  if (!post) throw new HttpError(404, "Post not found");

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
    author: post.author
      ? { "@type": "Person", name: post.author }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <Nav />
      <article>
        <header class="mb-10">
          <time class="text-xs text-light-muted-foreground dark:text-dark-muted-foreground tracking-wide">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          <h1 class="text-4xl font-bold mt-2 mb-3 leading-tight">
            {post.title}
          </h1>
        </header>
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  );
});
