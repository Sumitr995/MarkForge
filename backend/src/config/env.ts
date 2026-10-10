import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load env in order: .env -> .env.local / .env.production
// dotenv by default loads .env only — Next.js-style .env.local/.env.production are NOT auto-loaded in Express
const nodeEnv = process.env.NODE_ENV || "development";

// 1) base .env (if exists)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 2) environment-specific override (.env.production or .env.local)
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${nodeEnv}`),
  override: true,
});

// 3) for local dev, also try .env.local explicitly when NODE_ENV=development
if (nodeEnv === "development") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
    override: true,
  });
}

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  GROQ_API_KEY: z.string().optional().default(""),
  GROQ_MODEL: z.string().min(1).default("openai/gpt-oss-120b"),
  OPENAI_API_KEY: z.string().optional().default(""),
  PYTHON_PATH: z.string().optional().default(""),
  PYTHON_SCRIPT: z.string().optional().default(""),
  ASSETS_DIR: z.string().optional().default(""),
  BACKEND_URL: z.string().optional().default(""),
  FRONTEND_ORIGIN: z.string().optional().default(""),
  ASSET_RETENTION_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(24 * 60 * 60 * 1000),
  MAX_FILE_SIZE_MB: z.coerce.number().int().min(1).max(100).default(20),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  const env = parsed.data;
  // Fail fast in production when secrets are missing.
  if (env.NODE_ENV === "production" && !env.GROQ_API_KEY) {
    throw new Error(
      "Invalid environment configuration: GROQ_API_KEY is required in production",
    );
  }
  return env;
}

export const env: Env = loadEnv();
