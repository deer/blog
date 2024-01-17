import { type Config } from "tailwindcss";
import { safelist } from "fresh_blog/mod.ts";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  safelist: safelist,
} satisfies Config;
