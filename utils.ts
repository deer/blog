import { createDefine } from "fresh";

export interface State {
  title?: string;
  description?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
}

export const SITE = {
  name: "RvR",
  url: "https://rvr-blog.deno.dev",
  defaultTitle: "RvR",
  defaultDescription: "A developer blog by Reed",
};

export const define = createDefine<State>();
