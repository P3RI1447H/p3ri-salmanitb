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
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(env.error));
  throw new Error("Invalid environment variables");
}

export const ENV = env.data;
