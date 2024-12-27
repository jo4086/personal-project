const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    res.status(200).json({
        status:'success',
        message:'기본 Request 라우트경로입니다.',
         timestamp: new Date().toISOString(),
    })
})

module.exports = router
