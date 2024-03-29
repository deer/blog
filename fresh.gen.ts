// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $about from "./routes/about.tsx";
import * as $contact from "./routes/contact.tsx";
import * as $projects from "./routes/projects.tsx";
import * as $Disqus from "./islands/Disqus.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/about.tsx": $about,
    "./routes/contact.tsx": $contact,
    "./routes/projects.tsx": $projects,
  },
  islands: {
    "./islands/Disqus.tsx": $Disqus,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
