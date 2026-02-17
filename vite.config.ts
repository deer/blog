import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import { cpSync } from "node:fs";

function copyPosts(): Plugin {
  let ssr = false;
  return {
    name: "copy-posts",
    apply: "build",
    configResolved(config: ResolvedConfig) {
      ssr = !!config.build.ssr;
    },
    closeBundle() {
      if (!ssr) return;
      cpSync("posts", "_fresh/server/posts", { recursive: true });
    },
  };
}

export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [fresh(), tailwindcss(), copyPosts()],
});
