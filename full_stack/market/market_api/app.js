const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')

const app = express()
require('dotenv').config()

app.set('port', process.env.PORT || 8010)

app.use(
    cors({
        origin: 'http://localhost:3010',
        credentials: true,
    })
)

app.use(morgan('dev'))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))

app.use((req, res, next) => {
    const err = new Error(`${method} ${req.url} 라우터경로가 없습니다.`)
    srr.status = 404 // err의 상태코드 404, 설정
    next(err)
})

app.use((err, req, res, next) => {
const statusCode = err.status || 500 // 에러코드가 있으면 사용 없으면 500
    const errorMessage = err.message || '서버 내부 오류' // 에러 메세지 있으면 사용, 없으면 후자 출력

    console.log(err)

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: err,
    }) 
})

app.options('*', cors()) // 모든 경로에 대한 options 요청 허용,
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})

