import express from 'express'
const router = express.Router()
import {createPekerja} from "../controllers/pekerja/pekerjaController.js"

router.use(logger)

router.post('/', createPekerja);

function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

export default router;