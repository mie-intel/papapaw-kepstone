const express = require('express');
const router = express.Router();
const  pekerjaController= require('../controller/pekerjaController');

function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

router.post('/', pekerjaController.createPekerja);

module.exports = router;