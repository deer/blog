import { define, SITE } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function AboutPage(ctx) {
  ctx.state.title = "About — RvR";
  ctx.state.description =
    "Reed von Redwitz: developer in Germany, contributor to the *.build Java 25 ecosystem, building Denote.";
  ctx.state.structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.author.name,
    url: `${SITE.url}/about`,
    email: SITE.author.email,
    sameAs: [SITE.author.github, SITE.author.linkedin],
    nationality: "American",
    homeLocation: { "@type": "Place", addressCountry: "DE" },
    worksFor: {
      "@type": "Organization",
      name: "Workday",
      url: "https://www.workday.com",
    },
  };

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">About</h1>
      <div class="space-y-4 max-w-prose">
        <p>
          I'm a developer living in Germany, originally from California. My
          thesis in one sentence: AI agents should compose through typed models,
          not generate text.
        </p>
        <p>
          In practice, that means a set of typed Java 25 libraries under the
          {" "}
          <code>*.build</code>{" "}
          namespace. Four are open source Workday projects I contribute to
          (base, codemodel, spawn, spin); the fifth (<a
            href="https://serve.build"
            class="underline"
          >
            serve.build
          </a>) is mine. On top of them I build domain demos:{" "}
          <a href="https://music.build" class="underline">music.build</a>{" "}
          is live. Separately I'm building{" "}
          <a href="https://denote.sh" class="underline">Denote</a>, an AI-native
          documentation framework.
        </p>
        <p>
          Code on{" "}
          <a href={SITE.author.github} class="underline">
            github.com/deer
          </a>.
        </p>
      </div>
    </>
  );
});
