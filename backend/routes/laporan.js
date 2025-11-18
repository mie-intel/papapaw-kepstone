import express from "express";
import {
  approve,
  create,
  deleteByIdSurat,
  edit,
  tolakLaporan,
  view,
} from "../controller/laporan/index.js";
import { logger } from "../middleware/logger.js";
import { protectRoute, checkHSE } from "../middleware/auth.js";
const router = express.Router();

router.use(logger);

router.post("/", protectRoute, checkHSE, create);
router.put("/", protectRoute, checkHSE, edit);
router.get("/", view);
router.delete("/", protectRoute, checkHSE, deleteByIdSurat);
router.put("/approve", protectRoute, approve);
router.put("/tolak", protectRoute, tolakLaporan);
export default router;
