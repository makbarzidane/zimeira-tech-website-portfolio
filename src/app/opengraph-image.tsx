import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#020617",
          color: "white",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: "#064e3b",
              color: "#6ee7b7",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            ZT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 800 }}>ZIMEIRA TECH</div>
            <div style={{ fontSize: 22, color: "#a7f3d0" }}>
              Pagaralam dan sekitarnya
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              maxWidth: 900,
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            Jasa komputer, desain, dan website usaha Anda.
          </div>
          <div
            style={{
              maxWidth: 850,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#cbd5e1",
            }}
          >
            Instalasi Windows resmi, perawatan laptop/PC, rakit PC, desain
            promosi, dan website untuk kebutuhan lokal.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
