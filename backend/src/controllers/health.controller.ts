import { Request, Response } from "express";
import { ApiError } from "../common/errors/api-error";

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "AI Markdown Distiller",
    version: "v1",
    timestamp: new Date().toISOString(),
  });
};