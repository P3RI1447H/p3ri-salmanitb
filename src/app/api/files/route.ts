import { NextResponse, type NextRequest } from "next/server";
import { ENV } from "../../../env";
import { getToken } from "../../../lib/api";

// Streams one of the member's own uploads from the API.
export async function GET(req: NextRequest) {
  const token = await getToken();
  const key = req.nextUrl.searchParams.get("key");
  if (!token || !key) return new NextResponse(null, { status: 404 });
  const res = await fetch(
    ENV.SERVER_BE_API + "/p3ri/files?" + new URLSearchParams({ key }),
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );
  if (!res.ok) return new NextResponse(null, { status: res.status });
  return new NextResponse(res.body, {
    headers: {
      "Content-Type":
        res.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
