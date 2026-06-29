import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import { healthSchema } from "../validators/document.validator";
import { validate } from "../validators/validate";
const router = Router();

router.get(
  "/",
  validate({
    body: healthSchema,
  }),
  healthCheck,
);

export default router;
