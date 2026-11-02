"use client";

import { useId, useState } from "react";

/** The same portrait mask takes its colour from the active site theme. */
export function HologramPortrait() {
  const id = useId().replace(/:/g, "");
  const [illuminated, setIlluminated] = useState(false);
  const mask = `${id}-portrait`;
  const contrast = `${id}-contrast`;
  const fade = `${id}-fade`;
  const sweep = `${id}-sweep`;

  return <button
    type="button"
    className="hologram-portrait"
    aria-label="Illuminate pixel portrait of Manas"
    aria-pressed={illuminated}
    data-illuminated={illuminated}
    onClick={() => setIlluminated(value => !value)}
  >
    <svg viewBox="0 0 1254 1254" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id={contrast} colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope="3.2" intercept="-2" />
            <feFuncG type="linear" slope="3.2" intercept="-2" />
            <feFuncB type="linear" slope="3.2" intercept="-2" />
          </feComponentTransfer>
        </filter>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity=".65" />
          <stop offset=".5" stopColor="white" />
          <stop offset=".72" stopColor="white" stopOpacity=".7" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={sweep} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset=".42" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset=".5" stopColor="var(--accent)" stopOpacity=".9" />
          <stop offset=".56" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}-pixels`} width="16" height="16" patternUnits="userSpaceOnUse"><rect width="11" height="11" fill="white" /></pattern>
        <mask id={`${id}-pixel-grid`}><rect width="1254" height="1254" fill={`url(#${id}-pixels)`} /></mask>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
          <image href="/images/manas-dither-v2.webp" width="1254" height="1254" filter={`url(#${contrast})`} />
        </mask>
        <mask id={`${id}-dissolve`}><rect width="1254" height="1254" fill={`url(#${fade})`} /></mask>
      </defs>
      <g mask={`url(#${id}-dissolve)`}>
        <g mask={`url(#${mask})`}>
          <g mask={`url(#${id}-pixel-grid)`}>
          <rect className="portrait-ink" width="1254" height="1254" />
          <rect className="portrait-sweep" width="1254" height="1254" fill={`url(#${sweep})`} />
          </g>
        </g>
      </g>
    </svg>
  </button>;
}
