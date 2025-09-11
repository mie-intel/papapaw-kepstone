const express = require('express')
const router = express.Router()

router.use(logger)

router.post('/', (req,res) => {
    res.send("Post pekerja")
})

function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router