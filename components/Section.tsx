import type { ReactNode } from "react";

type SectionProps = {
  marker?: string;
  label?: string;
  sidebar?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "header" | "div";
};

/**
 * Two-column layout: margin note on the left (section marker like "§ 00 / home"
 * plus optional label), main content on the right. Collapses to a single
 * column on mobile with the marker appearing inline above the content.
 *
 * The marker is sticky within its section on desktop, so it stays visible
 * as you scroll through the content — magazine-style marginalia.
 *
 * Pass `sidebar` for additional margin content (e.g. a compact CV block);
 * it renders below the marker/label and is hidden on mobile to keep the
 * top of the page clean.
 */
export function Section({
  marker,
  label,
  sidebar,
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  const classes = [
    "grid min-w-0 grid-cols-1 lg:grid-cols-[132px_minmax(0,1fr)] xl:grid-cols-[156px_minmax(0,1fr)]",
    "gap-5 lg:gap-10 xl:gap-14",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasAside = Boolean(marker || label || sidebar);

  return (
    <Tag className={classes}>
      {hasAside && (
        <div className="flex h-fit items-baseline justify-between gap-4 border-b border-rule pb-3 font-mono text-[11px] leading-relaxed text-fg-subtle lg:sticky lg:top-24 lg:block lg:border-0 lg:pb-0">
          {marker && (
            <p className="whitespace-nowrap text-fg-subtle">
              <span className="tabular-nums">{marker}</span>
            </p>
          )}
          {label && (
            <p className="text-[10px] uppercase tracking-[0.12em] text-fg-subtle lg:mt-1">
              {label}
            </p>
          )}
          {sidebar && <aside aria-label="Background" className="mt-10 hidden lg:block">{sidebar}</aside>}
        </div>
      )}
      <div className={`min-w-0 ${hasAside ? "" : "lg:col-start-2"}`}>{children}</div>
    </Tag>
  );
}
