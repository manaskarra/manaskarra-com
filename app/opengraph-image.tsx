import { ImageResponse } from "next/og";

export const alt = "Manas Karra — AI engineer at Deriv. Music as sledg3r.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#171717", color: "#ececec", fontFamily: "sans-serif" }}>
      <div style={{ width: 238, height: "100%", padding: "43px 24px", display: "flex", flexDirection: "column", background: "#202020", fontSize: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 47 }}><span style={{ color: "#8b88ff" }}>mk</span><span>Manas Karra</span></div>
        {["Overview", "Projects", "Experience", "Writing", "Music"].map((label, i) => <div key={label} style={{ padding: "13px 12px", borderRadius: 8, marginBottom: 5, background: i === 0 ? "#303030" : "transparent", color: i === 0 ? "#ececec" : "#a0a0a0" }}>{label}</div>)}
        <div style={{ marginTop: "auto", fontSize: 14, color: "#a0a0a0" }}>Dubai, UAE</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 66px" }}>
        <div style={{ color: "#a0a0a0", fontSize: 16 }}>Overview</div>
        <div style={{ marginTop: 100, fontSize: 58, letterSpacing: -1 }}>Hi, I’m Manas.</div>
        <div style={{ marginTop: 25, fontSize: 25, lineHeight: 1.7, maxWidth: 680, color: "#a0a0a0" }}>I’m an AI engineer at Deriv, based in Dubai. I also produce hip-hop as sledg3r.</div>
        <div style={{ marginTop: "auto", fontSize: 16, color: "#a0a0a0" }}>manaskarra.com</div>
      </div>
    </div>, size
  );
}
