import { ENV } from "../env";

// Google sign-in through the Kaderisasi web API (POST /v2/auth/google with
// this site's own redirectUri), the same PKCE flow as kaderisasi-web-fe.

export const GOOGLE_FLOW_COOKIE = "google-login-flow";
export const GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";

export function getGoogleConfig(): {
  clientId: string;
  redirectUri: string;
} | null {
  const clientId = ENV.GOOGLE_CLIENT_ID;
  const redirectUri = ENV.GOOGLE_REDIRECT_URI;
  if (!clientId || !redirectUri) return null;
  let url: URL;
  try {
    url = new URL(redirectUri);
  } catch {
    return null;
  }
  if (url.pathname !== GOOGLE_CALLBACK_PATH || url.search || url.hash)
    return null;
  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && url.hostname === "localhost")
  )
    return null;
  return { clientId, redirectUri };
}

export const googleFlowCookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: GOOGLE_CALLBACK_PATH,
  maxAge: 600,
};

/** Indonesian messages for the googleError codes on /masuk. */
export const GOOGLE_ERRORS: Record<string, string> = {
  GOOGLE_LOGIN_UNAVAILABLE:
    "Masuk dengan Google sedang tidak tersedia. Gunakan email dan kata sandi.",
  GOOGLE_LOGIN_EXPIRED: "Sesi masuk Google kedaluwarsa. Coba lagi.",
  GOOGLE_LOGIN_CANCELLED: "Masuk dengan Google dibatalkan.",
  GOOGLE_EMAIL_PASSWORD_REQUIRED:
    "Email ini sudah terdaftar dengan kata sandi. Masuk dengan email dan kata sandi.",
  GOOGLE_ACCOUNT_INACTIVE: "Akun Kaderisasi ini tidak aktif.",
  GOOGLE_LOGIN_FAILED: "Gagal masuk dengan Google. Coba lagi.",
};

/** Only same-site paths are followed after signing in. */
export const safeNext = (next: string | null | undefined): string =>
  next &&
  next.startsWith("/") &&
  !next.startsWith("//") &&
  !next.startsWith("/api/")
    ? next
    : "/status";
