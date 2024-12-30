// board-api/passport/index.js

const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

console.log(local)

module.exports = () => {
    // 1. 직렬화(serializeUser)
    passport.serializeUser((user, done) => {
        done(null, user.id) 
    })

    // 2. 역 직렬화(deserializeUser)
    // 세션에 저장된 User ID를 바탕으로 User 정보 조회
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user)) // 사용자 정보 복구 후 done()으로 사용자 정보 반환
            .catch((error) => done(error)) // 에러 발생 시 done()으로 에러 반환
    })
    // 로컬 전력(Local Strategy) 초기화
    local()
}
