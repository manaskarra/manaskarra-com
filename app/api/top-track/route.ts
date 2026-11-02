import { NextResponse } from "next/server";
import { getTopTracks } from "@/lib/lastfm";

export const runtime = "nodejs";

type WeeklyTrack = { artist: string; title: string; url: string };

function parseTrack(value: unknown): WeeklyTrack | null {
  if (!value || typeof value !== "object") return null;
  const track = value as Record<string, unknown>;
  if (typeof track.artist !== "string" || !track.artist.trim() || typeof track.title !== "string" || !track.title.trim()) return null;
  let url = "";
  try {
    const parsed = new URL(typeof track.url === "string" ? track.url : "");
    if (parsed.protocol === "https:" && (parsed.hostname === "last.fm" || parsed.hostname.endsWith(".last.fm"))) url = parsed.toString();
  } catch { /* A valid title can still link to the user's weekly chart. */ }
  return { artist: track.artist, title: track.title, url };
}

export async function GET() {
  let track = parseTrack((await getTopTracks("7day", 1))?.[0]);

  // Opt-in local preview: reuse the public weekly chart on the existing site.
  // Deployed builds use LASTFM_API_KEY directly; no credentials reach the browser.
  if (!process.env.LASTFM_API_KEY && process.env.LASTFM_PUBLIC_PREVIEW === "true") {
    try {
      const response = await fetch("https://manaskarra.com/api/now-playing", {
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 1800 },
      });
      if (response.ok) {
        const data = await response.json();
        track = parseTrack(data?.week?.track);
      }
    } catch { /* The client falls back to the public Last.fm weekly chart. */ }
  }

  return NextResponse.json({ available: !!track, period: "7day", track }, {
    headers: {
      "Cache-Control": track ? "public, s-maxage=1800, stale-while-revalidate=300" : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
