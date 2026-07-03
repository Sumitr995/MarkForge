import multer from "multer";
import path from "path";
import crypto from "crypto";

import { ApiError } from "../common/errors/api-error";

// storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "uploads/temp");
  },

  filename: (_req, file, callback) => {
    const uniqueName = crypto.randomUUID() + path.extname(file.originalname);

    callback(null, uniqueName);
  },
});

// file validation
const fileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
  if (file.mimetype !== "application/pdf") {
    return callback(new ApiError(400, "Only PDF files are allowed"));
  }

  callback(null, true);
};

export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
