import express from "express";
import { register, login } from "../controller/pekerja";
const router = express.Router();

router.use(logger);

router.post("/", register);
router.post("/login", login);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

export default router;
