const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares')
const User = require('../models/user')
const Address = require('../models/address')
const { sequelize } = require('../models')
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
                status: 'conflict',
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
            message: '서버 내부 오류 발생.',
        })
    }
})

router.post('/join', async (req, res) => {
    const { name, isBusiness, userId, email, nick, phone, password, withdrawal, refund, address } = req.body

    if (!name || !userId || !email || !phone || !password) {
        return res.status(400).json({
            response: 'fail',
            status: 'Bad Request',
            message: '필수 필드가 누락되었습니다.',
        })
    }
    const transaction = await sequelize.transaction()

    try {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12

        const hash = await bcrypt.hash(password, saltRounds)

        let newUser

        if (!address) {
            // 주소가 없을 때: 유저만 등록
            newUser = await User.create({
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

            return res.status(201).json({
                response: 'success',
                status: 'created',
                message: '유저 등록 완료. (주소미입력)',
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
        } else {
            newUser = await User.create(
                {
                    name,
                    isBusiness,
                    userId,
                    email,
                    nick,
                    phone,
                    password: hash,
                    withdrawal,
                    refund,
                },
                { transaction },
            )

            await Address.create({ address, userId: newUser.id }, { transaction })
        }
        await transaction.commit()

        const result = await User.findOne({
            where: { id: newUser.id },
            attributes: ['id', 'isBusiness', 'name', 'userId', 'email', 'nick', 'phone'],
            include: [
                {
                    model: Address,
                    attributes: ['address'],
                },
            ],
        })

        return res.status(201).json({
            response: 'success',
            status: 'Created',
            message: '유저 및 주소 등록완료.',
            user: result,
        })
    } catch (err) {
        // console.error(err)
        res.status(500).json({
            response: 'fail',
            status: 'Internal Server Error',
            message: '서버 내부 오류 발생.',
        })
    }
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    console.log('Received Data:', req.body)
    passport.authenticate('local', (authError, user, info) => {
        console.log('authError: ', authError)
        console.log('user: ', user)
        console.log('info: ', info)
        if (authError) {
            return res.status(500).json({
                response: 'fail',
                status: 'Error',
                category: 'localStrategy 전략',
                message: '사용자 인증 과정 오류발생',
                error: authError,
            })
        }
        console.log(user)
        if (!user) {
            return res.status(401).json({
                response: 'fail',
                status: 'Unauthorized',
                message: info.message || '로그인 실패',
            })
        }

        // 여기서 loginError는 주로 세션에 관련된 에러,,, 로그인 인증에러는 위쪽에서 로컬스트레이트를 통해 검증함
        req.login(user, (loginError) => {
            if (loginError) {
                console.error('세션 저장 중 오류:', loginError)
                return res.status(500).json({
                    response: 'fail',
                    status: 'Error',
                    category: 'serializeUser',
                    message: '로그인 도중 오류 발생',
                    error: loginError,
                })
            }
            res.status(200).json({
                response: 'success',
                status: 'login',
                message: '로그인 성공',
                user: {
                    id: user.id,
                    userId: user.userId,
                    email: user.email,
                    nick: user.nick,
                },
            })
        })
    })(req, res, next)
})

router.get('/status', async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: {
                id: req.user.userId,
                nick: req.user.nick,
                email: req.user.email,
            },
        })
    } else {
        res.json({
            isAuthenticated: false,
        })
    }
})

router.get('/logout', isLoggedIn, async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log({
                path: 'routes/auth.js',
                code: {
                    line: 287,
                    method: 'GET',
                    endpoint: '/auth/logout',
                },
                error: err,
            })

            return res.status(500).json({
                response: 'fail',
                status: 'Error',
                message: '로그아웃 도중 에러 발생'
            })
        }

        res.status(200).json({
            response: 'success',
            status: 'logout complete',
            message: '로그아웃 성공.'
        })
    })
})

module.exports = router
