import { NextResponse, type NextRequest } from "next/server";

// The status page needs a Kaderisasi sign-in: visitors without a session go
// to /masuk and come back afterwards. /daftar handles sign-in as its first step.
export default function proxy(req: NextRequest) {
  if (!req.cookies.get("session")?.value) {
    const login = new URL("/masuk", req.nextUrl);
    login.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/status"],
};
