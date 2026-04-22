import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTime: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*$/;

function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug) && slug.length <= 120;
}

function assertStringField(
  value: unknown,
  name: string,
  slug: string
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`post "${slug}" missing required frontmatter field: ${name}`);
  }
  return value;
}

function coerceDateField(value: unknown, slug: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  throw new Error(`post "${slug}" has invalid or missing date`);
}

function coerceTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((t): t is string => typeof t === "string" && t.length < 64);
}

function readPostFile(slug: string): Post | null {
  if (!isValidSlug(slug)) return null;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  const resolved = path.resolve(filePath);
  const resolvedDir = path.resolve(POSTS_DIR);
  if (!resolved.startsWith(resolvedDir + path.sep)) {
    return null;
  }

  if (!fs.existsSync(resolved)) return null;

  const raw = fs.readFileSync(resolved, "utf8");
  const { data, content } = matter(raw);

  const title = assertStringField(data.title, "title", slug);
  const date = coerceDateField(data.date, slug);
  const excerpt = assertStringField(data.excerpt, "excerpt", slug);

  const stats = readingTime(content);

  return {
    slug,
    title,
    date,
    excerpt,
    tags: coerceTags(data.tags),
    readingTime: stats.text,
    content,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter(isValidSlug);
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts: Post[] = [];
  for (const slug of slugs) {
    const post = readPostFile(slug);
    if (post) posts.push(post);
  }
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
