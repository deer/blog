import { renderWithMeta } from "@deer/gfm/lowlight";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
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

export function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(" ").length;
}

export function readingTimeMinutes(html: string): number {
  return Math.max(1, Math.round(countWords(html) / 225));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const isDeploy = !!Deno.env.get("DENO_DEPLOYMENT_ID");
  if (blogCache && isDeploy) return blogCache;

  const dir = new URL("../posts", import.meta.url).pathname;
  const files = await readDir(dir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = await Deno.readTextFile(`${dir}/${file}`);
    const { html, frontmatter } = await renderWithMeta(raw);
    const fm = frontmatter ?? {};
    if (fm.draft === true) continue;
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
    });
  }

  blogCache = posts.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    if (isNaN(ta) && isNaN(tb)) return 0;
    if (isNaN(ta)) return 1;
    if (isNaN(tb)) return -1;
    return tb - ta;
  });
  return blogCache;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAdjacentPosts(
  slug: string,
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const posts = await getBlogPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // posts are sorted newest-first, so "next" is older (idx+1), "prev" is newer (idx-1)
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
