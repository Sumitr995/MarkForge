import fs from "fs/promises";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../common/errors/api-error";
import { deleteFile } from "../common/utils/file";
import { env } from "../config/env";

const PDF_MAGIC = Buffer.from("%PDF");

export function hasPdfMagicBytes(header: Buffer): boolean {
  if (header.length < PDF_MAGIC.length) return false;
  return header.subarray(0, PDF_MAGIC.length).equals(PDF_MAGIC);
}

async function readMagicBytes(filePath: string, length = 8): Promise<Buffer> {
  const handle = await fs.open(filePath, "r");
  try {
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, 0);
    return buffer;
  } finally {
    await handle.close();
  }
}

/**
 * Verifies the uploaded file is a real PDF by magic bytes + enforces
 * the size limit server-side (defense in depth beyond Multer).
 */
export async function validatePdfMagic(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const file = (req as Request & { file?: Express.Multer.File }).file;
  if (!file) return next();

  try {
    const maxBytes = env.MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      await deleteFile(file.path);
      return next(
        new ApiError(413, `File too large — max ${env.MAX_FILE_SIZE_MB} MB`),
      );
    }

    const header = await readMagicBytes(file.path, 8);
    if (!hasPdfMagicBytes(header)) {
      await deleteFile(file.path);
      return next(new ApiError(400, "Only PDF files are allowed"));
    }

    return next();
  } catch (err) {
    if (file?.path) await deleteFile(file.path);
    return next(err);
  }
}
