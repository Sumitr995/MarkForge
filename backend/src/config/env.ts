import dotenv from "dotenv";
import path from "path";

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
// (so `NODE_ENV=development` loads .env -> .env.development -> .env.local)
if (nodeEnv === "development") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
    override: true,
  });
}

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GROQ_MODEL: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  PYTHON_PATH: process.env.PYTHON_PATH || "",
  // Optional override for convert.py location — useful in Docker where layout differs
  PYTHON_SCRIPT: process.env.PYTHON_SCRIPT || "",
  ASSETS_DIR: process.env.ASSETS_DIR || "",
  ASSET_RETENTION_MS: Number(process.env.ASSET_RETENTION_MS) || 24 * 60 * 60 * 1000, // 24h — keep extracted images readable for a day
};
