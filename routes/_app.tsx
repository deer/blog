import { define, SITE } from "../utils.ts";
import { CSS } from "@deer/gfm/style";

export default define.page(function App({ Component, url, state }) {
  const title = state.title ?? SITE.defaultTitle;
  const description = state.description ?? SITE.defaultDescription;
  const canonical = SITE.url + url.pathname;
  const ogType = state.ogType ?? "website";
  const ogImagePath = state.ogImage ?? SITE.defaultOgImage;
  const ogImage = ogImagePath.startsWith("http")
    ? ogImagePath
    : SITE.url + ogImagePath;
  const ogImageAlt = state.ogImageAlt ?? SITE.defaultOgImageAlt;

  return (
    <html lang="en" class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
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
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:locale" content={SITE.locale} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta
          property="og:image:width"
          content={String(SITE.ogImageWidth)}
        />
        <meta
          property="og:image:height"
          content={String(SITE.ogImageHeight)}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        {state.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(state.structuredData)}
          </script>
        )}
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <script src="/theme-init.js" />
      </head>
      <body class="bg-light-background text-light-foreground dark:bg-dark-background dark:text-dark-foreground min-h-screen flex flex-col">
        <a
          href="#main"
          class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-light-background focus:text-light-foreground dark:focus:bg-dark-background dark:focus:text-dark-foreground focus:ring-2 focus:ring-light-foreground dark:focus:ring-dark-foreground"
        >
          Skip to content
        </a>
        <main
          id="main"
          class="max-w-2xl mx-auto px-6 py-12 w-full flex-1"
        >
          <Component />
        </main>
        <footer class="max-w-2xl mx-auto px-6 py-8 w-full text-xs text-light-muted-foreground dark:text-dark-muted-foreground flex gap-4">
          <span>&copy; {new Date().getFullYear()} Reed von Redwitz</span>
          <a href="/impressum" class="hover:underline">Impressum</a>
          <a href="/privacy" class="hover:underline">Privacy</a>
        </footer>
      </body>
    </html>
  );
});
