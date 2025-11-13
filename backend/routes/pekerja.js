import express from "express";
import { register, login } from "../controller/pekerja/index.js";
import { logger } from "../middleware/logger.js";
const router = express.Router();

router.use(logger);

router.post("/register", register);
router.post("/login", login);

export default router;
