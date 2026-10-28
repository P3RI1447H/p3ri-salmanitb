"use server";

import { redirect } from "next/navigation";
import { ApiError, api, clearToken, setToken } from "../lib/api";
import type { Answers, Registration } from "../lib/form";

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
  // Only same-site paths are followed after signing in.
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/status");
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
