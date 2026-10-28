"use server";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, api, clearToken, setToken } from "../lib/api";
import type { Answers, Registration } from "../lib/form";
import {
  GOOGLE_FLOW_COOKIE,
  getGoogleConfig,
  googleFlowCookieOptions,
  safeNext,
} from "../lib/google";

export type AccountResult = { error?: string; exists?: boolean };

const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LOGIN_ERRORS: Record<string, string> = {
  USER_NOT_FOUND: "Email belum terdaftar.",
  WRONG_PASSWORD:
    "Kata sandi salah. Kalau biasanya masuk dengan Google, pakai tombol Google di atas.",
};

/** Email-first step: tells the form whether to ask for a password or a new account. */
export async function checkEmail(rawEmail: string): Promise<AccountResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!isEmail(email)) return { error: "Masukkan alamat email yang valid." };
  try {
    const res = await api<{ exists: boolean }>(
      "/auth/check-email",
      { method: "POST", body: JSON.stringify({ email }) },
      ""
    );
    return { exists: res.exists };
  } catch {
    return { error: "Gagal memeriksa email. Coba lagi." };
  }
}

async function loginWith(
  email: string,
  password: string
): Promise<string | null> {
  const res = await api<{ token?: { token?: string } }>(
    "/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) },
    ""
  );
  const token = res.token?.token;
  if (!token) return null;
  await setToken(token);
  return token;
}

/** Signs an existing Kaderisasi member in, then continues to next. */
export async function signIn(input: {
  email: string;
  password: string;
  next: string;
}): Promise<AccountResult> {
  const email = input.email.trim().toLowerCase();
  if (!isEmail(email) || !input.password)
    return { error: "Isi email dan kata sandi." };
  try {
    if (!(await loginWith(email, input.password)))
      return { error: "Gagal masuk. Coba lagi." };
  } catch (error) {
    if (error instanceof ApiError)
      return {
        error:
          LOGIN_ERRORS[error.message] ??
          (error.status >= 500
            ? "Email atau kata sandi tidak valid."
            : error.message),
      };
    return { error: "Gagal masuk. Coba lagi." };
  }
  redirect(safeNext(input.next));
}

/** Creates a Kaderisasi account (usable on kaderisasi.salmanitb.com too) and signs in. */
export async function signUp(input: {
  fullname: string;
  email: string;
  password: string;
  next: string;
}): Promise<AccountResult> {
  const fullname = input.fullname.trim().replace(/\s+/g, " ");
  const email = input.email.trim().toLowerCase();
  if (fullname.length < 2) return { error: "Isi nama lengkapmu." };
  if (fullname.length > 255) return { error: "Nama terlalu panjang." };
  if (!isEmail(email)) return { error: "Masukkan alamat email yang valid." };
  if (input.password.length < 6)
    return { error: "Kata sandi minimal 6 karakter." };
  try {
    await api(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ fullname, email, password: input.password }),
      },
      ""
    );
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.message === "EMAIL_ALREADY_REGISTERED"
    )
      return {
        error: "Email ini sudah terdaftar. Masuk dengan kata sandimu.",
        exists: true,
      };
    return { error: "Gagal membuat akun. Coba lagi." };
  }
  try {
    if (!(await loginWith(email, input.password)))
      return {
        error: "Akun dibuat, tapi gagal masuk. Silakan masuk.",
        exists: true,
      };
  } catch {
    return {
      error: "Akun dibuat, tapi gagal masuk. Silakan masuk.",
      exists: true,
    };
  }
  redirect(safeNext(input.next));
}

/** Starts Google sign-in: PKCE flow kept in a short-lived httpOnly cookie. */
export async function startGoogleLogin(data: FormData): Promise<never> {
  const destination = safeNext(String(data.get("next") ?? ""));
  const config = getGoogleConfig();
  if (!config)
    redirect(
      `${destination === "/daftar" ? "/daftar" : "/masuk"}?${new URLSearchParams({ googleError: "GOOGLE_LOGIN_UNAVAILABLE", next: destination })}`
    );
  const state = randomBytes(32).toString("base64url");
  const codeVerifier = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  (await cookies()).set(
    GOOGLE_FLOW_COOKIE,
    JSON.stringify({
      state,
      codeVerifier,
      nonce,
      destination,
      createdAt: Date.now(),
    }),
    googleFlowCookieOptions
  );
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: createHash("sha256")
      .update(codeVerifier)
      .digest("base64url"),
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();
  redirect(url.toString());
}

export async function logout() {
  await clearToken();
  redirect("/");
}

type SaveResult = { error?: string; registration?: Registration };

export async function saveRegistration(input: {
  choices: string[];
  answers: Answers;
}): Promise<SaveResult> {
  try {
    const registration = await api<Registration>("/p3ri/registration", {
      method: "PUT",
      body: JSON.stringify(input),
    });
    return { registration };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401)
      return { error: "Sesi berakhir. Silakan masuk lagi." };
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Gagal menyimpan. Coba lagi." };
  }
}
