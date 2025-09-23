import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateStatus, revisiLaporan } from "../controller/laporan/laporan.js";

const router = express.Router();

router.patch("/:id/status", protectRoute, updateStatus);
router.patch("/:id/revisi", protectRoute, revisiLaporan);

export default router;