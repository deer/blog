import { define, SITE } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function ContactPage(ctx) {
  ctx.state.title = "Contact — RvR";
  ctx.state.description =
    "Ways to reach Reed von Redwitz: email, GitHub, LinkedIn.";

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">Contact</h1>
      <ul class="space-y-2 max-w-prose">
        <li>
          Email:{" "}
          <a href={`mailto:${SITE.author.email}`} class="underline">
            {SITE.author.email}
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href={SITE.author.github} class="underline">
            github.com/deer
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href={SITE.author.linkedin} class="underline">
            linkedin.com/in/reed-vonredwitz
          </a>
        </li>
      </ul>
    </>
  );
});
