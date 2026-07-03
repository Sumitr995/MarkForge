import { Router } from "express";

import healthRoutes from "./health.routes";
import documentRoutes from "./document.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/documents", documentRoutes);

export default router;