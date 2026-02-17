import { renderWithMeta } from "@deer/gfm";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  excerpt: string;
}

let blogCache: BlogPost[] | null = null;

function isValidDate(s: string): boolean {
  return !isNaN(new Date(s).getTime());
}

async function readDir(path: string): Promise<string[]> {
  const names: string[] = [];
  try {
    for await (const entry of Deno.readDir(path)) {
      if (entry.isFile && entry.name.endsWith(".md")) {
        names.push(entry.name);
      }
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      console.error(`Error reading directory ${path}:`, err);
    }
  }
  return names;
}

function extractExcerpt(html: string): string {
  const marker = "<!--more-->";
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    return html.slice(0, idx);
  }
  // Fall back to first paragraph
  const match = html.match(/<p>([\s\S]*?)<\/p>/);
  return match ? match[0] : "";
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (blogCache) return blogCache;

  const dir = new URL("../posts", import.meta.url).pathname;
  const files = await readDir(dir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = await Deno.readTextFile(`${dir}/${file}`);
    const { html, frontmatter } = await renderWithMeta(raw, {
      highlighter: "lowlight",
    });
    const fm = frontmatter ?? {};
    const date = String(fm.date ?? "");
    const tagsRaw = fm.tags;
    const tags = Array.isArray(tagsRaw)
      ? tagsRaw.map(String)
      : typeof tagsRaw === "string"
      ? tagsRaw.split(",").map((t: string) => t.trim())
      : [];

    posts.push({
      slug: file.replace(/\.md$/, ""),
      title: String(fm.title ?? file),
      description: String(fm.description ?? ""),
      date: isValidDate(date) ? date : "",
      author: String(fm.author ?? ""),
      tags,
      content: html,
      excerpt: extractExcerpt(html),
    });
  }

  blogCache = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return blogCache;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
