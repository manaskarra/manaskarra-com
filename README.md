# manaskarra.com

Personal site of Manas Karra—Applied AI engineer and hip-hop producer as sledg3r. The design treats those disciplines as two sides of the same record: editorial typography, marginal notes, a cool indigo palette, and a lightweight CSS/SVG hero object.

Live at [manaskarra.com](https://manaskarra.com).

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site works without environment variables; add a Last.fm API key to `LASTFM_API_KEY` if you want the live listening strip.

## Verify

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

## Stack

- Next.js 16 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS v4 with custom light/dark tokens
- MDX via `next-mdx-remote/rsc`
- Shiki code highlighting
- Fraunces, Inter, and JetBrains Mono through `next/font`
- Last.fm API for the listening strip
- Vercel deployment
