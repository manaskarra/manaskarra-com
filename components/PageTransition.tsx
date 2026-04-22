"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content and re-triggers a subtle fade+lift animation on every
 * route change. Keyed by pathname so React remounts the wrapper, which
 * restarts the CSS animation without JS orchestration.
 *
 * The app shell (nav, scrobble ticker, footer) stays stable while content
 * swaps — that contrast is what makes the transition feel intentional,
 * not scattered.
 *
 * Motion follows impeccable's rules: transform + opacity only, ease-out-expo
 * for natural deceleration, no bounce. `prefers-reduced-motion` respected
 * via globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
