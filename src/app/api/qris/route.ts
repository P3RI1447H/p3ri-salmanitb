import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const imageBuffer = readFileSync(join(process.cwd(), "src/assets/qris.jpeg"));

export function GET() {
  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": "inline",
    },
  });
}
