import express from "express";
import { createPekerja } from "../controller/pekerja/createPekerja.js";
const router = express.Router();

router.use(logger);

router.post("/", createPekerja);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

export default router;
