# manaskarra.com

Manas Karra's personal workspace: a one-page portfolio for AI engineering, projects, writing, and music as sledg3r.

A desktop sidebar, compact project summaries, and accessible résumé and About me dialogs. System typography and near-black blue-grey surfaces keep the workspace in dark mode. Navigation has four links: Overview, Work, Writing, and Music. Work covers Experience and Projects, with verd listed before gitbiz and RagaXonic. The violet sledg3r link in the bio leads to Music, with YouTube, BeatStars, and Instagram links. The sidebar includes pinned LinkedIn and YouTube links, with a compact Last.fm weekly top track at the bottom. Clicking the name or person icon opens About me, which includes Say hello and a personal Spotify profile.

The intro includes a transparent dithered portrait derived from the supplied looking-down photo, with a small chin lift. It uses a theme-coloured SVG mask with a single hover/focus sweep, tap-to-toggle on touch screens, and reduced-motion support. The original photos are not included in the repository.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are required for the portfolio. Set `LASTFM_API_KEY` in `.env.local` to enable the weekly chart. `/api/top-track` calls `user.getTopTracks` with `period=7day` and `limit=1`, cached for 30 minutes. Missing data or API failures leave a link to the weekly Last.fm chart.

For this local redesign preview only, `LASTFM_PUBLIC_PREVIEW=true` can read the existing site's public weekly chart when no API key is set. Leave that option unset on deployment; the deployed site uses its existing Last.fm key. Credentials never go to the browser.

## Verify

```bash
npx tsc --noEmit --incremental false
npm run build
```

## Content and routes

- `app/page.tsx`: homepage content; detailed employment information stays in the CV.
- `components/WorkspaceShell.tsx`: navigation, active section tracking, and shared shell.
- `app/workspace.css`: responsive workspace styles; `app/globals.css` defines theme colors.
- `components/ResumeDialog.tsx`: native dialog with PDF links and a mobile summary.
- `components/PersonalDialog.tsx`: About me dialog, opened through `#about`.
- `public/resume.pdf`: updated 2026 résumé.
- `app/api/top-track/route.ts`: weekly Last.fm track; the older `/api/now-playing` route remains available.
- `content/posts/`: existing MDX articles and their URLs.
- `/about` opens the homepage About me dialog; `/projects` and `/blog` redirect to homepage sections.
- `/resume` remains a standalone PDF landing page.

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, MDX, next-themes. Vercel deploys the `main` branch to manaskarra.com. Local preview work does not deploy the site.
