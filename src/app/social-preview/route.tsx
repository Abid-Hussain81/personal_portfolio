import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "linear-gradient(125deg, #f7f5f0 48%, #e6eee1)",
          color: "#272822",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 36, color: "#294b46" }}>
          {profile.role}
        </div>
        <div style={{ display: "flex", marginTop: 42, fontSize: 26, color: "#4e5046" }}>
          Web applications · Booking platforms · API integrations
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
