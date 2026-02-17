import { define } from "../utils.ts";
import { HttpError } from "fresh";
import { Nav } from "../components/Nav.tsx";

export default define.page(function ErrorPage(ctx) {
  const error = ctx.error;
  const status = error instanceof HttpError ? error.status : 500;
  const message = status === 404 ? "Page not found" : "Something went wrong";

  ctx.state.title = `${status} — RvR`;

  return (
    <>
      <Nav />
      <div class="text-center py-20">
        <h1 class="text-6xl font-bold mb-4">{status}</h1>
        <p class="text-xl text-light-muted-foreground dark:text-dark-muted-foreground">
          {message}
        </p>
        <a href="/" class="inline-block mt-8 underline">
          Go home
        </a>
      </div>
    </>
  );
});
