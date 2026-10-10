import { Router } from "express";

import { uploadDocument } from "../controllers/document.controller";
import { upload } from "../middleware/upload.middleware";
import { validatePdfMagic } from "../middleware/validate-pdf";
import { uploadLimiter } from "../middleware/rate-limit";

const router = Router();

router.post(
  "/upload",
  uploadLimiter,
  upload.single("file"),
  validatePdfMagic,
  uploadDocument,
);

export default router;
