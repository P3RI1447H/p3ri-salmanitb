import { z } from "zod";

const envSchema = z.object({
  // Add environment variables here as needed, e.g.:
  // NEXT_PUBLIC_API_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const ENV = env.data;
