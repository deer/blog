import { type Config } from "tailwindcss";
import { safelist } from "https://deno.land/x/fresh_blog@0.0.5/mod.ts";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  safelist: safelist,
} satisfies Config;
