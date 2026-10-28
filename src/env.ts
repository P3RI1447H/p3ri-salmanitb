import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  // Kaderisasi public API (kaderisasi-web-be-go), read on the server only.
  SERVER_BE_API: z.url().default("http://localhost:3333/v2"),
  // Kaderisasi member site, for "Daftar akun" and "Lupa password" links.
  NEXT_PUBLIC_KADERISASI_URL: z
    .url()
    .default("https://kaderisasi.salmanitb.com"),
  // Google sign-in (the shared Kaderisasi OAuth client). The redirect URI must
  // be registered on that client and listed in the web API's
  // GOOGLE_EXTRA_REDIRECT_URIS. Without both, the Google button is hidden.
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(env.error));
  throw new Error("Invalid environment variables");
}

export const ENV = env.data;
