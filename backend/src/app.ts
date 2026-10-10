import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import router from "./routes/";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./middleware/request-id.js";
import { generalLimiter } from "./middleware/rate-limit.js";
import { env } from "./config/env.js";

const app = express();

// Never leak the framework via headers.
app.disable("x-powered-by");

// Trust Render / Vercel proxies so per-IP rate limiting sees the real IP.
app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://markforge.sumitr995.me",
  "https://markforge.app",
  ...(env.FRONTEND_ORIGIN ? [env.FRONTEND_ORIGIN] : []),
  ...(env.BACKEND_URL ? [env.BACKEND_URL] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin / curl / server-to-server (no Origin header).
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-request-id"],
    maxAge: 600,
  }),
);

app.use(requestIdMiddleware);

app.use(
  morgan("combined", {
    skip: (req) => req.path === "/api/v1/health",
  }),
);

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api/v1", generalLimiter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;
