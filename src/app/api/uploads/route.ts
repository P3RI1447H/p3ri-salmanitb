import { NextResponse, type NextRequest } from "next/server";
import { ENV } from "../../../env";
import { getToken } from "../../../lib/api";

// Forwards a photo upload ({name, mime, size, dataUrl}) to the API with the
// member token. A route handler, not a server action, because photos exceed
// the server action body limit.
export async function POST(req: NextRequest) {
  const token = await getToken();
  if (!token)
    return NextResponse.json(
      { message: "Sesi berakhir. Silakan masuk lagi." },
      { status: 401 }
    );
  const res = await fetch(ENV.SERVER_BE_API + "/p3ri/uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: await req.text(),
    cache: "no-store",
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
