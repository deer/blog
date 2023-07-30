/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import {
  BlogOptions,
  blogPlugin,
} from "https://deno.land/x/fresh_blog@0.0.2/mod.ts";

import { ga4Plugin } from "https://deno.land/x/fresh_ga4@0.0.1/mod.ts";

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

await start(manifest, {
  plugins: [twindPlugin(twindConfig), blogPlugin(blogOptions), ga4Plugin()],
});
