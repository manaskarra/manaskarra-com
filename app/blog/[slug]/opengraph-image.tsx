import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPostBySlug, formatPostDate } from "@/lib/posts";

export const runtime = "nodejs";
export const dynamicParams = false;
export const alt = "Article by Manas Karra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "manas karra";
  const date = post ? formatPostDate(post.date) : "";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#080b14",
          color: "#f1f2f6",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#a3a7b8",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span>manaskarra.com</span>
          <span>{date}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontWeight: 500,
              color: "#f1f2f6",
              maxWidth: "95%",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {title}
          </div>

          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 20,
                fontSize: 22,
                color: "#8b88ff",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {tags.slice(0, 4).map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #282d3a",
            fontSize: 20,
            color: "#a3a7b8",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span>manas karra</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#8b88ff",
            }}
          >
            <span>§</span>
            <span>blog</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
