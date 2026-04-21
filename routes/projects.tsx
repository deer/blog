import { define } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function ProjectsPage(ctx) {
  ctx.state.title = "Projects — RvR";

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">Projects</h1>
      <div>Look at all my great work!</div>
    </>
  );
});
