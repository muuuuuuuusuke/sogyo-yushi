import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "創業融資の返済シミュレーター";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(
    path.join(process.cwd(), "src/og/NotoSansJP-Bold.otf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f7f8fa",
          color: "#101828",
          padding: "70px 80px",
          fontFamily: "Noto",
        }}
      >
        <div style={{ fontSize: 32, color: "#98a2b3", letterSpacing: 2 }}>
          創業融資・事業資金の借入
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, marginTop: 18, lineHeight: 1.3 }}>
          その借入、毎月いくら
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.3 }}>
          返すことになるか
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 36, color: "#475467" }}>
          {`例：500万円・年2.5%・7年 → `}
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#1d3a5f" }}>
            月64,946円
          </div>
          <div style={{ fontSize: 34, color: "#475467", marginLeft: 22 }}>
            利息合計 45.5万円
          </div>
        </div>
        <div style={{ marginTop: "auto", fontSize: 28, color: "#98a2b3" }}>
          元利均等・元金均等・据置対応 ｜ 創業融資の返済シミュレーター
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Noto", data: font, weight: 700, style: "normal" }] },
  );
}
