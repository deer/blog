import { App, staticFiles } from "fresh";
import type { State } from "./utils.ts";
import { umamiMiddleware } from "./umami.ts";

export const app = new App<State>();

const LONG_CACHE = /\.(svg|png|jpg|jpeg|webp|ico|woff2?|ttf)$/i;
const SHORT_CACHE = /\.(xml|json|txt)$/i;

app.use(async (ctx) => {
  const res = await ctx.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("text/html")) {
    res.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; "),
    );
  }

  if (!res.headers.has("cache-control")) {
    const path = new URL(ctx.req.url).pathname;
    if (LONG_CACHE.test(path)) {
      res.headers.set("Cache-Control", "public, max-age=86400");
    } else if (SHORT_CACHE.test(path)) {
      res.headers.set("Cache-Control", "public, max-age=300");
    }
  }

  return res;
});

app.use(staticFiles());
app.use(umamiMiddleware());
app.fsRoutes();
