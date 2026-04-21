import { define, SITE } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function AboutPage(ctx) {
  ctx.state.title = "About — RvR";
  ctx.state.structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.author.name,
    url: `${SITE.url}/about`,
    email: SITE.author.email,
    sameAs: [SITE.author.github],
    nationality: "American",
    homeLocation: { "@type": "Place", addressCountry: "DE" },
  };

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">About</h1>
      <div>
        I'm a developer living in Germany, originally from California. Here's my
        github:{" "}
        <a href="https://github.com/deer" class="underline">
          https://github.com/deer
        </a>
      </div>
    </>
  );
});
