import express from "express";
import { create } from "../controller/laporan/index.js";
import { logger } from "../middleware/logger.js";
import { protectRoute, authorizeHSE } from "../middleware/auth.js";
import { updateStatus, revisiLaporan, tolakLaporan } from "../controller/laporan/laporan.js";
const router = express.Router();

router.use(logger);

router.post("/", protectRoute, authorizeHSE, create);
router.patch("/:id/status", protectRoute, updateStatus);
router.patch("/:id/revisi", protectRoute, revisiLaporan);
router.patch("/:id/tolak", protectRoute, tolakLaporan);

export default router;
