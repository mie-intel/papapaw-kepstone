import express from "express";
import { create } from "../controller/laporan/index.js";
import { logger } from "../middleware/logger.js";
const router = express.Router();

router.use(logger);

router.post("/", create);

export default router;
