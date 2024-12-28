const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { iSLoggedIn, isNotLoggedIn } = require('../middlewares')
const User = require('../models/user')
const Address = require('../models/address')
const router = express.Router()
require('dotenv').config()

const blurCheck = async (req, res, next) => {
    try {
        const { type } = req.params
        let { data } = req.body

        data = data?.trim()

        if (!type || !data) {
            return res.status(400).json({
                response: 'fail',
                status: 'Bad Request',
                message: '요청 형식이 잘못 되었습니다.',
            })
        }

        const validTypes = ['userId', 'email', 'phone', 'address', 'nick', 'withdrawal', 'refund', 'password']

        const typeLabels = {
            email: '이메일',
            userId: '아이디',
            phone: '전화번호',
            address: '주소지',
            nick: '닉네임',
            withdrawal: '출금계좌',
            refund: '환불계좌',
            password: '비밀번호',
        }

        if (!validTypes.includes(type)) {
            return res.status(400).json({
                response: 'fail',
                status: 'Bad Request',
                message: '올바르지 않은 type입니다.',
            })
        }

        req.type = type
        req.value = data
        req.label = typeLabels[type]

        next()
    } catch (err) {
        console.error(err)
    }
}

router.post('/join/check/:type', blurCheck, async (req, res) => {
    try {
        const { type, value, label } = req
        console.log(type, value, label)

        const allowEmptyFields = ['withdrawal', 'refund']

        if (!value || value.trim() === '') {
            if (allowEmptyFields.includes(type)) {
                return res.status(200).json({
                    response: 'success',
                    status: 'OK',
                    message: `${label}은(는) 입력되지 않았습니다. 중복 검사에서 제외됩니다.`,
                })
            }

            return res.status(400).json({
                response: 'fail',
                status: 'Bad Request',
                message: `${label}은(는) 필수 입력 사항입니다.`,
            })
        }

        const message = `사용 가능한 ${label}입니다.`

        const condition = { [type]: value }
        if (type === 'address') {
            const typeBlur = await Address.findOne({ where: condition })

            if (typeBlur) {
                return res.status(409).json({
                    response: 'fail',
                    status: 'Conflict',
                    message: `${label}이(가) 이미 사용 중입니다.`,
                })
            }
            // console.log(`검토`)
            return res.status(200).json({
                response: 'success',
                status: 'OK',
                message,
            })
        }
        const typeBlur = await User.findOne({ where: condition })

        if (typeBlur) {
            return res.status(409).json({
                response: 'fail',
                status: 'Conflict',
                message: `${label}이(가) 이미 사용 중입니다.`,
            })
        }
        // console.log(`검토`)
        return res.status(200).json({
            response: 'success',
            status: 'OK',
            message,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            response: 'fail',
            status: 'Internal Server Error',
            message: '서버 내부 오류가 발생하였습니다.',
        })
    }
})

router.post('/join', async (req, res) => {
    const { name, isBusiness, userId, email, nick, phone, password, withdrawal, refund } = req.body

    if (!name || !userId || !email || !phone || !password) {
        return res.status(400).json({
            response: 'fail',
            status: 'Bad Request',
            message: '필수 필드가 누락되었습니다.',
        })
    }
    try {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12

        const hash = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            name,
            isBusiness,
            userId,
            email,
            nick,
            phone,
            password: hash,
            withdrawal,
            refund,
        })
        res.status(201).json({
            response: 'success',
            status: 'Created',
            message: '유저의 회원가입이 등록되었습니다.',
            user: {
                uniqueId: newUser.id,
                name: newUser.name,
                isBusiness: newUser.isBusiness,
                userId: newUser.userId,
                email: newUser.email,
                nick: newUser.nick,
                phone: newUser.phone,
            },
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            response: 'fail',
            status: 'Internal Server Error',
            message: '서버 내부 오류가 발생하였습니다.',
        })
    }
})

// router
//     .post('/join', async (req, res, next) => {

//         const { name, isBusiness, userId, email, nick, phone, password, withdrawal, refund } = req.body
//         try {

//         } catch(err) {
//             console.error(err)
//             res.status(500).json({
//                 status: 'error',
//                 message: '회원가입 진행중 에러 발생',
//                 err
//             })
//         }
//     })

module.exports = router
