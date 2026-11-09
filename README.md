# manaskarra.com

Manas Karra's personal workspace: a one-page portfolio for AI engineering, projects, writing, and music as sledg3r.

A desktop sidebar, compact project summaries, and accessible résumé and About me dialogs. System typography and near-black blue-grey surfaces keep the workspace in dark mode. Navigation has four links: Overview, Work, Writing, and Music. Work covers Experience and Projects, with magenta-wsp, verd and gitbiz. The violet sledg3r link in the bio leads to Music, with YouTube, BeatStars, and Instagram links. The sidebar includes pinned LinkedIn and YouTube links. Clicking the name or person icon opens About me, which includes Say hello and a personal Spotify profile.

A compact Last.fm record widget in the top-right toolbar shows the most-played track from the last seven days in two quiet lines, with the title and artist together. It appears after four seconds, once the track is ready, and stays hidden during loading or errors. The toolbar reserves its space on mobile so it never covers the navigation or page content. Close it with the × button or press Escape while the widget is focused; dismissal lasts for the current browser tab.

The lower sidebar has a short “Beyond the screen” introduction and an About me link to the full personal dialog. It stays at the bottom on desktop and follows the pinned links inside mobile navigation.

The intro includes a transparent dithered portrait derived from the supplied looking-down photo, with a small chin lift. It uses a theme-coloured SVG mask with a single hover/focus sweep, tap-to-toggle on touch screens, and reduced-motion support. The original photos are not included in the repository.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are required for the portfolio. Set `LASTFM_API_KEY` in `.env.local` to enable the weekly chart. `/api/top-track` calls `user.getTopTracks` with `period=7day` and `limit=1`, cached for 30 minutes. Missing data or API failures keep the listening card hidden.

For this local redesign preview only, `LASTFM_PUBLIC_PREVIEW=true` can read the existing site's public weekly chart when no API key is set. Leave that option unset on deployment; the deployed site uses its existing Last.fm key. Credentials never go to the browser.

## Verify

```bash
npx tsc --noEmit --incremental false
node --test scripts/check-magenta-demo.test.mjs
npm run build
```

With the site running locally, run the content checks and browser regression tests:

```bash
TEST_BASE_URL=http://localhost:3000 node --test scripts/*.test.mjs
```

The listening-card checks use Playwright Chromium (`npx playwright install chromium` if it is not already installed). They cover delayed loading, slow and failed responses, dismissal, blocked storage, mobile sizing, and reduced motion.

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
- `/blog/magenta-wsp` is the piano-to-flute article; `/projects/magenta-wsp` serves the standalone interactive demo.

The demo snapshot lives in `public/demos/magenta-wsp/`. Update it from a clean,
committed [magenta-wsp](https://github.com/manaskarra/magenta-wsp) checkout:

```bash
node scripts/sync-magenta-demo.mjs /path/to/magenta-wsp
node --test scripts/check-magenta-demo.test.mjs
```

The importer checks the release hashes, adapts HTML asset paths, and records the
source commit. Make demo changes in the source repository, then import them here.
Writing sorts posts by date; the Magenta post precedes verd.

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, MDX, next-themes. Vercel deploys the `main` branch to manaskarra.com. Local preview work does not deploy the site.

## Production deployment

Merge changes into `main` and let Vercel's connected Git integration deploy that commit. Production branch tracking must stay set to `main`, with automatic domain assignment enabled. Feature branches are previews.

`npm run build` checks production source metadata against GitHub's current `main` before and after the Next.js build. A stale commit, non-main branch, missing commit metadata, or failed remote lookup stops the production build. Local and preview builds are unaffected. Verify the guard with `node --test scripts/check-production-ref.test.mjs`.

The Vercel project's Ignored Build Step also uses the inline command documented in `scripts/vercel-ignore-build.sh`. Keeping the command in the dashboard protects historical source commits that do not contain the build guard. It skips production builds unless their source is the current `main`; preview builds continue normally. Keep this setting in sync when changing the deployment policy.

Do not promote or redeploy a historical deployment to publish new work. Vercel's owner-level Promote/Rollback actions can point the domains at an already-built deployment without rerunning these checks. To restore old code while keeping the deployment history current, revert it in Git and deploy the new `main` commit. After deployment, verify its source SHA matches GitHub `main` and check the public domain.
