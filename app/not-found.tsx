import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <Section marker="404 / off track" label="nothing here">
      <div className="flex min-h-[58vh] flex-col justify-center py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">needle skipped</p>
        <h1 className="mt-5 max-w-[10ch] font-serif text-[clamp(4.5rem,14vw,9rem)] leading-[0.82] tracking-[-0.06em] text-fg">
          Wrong side of the record.
        </h1>
        <p className="mt-8 max-w-[48ch] text-[17px] leading-relaxed text-fg-subtle">
          This page moved, never existed, or got lost somewhere between systems and sound.
        </p>
        <Link href="/" className="button-primary mt-8 w-fit">back home <span aria-hidden="true">→</span></Link>
      </div>
    </Section>
  );
}
