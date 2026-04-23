"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_MS = 1100;
const TICK_MS = 55; // ~18fps — slower than rAF gives a mechanical "flip" feel

type Props = {
  text: string;
  className?: string;
  /** ms before scramble begins — lets the page settle first */
  delay?: number;
};

export function ScrambleText({ text, className, delay = 120 }: Props) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference — just show the real text immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      startRef.current = performance.now();

      timerRef.current = setInterval(() => {
        const elapsed = performance.now() - (startRef.current ?? 0);
        const progress = Math.min(elapsed / TOTAL_MS, 1);

        const chars = text.split("");
        // Only count non-space positions for stagger math
        const nonSpaces = chars.filter((c) => c !== " ").length;
        let nonSpacesSeen = 0;

        const next = chars.map((char) => {
          if (char === " ") return " ";
          const idx = nonSpacesSeen++;
          // Each character's resolve threshold, left-to-right stagger
          const resolveAt = (idx / nonSpaces) * 0.72 + 0.28;
          if (progress >= resolveAt) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setDisplay(next.join(""));

        if (progress >= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setDisplay(text);
        }
      }, TICK_MS);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, delay]);

  return (
    // aria-label ensures screen readers always get the real text regardless
    // of whatever random characters are currently displayed.
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
