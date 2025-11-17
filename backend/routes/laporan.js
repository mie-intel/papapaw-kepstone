import express from "express";
import { create, deleteByIdSurat, view, edit } from "../controller/laporan/index.js";
import { logger } from "../middleware/logger.js";
import { protectRoute, checkHSE } from "../middleware/auth.js";
import {
  updateStatus,
  revisiLaporan,
  tolakLaporan,
  getPelapor,
} from "../controller/laporan/laporan.js";
const router = express.Router();

router.use(logger);

router.post("/", protectRoute, checkHSE, create);
router.put("/", protectRoute, checkHSE, edit);
router.get("/", view);
router.delete("/", protectRoute, checkHSE, deleteByIdSurat);
router.patch("/:id/status", protectRoute, updateStatus);
router.patch("/:id/revisi", protectRoute, revisiLaporan);
router.patch("/:id/tolak", protectRoute, tolakLaporan);
router.get("/:id/pelapor", protectRoute, getPelapor);

export default router;
