import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, stats } from "@/lib/data";

export const alt = `${profile.name} — Software Engineer & Community Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/brian-og.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#07070b",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* highlighter glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(229,255,0,0.55) 0%, rgba(229,255,0,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: 240,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(189,178,255,0.4) 0%, rgba(189,178,255,0) 70%)",
            display: "flex",
          }}
        />

        {/* Left: text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "#e5ff00",
                color: "#07070b",
                fontSize: 40,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              B
            </div>
            <div style={{ fontSize: 24, color: "#a0a0ad", display: "flex" }}>
              {profile.domain}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1,
              marginTop: 36,
              letterSpacing: -2,
            }}
          >
            Brian Bazurto
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              marginTop: 22,
              color: "#e5ff00",
              fontWeight: 600,
            }}
          >
            Software Engineer &amp; Community Builder
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 40,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 20px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
                  {s.value}
                </div>
                <div
                  style={{ fontSize: 18, color: "#a0a0ad", display: "flex" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 56px 0 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={360}
            height={500}
            style={{
              objectFit: "cover",
              borderRadius: 28,
              border: "4px solid #e5ff00",
            }}
            alt=""
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
