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

type LoginResult = { error?: string };

const LOGIN_ERRORS: Record<string, string> = {
  USER_NOT_FOUND: "Email belum terdaftar di Kaderisasi Salman.",
  WRONG_PASSWORD: "Kata sandi salah.",
};

export async function login(
  _: LoginResult,
  data: FormData
): Promise<LoginResult> {
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  const next = String(data.get("next") ?? "");
  if (!email || !password) return { error: "Isi email dan kata sandi." };
  try {
    const res = await api<{ token?: { token?: string } }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
      ""
    );
    const token = res.token?.token;
    if (!token) return { error: "Gagal masuk. Coba lagi." };
    await setToken(token);
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
  redirect(safeNext(next));
}

/** Starts Google sign-in: PKCE flow kept in a short-lived httpOnly cookie. */
export async function startGoogleLogin(data: FormData): Promise<never> {
  const destination = safeNext(String(data.get("next") ?? ""));
  const config = getGoogleConfig();
  if (!config)
    redirect(
      `/masuk?${new URLSearchParams({ googleError: "GOOGLE_LOGIN_UNAVAILABLE", next: destination })}`
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
