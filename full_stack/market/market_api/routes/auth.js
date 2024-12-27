const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { iSLoggedIn, isNotLoggedIn } = require('../middlewares')
const User = require('../models/user')
const router = express.Router()
require('dotenv').config()

router
    .post('/join', async (req, res, next) => {
        const { name, isBusiness, userId, email, nick, phone, password, withdrawal, refund } = req.body
        try {
             
        } catch(err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: '회원가입 진행중 에러 발생',
                err
            })
        }
    })
