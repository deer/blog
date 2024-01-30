import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

import { BlogOptions, blogPlugin } from "fresh_blog/mod.ts";

import { ga4Plugin } from "fresh_ga4/mod.ts";

const blogOptions: BlogOptions = {
  title: "Reed's Blog",
  rootPath: import.meta.url,
  navbarItems: {
    Archive: "/archive",
    About: "/about",
    Contact: "/contact",
    Projects: "/projects",
  },
  comments: {
    source: "disqus",
    shortname: "reedvr",
  },
};

export default defineConfig({
  plugins: [blogPlugin(blogOptions), ga4Plugin(), tailwind()],
});
