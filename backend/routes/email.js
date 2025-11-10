import express from "express";
import { logger } from "../middleware/logger.js";
import { protectRoute } from "../middleware/auth.js";
import { postEmail } from "../controller/email/post.js";
const router = express.Router();

router.use(logger);
router.post("/", postEmail);

export default router;
