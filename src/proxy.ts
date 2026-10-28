import { NextResponse, type NextRequest } from "next/server";

// Pages that need a Kaderisasi sign-in send visitors without a session to
// /masuk and bring them back afterwards.
export default function proxy(req: NextRequest) {
  if (!req.cookies.get("session")?.value) {
    const login = new URL("/masuk", req.nextUrl);
    login.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/daftar", "/status"],
};
