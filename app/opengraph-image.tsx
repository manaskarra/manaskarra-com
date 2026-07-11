import { ImageResponse } from "next/og";

export const alt = "Manas Karra — Applied AI engineer and music producer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#080b14",
        color: "#f1f2f6",
        padding: "72px 80px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "68%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#8b88ff", fontSize: 22, fontFamily: "ui-monospace, monospace" }}>
          <span>MK</span>
          <span style={{ color: "#a3a7b8" }}>dxb ↔ hyd</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Georgia, serif", fontSize: 94, lineHeight: 0.9, letterSpacing: "-0.055em" }}>
            Manas Karra<span style={{ color: "#8b88ff" }}>.</span>
          </div>
          <div style={{ color: "#a3a7b8", fontSize: 28, lineHeight: 1.45, maxWidth: 650 }}>
            Applied AI engineer. Hip-hop producer. Two sides of the same curious brain.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, color: "#a3a7b8", fontSize: 18, fontFamily: "ui-monospace, monospace" }}>
          <span>systems / sound</span>
          <span style={{ color: "#8b88ff" }}>manaskarra.com</span>
        </div>
      </div>

      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", right: -35, top: 105, display: "flex", alignItems: "center", justifyContent: "center", background: "repeating-radial-gradient(circle, #0b0d16 0 18px, #242633 19px, #0b0d16 21px 32px)", border: "2px solid #282d3a", boxShadow: "0 0 90px rgba(139,136,255,.22)" }}>
        <div style={{ width: 138, height: 138, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#4b45dc", color: "white", fontFamily: "ui-monospace, monospace", fontSize: 24 }}>
          ai / 808
        </div>
      </div>
    </div>,
    size
  );
}
