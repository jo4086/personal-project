const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares')
const { User, Address } = require('../models')
const router = express.Router()
const passport = require('passport')

router.post('/register', async (req, res) => {
    try {
        const address = req.body.address

        if (!address) {
            return res.status(204).json({
                response: 'success',
                status: 'non_created',
                message: '신규회원이 주소를 등록하지 않았습니다.',
            })
        }
        
        const newAddress = await Address.create({ address })
        res.status(201).json({
            response: 'success',
            status: 'created',
            message: '신규회원의 주소가 등록되었습니다.',
            address: newAddress,
        })
    } catch (err) {
        console.error({
            error: err,
            message: err.message,
            stack: err.stack,
            path: '/address/register'
        })
        res.status(500).json({
            response: 'error',
            status: 'internal_server_error',
            message: '서버에 오류가 발생하였습니다.'
        })
    }
})

module.exports = router