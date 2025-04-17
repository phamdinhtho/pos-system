import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_OPENAI_API_URL: z
    .string()
    .url()
    .min(1, "OPENAI_API_URL is required"),
  NEXT_PUBLIC_OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
});

const env = envSchema.parse({
  NEXT_PUBLIC_OPENAI_API_URL: process.env.NEXT_PUBLIC_OPENAI_API_URL,
  NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default env;
