import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

import {
  BlogOptions,
  blogPlugin,
} from "https://deno.land/x/fresh_blog@0.0.5/mod.ts";

import { ga4Plugin } from "https://deno.land/x/fresh_ga4@0.0.4/mod.ts";

const blogOptions: BlogOptions = {
  title: "Reed's Blog",
  rootPath: import.meta.url,
  navbarItems: {
    Archive: "/archive",
    About: "/about",
    Contact: "/contact",
    Projects: "/projects",
  },
};

export default defineConfig({
  plugins: [blogPlugin(blogOptions), ga4Plugin(), tailwind()],
});
