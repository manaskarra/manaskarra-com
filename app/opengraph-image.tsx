import { ImageResponse } from "next/og";

export const alt = "Manas Karra — AI engineer at Deriv. Music as sledg3r.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#080b14", color: "#f1f2f6", fontFamily: "sans-serif" }}>
      <div style={{ width: 238, height: "100%", padding: "43px 28px", display: "flex", flexDirection: "column", background: "#0e121d", borderRight: "1px solid #282d3a", fontSize: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 58 }}><div style={{ padding: "8px 10px", border: "1px solid #282d3a", borderRadius: 7, color: "#8b88ff" }}>mk</div><span>Manas Karra</span></div>
        <div style={{ color: "#a3a7b8", fontSize: 12, letterSpacing: 2, marginBottom: 17 }}>WORKSPACE</div>
        {["Overview", "Selected work", "Experience", "Writing", "Music"].map((label, i) => <div key={label} style={{ padding: "13px 12px", borderRadius: 5, marginBottom: 5, background: i === 0 ? "#1e223a" : "transparent", color: i === 0 ? "#f1f2f6" : "#a3a7b8" }}>{label}</div>)}
        <div style={{ marginTop: "auto", fontSize: 14, color: "#a3a7b8" }}>Dubai, UAE</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 66px" }}>
        <div style={{ color: "#a3a7b8", fontSize: 16 }}>manas / overview</div>
        <div style={{ marginTop: 65, color: "#8b88ff", fontSize: 15, letterSpacing: 3 }}>AI ENGINEER · DUBAI</div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 68, letterSpacing: -3 }}>Hi, I’m Manas<span style={{ color: "#8b88ff" }}>.</span></div>
        <div style={{ marginTop: 20, fontSize: 25, lineHeight: 1.7, maxWidth: 680, color: "#a3a7b8" }}>I build agents, analytics tools, and the services that keep them running.</div>
        <div style={{ marginTop: 30, fontSize: 19 }}>Currently at Deriv. Music as sledg3r.</div>
        <div style={{ marginTop: "auto", paddingTop: 25, borderTop: "1px solid #282d3a", fontSize: 16, color: "#8b88ff" }}>manaskarra.com</div>
      </div>
    </div>, size
  );
}
