import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    R2_ACCOUNT_ID: z.string().min(1, "R2_ACCOUNT_ID is required"),
    R2_ACCESS_KEY_ID: z.string().min(1, "R2_ACCESS_KEY_ID is required"),
    R2_SECRET_ACCESS_KEY: z.string().min(1, "R2_SECRET_ACCESS_KEY is required"),
    R2_BUCKET_NAME: z.string().min(1, "R2_BUCKET_NAME is required"),
    CHATTER_BOX_API_URL: z.url(),
    CHATTER_BOX_API_KEY: z.string().min(1, "CHATTER_BOX_API_KEY is required"),
  },
  experimental__runtimeEnv: {},
  skipValidation:
    process.env.SKIP_VALIDATION === "true" ||
    process.env.SKIP_VALIDATION === "1",
});
