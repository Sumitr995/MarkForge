import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const REQUEST_ID_HEADER = "x-request-id";

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incoming = req.header(REQUEST_ID_HEADER);
  const id =
    typeof incoming === "string" && incoming.length >= 8
      ? incoming.slice(0, 64)
      : crypto.randomUUID();
  req.requestId = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}
