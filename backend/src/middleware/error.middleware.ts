import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ApiError } from "../common/errors/api-error";
import { env } from "../config/env";

function requestId(req: Request): string {
  return req.requestId ?? "unknown";
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const rid = requestId(req);

  // Multer errors → user-safe messages, no internals.
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: `File too large — max ${env.MAX_FILE_SIZE_MB} MB`,
        requestId: rid,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Upload failed — please try a valid PDF.",
      requestId: rid,
    });
  }

  if (err instanceof ApiError) {
    // Log server-side with request ID; client gets safe message only.
    if (err.statusCode >= 500) {
      console.error(`[${rid}] ${err.statusCode}: ${err.message}`);
    }
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors ?? [],
      requestId: rid,
    });
  }

  // Unknown errors: log details server-side, generic message to client.
  console.error(`[${rid}] Unhandled error:`, err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong — please try again.",
    requestId: rid,
  });
};
