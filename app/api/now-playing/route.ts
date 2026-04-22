import { NextResponse } from "next/server";
import {
  getRecentTracks,
  getTopAlbums,
  getTopArtists,
  getTopTracks,
} from "@/lib/lastfm";

export const runtime = "nodejs";

/**
 * Returns the user's current / most recent Last.fm track plus a
 * weekly snapshot (top track / artist / album over the last 7 days).
 *
 * Now-playing polling is the latency-sensitive part — the route itself
 * is CDN-cached for 60s. The weekly aggregates have their own longer
 * revalidate window inside `lastfmCall`, so they don't hit Last.fm on
 * every route miss.
 *
 * We fetch 3 of each chart so the panel can dedupe: when the top track
 * sits on the top album (common for single-album listening weeks), the
 * two rows would show identical `artist · title`. We fall through to
 * the #2 album so the panel reveals actual breadth instead of echoing
 * the track row.
 */

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export async function GET() {
  const [current, topTracks, topArtists, topAlbums] = await Promise.all([
    getRecentTracks(1),
    getTopTracks("7day", 3),
    getTopArtists("7day", 1),
    getTopAlbums("7day", 3),
  ]);

  const track = topTracks?.[0] ?? null;
  const artist = topArtists?.[0] ?? null;

  const album =
    topAlbums?.find((candidate) => {
      if (!track) return true;
      return (
        normalize(candidate.artist) !== normalize(track.artist) ||
        normalize(candidate.title) !== normalize(track.title)
      );
    }) ??
    topAlbums?.[0] ??
    null;

  const hasCurrent = !!current && current.length > 0;
  const hasWeek = !!(track || artist || album);

  const body = hasCurrent || hasWeek
    ? {
        available: true,
        current: current?.[0] ?? null,
        week: {
          track,
          artist,
          album,
        },
      }
    : { available: false, current: null, week: null };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}
