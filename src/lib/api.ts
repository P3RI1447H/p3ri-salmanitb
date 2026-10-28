import { cookies } from "next/headers";
import { ENV } from "../env";
import type { Form, Registration } from "./form";

// Server-only helpers for the Kaderisasi public API. The member token lives
// in an httpOnly cookie on this site and never reaches client JavaScript.

export const SESSION_COOKIE = "session";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function getToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value || undefined;
}

export async function setToken(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    path: "/",
    sameSite: "lax",
    secure: ENV.NODE_ENV === "production",
    httpOnly: true,
  });
}

export async function clearToken() {
  (await cookies()).delete(SESSION_COOKIE);
}

async function failureMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const body = JSON.parse(text) as {
      message?: string;
      errors?: { message?: string }[];
    };
    return (
      body.errors?.[0]?.message ??
      body.message ??
      "Terjadi kesalahan. Coba lagi."
    );
  } catch {
    return text || "Terjadi kesalahan. Coba lagi.";
  }
}

/** Calls the API with the member token; throws ApiError on failure. */
export async function api<T>(
  path: string,
  init: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");
  const bearer = token ?? (await getToken());
  if (bearer) headers.set("Authorization", `Bearer ${bearer}`);
  const res = await fetch(ENV.SERVER_BE_API + path, {
    ...init,
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new ApiError(res.status, await failureMessage(res));
  return ((await res.json()) as { data: T }).data;
}

export const getForm = () => api<Form>("/p3ri/form", {}, "");

export const getRegistration = () =>
  api<Registration | null>("/p3ri/registration");

export type Profile = {
  name?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  whatsapp?: string | null;
  line?: string | null;
  major?: string | null;
  intake_year?: number | null;
  university?: { name?: string | null } | null;
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await api<{ profile?: Profile }>("/profiles");
    return data.profile ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) throw error;
    return null;
  }
}
