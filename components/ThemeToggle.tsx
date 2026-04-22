"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`switch to ${next} mode`}
      title={`switch to ${next} mode`}
      className="group relative inline-flex items-center justify-center w-7 h-7 rounded-full text-fg-subtle hover:text-accent transition-colors cursor-pointer"
    >
      <span
        aria-hidden="true"
        className="font-mono text-[11px] leading-none select-none"
        suppressHydrationWarning
      >
        {mounted ? (isDark ? "●" : "○") : "○"}
      </span>
      <span className="sr-only">toggle theme</span>
    </button>
  );
}
