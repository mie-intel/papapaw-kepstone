import express from "express";
import { create, view } from "../controller/laporan/index.js";
import { logger } from "../middleware/logger.js";
import { protectRoute, authorizeHSE } from "../middleware/auth.js";
import {
  updateStatus,
  revisiLaporan,
  tolakLaporan,
  getPelapor,
} from "../controller/laporan/laporan.js";
const router = express.Router();

router.use(logger);

router.post("/", protectRoute, authorizeHSE, create);
router.get("/", view);
router.patch("/:id/status", protectRoute, updateStatus);
router.patch("/:id/revisi", protectRoute, revisiLaporan);
router.patch("/:id/tolak", protectRoute, tolakLaporan);
router.get("/:id/pelapor", protectRoute, getPelapor);

export default router;
