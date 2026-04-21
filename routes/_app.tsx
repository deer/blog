import { define, SITE } from "../utils.ts";
import { CSS } from "@deer/gfm/style";

export default define.page(function App({ Component, url, state }) {
  const title = state.title ?? SITE.defaultTitle;
  const description = state.description ?? SITE.defaultDescription;
  const canonical = SITE.url + url.pathname;
  const ogType = state.ogType ?? "website";

  return (
    <html lang="en" class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} blog`}
          href="/blog/feed.xml"
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {state.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(state.structuredData)}
          </script>
        )}
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <script src="/theme-init.js" />
      </head>
      <body class="bg-light-background text-light-foreground dark:bg-dark-background dark:text-dark-foreground min-h-screen">
        <div class="max-w-2xl mx-auto px-6 py-12">
          <Component />
        </div>
      </body>
    </html>
  );
});
