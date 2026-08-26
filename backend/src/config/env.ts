import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GROQ_MODEL: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  PYTHON_PATH: process.env.PYTHON_PATH || "",
  ASSETS_DIR: process.env.ASSETS_DIR || "",
  ASSET_RETENTION_MS: Number(process.env.ASSET_RETENTION_MS) || 24 * 60 * 60 * 1000, // 24h — keep extracted images readable for a day
};
