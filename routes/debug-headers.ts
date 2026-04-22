import { define } from "../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const headers: Record<string, string> = {};
    ctx.req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return Response.json({
      headers,
      ctxInfo: ctx.info,
    });
  },
});
