# manaskarra.com

Manas Karra's personal workspace: a one-page portfolio for AI engineering, projects, writing, and music as sledg3r.

The layout uses a persistent desktop sidebar, an accessible mobile navigation menu, expandable project notes, and a résumé dialog. Light and dark themes share a navy/violet palette and follow the system preference until changed. Music details stay small: meter bars, a decorative sequencer, and the existing Last.fm feed.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are required for the portfolio. Set `LASTFM_API_KEY` in `.env.local` to enable live listening information; without it, the music section links to the Last.fm profile.

## Verify

```bash
npx tsc --noEmit --incremental false
npm run build
```

## Content and routes

- `app/page.tsx`: homepage content and native expandable project entries.
- `components/WorkspaceShell.tsx`: navigation, active section tracking, and shared shell.
- `app/workspace.css`: responsive workspace and light/dark surface styles.
- `components/ResumeDialog.tsx`: keyboard-accessible native dialog with PDF links and a mobile summary.
- `public/resume.pdf`: updated 2026 résumé.
- `content/posts/`: existing MDX articles; their URLs remain available.
- `/about`, `/projects`, and `/blog` redirect to the corresponding homepage sections.
- `/resume` remains a standalone PDF landing page.

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, MDX, next-themes. Existing Vercel hosting remains the deployment target. Local preview work does not deploy the site.
