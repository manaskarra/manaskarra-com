"use client";

/**
 * Thin wrapper that dynamically loads the heavy Three.js canvas only on the
 * client (ssr: false). This keeps the Three.js bundle out of the SSR pass and
 * prevents "window is not defined" errors from WebGL bootstrap code.
 */

import dynamic from "next/dynamic";

const VinylCanvas = dynamic(() => import("./VinylCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" aria-hidden="true" />,
});

export function VinylScene({ className }: { className?: string }) {
  return <VinylCanvas className={className} />;
}
