const express = require('express');
const router = express.Router();
const {
    createPekerja,
} = require('../controllers/objectModel');

function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

router.route('/')
    .post(logger, createPekerja);