import { type Config } from "tailwindcss";
import { safelist } from "fresh_blog/mod.ts";
import colors from "tailwindcss/colors.js";

export default {
  darkMode: "class",
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: colors.white,
          foreground: colors.black,
          mutedBackground: colors.gray[200],
          mutedForeground: colors.gray[700],
        },
        dark: {
          background: colors.black,
          foreground: colors.white,
          mutedBackground: colors.gray[700],
          mutedForeground: colors.gray[200],
        },
      },
    },
  },
  safelist: safelist,
} satisfies Config;
