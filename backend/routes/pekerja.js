import express from "express";
import { createPekerja } from "../controller/pekerja/createPekerja.js";
import { login } from "../controller/pekerja/login.js";
const router = express.Router();

router.use(logger);

router.post("/", createPekerja);
router.post("/login", login);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

export default router;
