import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { ENV } from "../../../../../env";
import { setToken } from "../../../../../lib/api";
import {
  GOOGLE_FLOW_COOKIE,
  getGoogleConfig,
  googleFlowCookieOptions,
  safeNext,
} from "../../../../../lib/google";

const flowSchema = z.object({
  state: z.string().length(43),
  codeVerifier: z.string().length(43),
  nonce: z.string().length(43),
  destination: z.string(),
  createdAt: z.number(),
});

const KNOWN_ERRORS = [
  "GOOGLE_EMAIL_PASSWORD_REQUIRED",
  "GOOGLE_ACCOUNT_INACTIVE",
  "GOOGLE_LOGIN_UNAVAILABLE",
];

// Google redirects here with ?code&state. The code is exchanged by the web
// API, which only accepts this callback when it is in GOOGLE_EXTRA_REDIRECT_URIS.
export async function GET(request: NextRequest): Promise<NextResponse> {
  const config = getGoogleConfig();
  const origin = config
    ? new URL(config.redirectUri).origin
    : request.nextUrl.origin;
  const cookieStore = await cookies();
  const rawFlow = cookieStore.get(GOOGLE_FLOW_COOKIE)?.value;
  cookieStore.set(GOOGLE_FLOW_COOKIE, "", {
    ...googleFlowCookieOptions,
    maxAge: 0,
  });
  let destination = "/status";
  const finish = (path: string): NextResponse => {
    const response = NextResponse.redirect(new URL(path, origin), 303);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  };
  const fail = (code: string) =>
    finish(
      `/masuk?${new URLSearchParams({ googleError: code, next: destination })}`
    );
  try {
    const flow = flowSchema.parse(JSON.parse(rawFlow || "null"));
    destination = safeNext(flow.destination);
    const state = request.nextUrl.searchParams.get("state") || "";
    if (
      state.length !== flow.state.length ||
      !timingSafeEqual(Buffer.from(state), Buffer.from(flow.state)) ||
      Date.now() - flow.createdAt > 600_000 ||
      flow.createdAt > Date.now()
    )
      return fail("GOOGLE_LOGIN_EXPIRED");
    if (request.nextUrl.searchParams.has("error"))
      return fail("GOOGLE_LOGIN_CANCELLED");
    if (!config) return fail("GOOGLE_LOGIN_UNAVAILABLE");
    const code = request.nextUrl.searchParams.get("code");
    if (!code) return fail("GOOGLE_LOGIN_FAILED");
    const result = await fetch(`${ENV.SERVER_BE_API}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        codeVerifier: flow.codeVerifier,
        nonce: flow.nonce,
        redirectUri: config.redirectUri,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const body = (await result.json().catch(() => ({}))) as {
      message?: string;
      data?: { token?: { token?: string } };
    };
    if (!result.ok)
      return fail(
        body.message && KNOWN_ERRORS.includes(body.message)
          ? body.message
          : "GOOGLE_LOGIN_FAILED"
      );
    const token = body.data?.token?.token;
    if (!token) return fail("GOOGLE_LOGIN_FAILED");
    await setToken(token);
    return finish(destination);
  } catch {
    return fail(rawFlow ? "GOOGLE_LOGIN_FAILED" : "GOOGLE_LOGIN_EXPIRED");
  }
}
