import { define } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function ContactPage(ctx) {
  ctx.state.title = "Contact — RvR";

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">Contact</h1>
      <div>Contact Me!</div>
    </>
  );
});
