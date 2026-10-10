import rateLimit from "express-rate-limit";

// General API limiter: 100 requests / 15 min per IP.
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests — please try again in a few minutes.",
  },
});

// Stricter upload limiter: 20 uploads / hour per IP.
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Upload limit reached — please try again later.",
  },
});
