/**
 * Umami Analytics Middleware
 *
 * Server-side Umami pageview reporting. No client-side JavaScript, no cookies.
 * Sends pageview events asynchronously after each HTML response.
 *
 * Requires ANALYTICS_SITE_ID env var. Analytics are silently disabled without it.
 */

export interface MiddlewareContext {
  readonly req: Request;
  readonly info: { remoteAddr: Deno.Addr };
  next(): Promise<Response>;
}

const UMAMI_ENDPOINT = "https://cloud.umami.is/api/send";

let showedMissingWarning = false;

export function umamiMiddleware() {
  const siteId = Deno.env.get("ANALYTICS_SITE_ID");

  return async function umamiHandler(
    ctx: MiddlewareContext,
  ): Promise<Response> {
    if (!siteId) {
      if (!showedMissingWarning) {
        showedMissingWarning = true;
        console.warn(
          "Umami: No ANALYTICS_SITE_ID env var set. Analytics disabled.",
        );
      }
      return ctx.next();
    }

    const res = await ctx.next();

    if (ctx.req.method !== "GET") return res;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return res;

    const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      ctx.req.headers.get("x-real-ip") ||
      (ctx.info.remoteAddr as Deno.NetAddr).hostname ||
      "";

    sendEvent(ctx.req, siteId, ip);

    return res;
  };
}

function sendEvent(request: Request, siteId: string, ip: string): void {
  Promise.resolve().then(async () => {
    const pageUrl = new URL(request.url);

    if (
      pageUrl.pathname.startsWith("/_fresh/") ||
      pageUrl.pathname.startsWith("/api/") ||
      /\.(js|css|svg|png|jpg|jpeg|webp|woff2?|ico|json|xml|txt)$/.test(
        pageUrl.pathname,
      )
    ) {
      return;
    }

    await fetch(UMAMI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": request.headers.get("user-agent") || "rvr-blog/1.0",
      },
      body: JSON.stringify({
        type: "event",
        payload: {
          website: siteId,
          url: pageUrl.pathname,
          hostname: pageUrl.hostname,
          language: request.headers.get("accept-language")?.split(",")[0] || "",
          referrer: request.headers.get("referer") || "",
          title: "",
          ...(ip ? { ip } : {}),
        },
      }),
    });
  }).catch((err) => {
    console.error("Umami reporting error:", err);
  });
}
