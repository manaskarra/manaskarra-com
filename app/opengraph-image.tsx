import { ImageResponse } from "next/og";

export const alt = "Manas Karra — AI, music and a little more about me.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#11141c", color: "#e9ecf2", fontFamily: "sans-serif" }}>
      <div style={{ width: 238, height: "100%", padding: "43px 24px", display: "flex", flexDirection: "column", background: "#181d27", fontSize: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 47 }}><span style={{ color: "#8b88ff" }}>mk</span><span>Manas Karra</span></div>
        {["Overview", "Work", "Writing", "Music"].map((label, i) => <div key={label} style={{ padding: "13px 12px", borderRadius: 8, marginBottom: 5, background: i === 0 ? "#2b3445" : "transparent", color: i === 0 ? "#e9ecf2" : "#a1a8b7" }}>{label}</div>)}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 66px" }}>
        <div style={{ color: "#a1a8b7", fontSize: 16 }}>Overview</div>
        <div style={{ marginTop: 100, fontSize: 58, letterSpacing: -1 }}>Hi, I’m Manas.</div>
        <div style={{ marginTop: 25, fontSize: 25, lineHeight: 1.7, maxWidth: 680, color: "#a1a8b7" }}>I love AI and music. Based in Dubai, making hip-hop as sledg3r.</div>
        <div style={{ marginTop: "auto", fontSize: 16, color: "#a1a8b7" }}>manaskarra.com</div>
      </div>
    </div>, size
  );
}
