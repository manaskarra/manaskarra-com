import type { Metadata } from "next";
import { WorkspaceShell } from "@/components/WorkspaceShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  keywords: [
    "Manas Karra",
    "Applied AI Engineer",
    "agentic systems",
    "multi-agent systems",
    "sledg3r",
    "music producer",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    creator: site.twitter,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className="h-full"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">skip to content</a>
          <WorkspaceShell>{children}</WorkspaceShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
