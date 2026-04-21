import { createDefine } from "fresh";

export interface State {
  title?: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  structuredData?: Record<string, unknown>;
}

export const SITE = {
  name: "RvR",
  url: "https://reed.vonredwitz.com",
  defaultTitle: "RvR",
  defaultDescription: "A developer blog by Reed",
  defaultOgImage: "/og.png",
  defaultOgImageAlt: "RvR — a developer blog by Reed",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  locale: "en_US",
  author: {
    name: "Reed von Redwitz",
    email: "blog@vonredwitz.com",
    github: "https://github.com/deer",
  },
};

export const define = createDefine<State>();
