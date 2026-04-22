# manaskarra.com

Personal site of Manas Karra — Swiss-modern, typography-first, built with Next.js 16.

Live at [manaskarra.com](https://manaskarra.com).

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** strict mode
- **Tailwind CSS v4** with a soft-indigo theme
- **MDX** for blog posts via `next-mdx-remote/rsc`
- **rehype-pretty-code** + Shiki for code highlighting
- **Fraunces / Inter / JetBrains Mono** self-hosted via `next/font/google`
- **next/og** for auto-generated blog OG images
- Deployed to **Vercel**, DNS on **Cloudflare Registrar**

## Local development

Requires Node 20+ (Next 16 requirement).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx              # Root layout (fonts, metadata, nav, footer)
  page.tsx                # Home
  about/page.tsx
  projects/page.tsx
  blog/
    page.tsx              # Blog index
    [slug]/
      page.tsx            # Individual post (SSG)
      opengraph-image.tsx # Auto-generated OG image per post
  beats/page.tsx
  music/page.tsx
  sitemap.ts
  robots.ts
  globals.css             # Theme tokens + MDX prose styles
components/
  Nav.tsx
  Footer.tsx
  SectionHeader.tsx
content/
  posts/*.mdx             # Blog posts with frontmatter
lib/
  site.ts                 # Site config (name, bio, social links, nav)
  posts.ts                # MDX reader + frontmatter validator
  mdx.ts                  # rehype/remark options for MDX
  projects.ts             # Project metadata
  beats.ts                # Beat metadata (YouTube/SoundCloud embeds)
next.config.ts            # Security headers
```

## Writing a post

Create `content/posts/my-slug.mdx`:

```mdx
---
title: My Post Title
date: 2026-04-22
excerpt: A short, one-sentence description that shows up in the blog index and OG tags.
tags: [tag-one, tag-two]
---

Post body in MDX. Markdown works, as do React components.
```

On next build, the post is auto-prerendered at `/blog/my-slug`, a share image is generated at `/blog/my-slug/opengraph-image`, and it shows up in `sitemap.xml`.

### Slug rules

- Lowercase letters, digits, and hyphens only
- Must start with a letter or digit
- Max 120 chars

## Deployment

The domain `manaskarra.com` is registered on **Cloudflare Registrar**, with DNS managed on Cloudflare and the site hosted on **Vercel**.

### First-time deploy

1. Push this repo to GitHub.
2. In Vercel: **New Project** → **Import Git Repository** → select this repo. Vercel auto-detects Next.js, no config needed.
3. Site goes live at `https://<project-name>.vercel.app` within ~60s.

### Wiring `manaskarra.com`

1. In Vercel dashboard → **Project → Settings → Domains** → add both:
   - `manaskarra.com`
   - `www.manaskarra.com`
   Set one as primary; the other redirects.
2. In Cloudflare dashboard → `manaskarra.com` → **DNS → Records**, add:

   | Type  | Name | Target                | Proxy    |
   | ----- | ---- | --------------------- | -------- |
   | A     | `@`  | `76.76.21.21`         | **DNS only (grey cloud)** |
   | CNAME | `www`| `cname.vercel-dns.com`| **DNS only (grey cloud)** |

3. Vercel auto-issues a Let's Encrypt SSL certificate within a few minutes.

> ⚠️ **Critical:** Cloudflare's orange-cloud proxy breaks Vercel's SSL issuance. Both records **must** be set to DNS-only (grey cloud).

### Environment variables

Set these in **Vercel → Settings → Environment Variables** (and locally in `.env.local` — never commit it):

| Key              | Required | Purpose                                                       |
| ---------------- | -------- | ------------------------------------------------------------- |
| `LASTFM_API_KEY` | optional | Powers the live scrobble ticker in the header. Without it, the ticker shows a graceful fallback and a link to last.fm. Get one free at [last.fm/api/account/create](https://www.last.fm/api/account/create). |

The Last.fm username is read from `lib/site.ts` (`lastfmUser`). No client secret is needed — the public `user.getRecentTracks` / `user.getTopArtists` / `user.getInfo` endpoints only require an API key, which is server-side only and never shipped to the browser.

Never commit env files to git.

## Editing content

All content lives in `lib/` and `content/posts/`:

- **Bio / social links / emails** → `lib/site.ts`
- **Projects** → `lib/projects.ts`
- **About page copy** → `app/about/page.tsx`
- **Scrobble ticker data** → `lib/lastfm.ts` + `app/api/now-playing/route.ts`
- **Blog posts** → `content/posts/*.mdx`

Every push to `main` triggers an auto-deploy on Vercel.

## Security notes

- All third-party embeds (YouTube, SoundCloud, Spotify) run inside sandboxed iframes with a strict `sandbox` attribute and IDs/URLs validated against regex allowlists before use.
- Frontmatter dates are coerced through `new Date()` with NaN checks; post slugs are validated against a strict regex and resolved paths must live within `content/posts/` (no traversal).
- Security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options) are set in `next.config.ts` and applied to every response.
- No secrets, API keys, or credentials live in the repo. Vercel env vars are the source of truth for anything sensitive.
