import type { ReactNode } from "react";

type PageHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="max-w-[850px]">
      {eyebrow && (
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-[clamp(3.25rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-fg">
        {title}
      </h1>
      <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-fg-subtle sm:text-[18px]">
        {description}
      </p>
    </header>
  );
}
