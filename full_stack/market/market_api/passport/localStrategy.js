const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'identify',
                passwordField: 'password',
            },
            async (identify, password, done) => {
                try {
                    const isEmail = identify.includes('@')

                    const user = await User.findOne({
                        where: isEmail ? { email: identify } : { userId: identify },
                    })
                    if (!user) {
                        return done(null, false, { message: '사용자의 이메일 또는 ID를 찾을 수 업습니다.' })
                    }
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (!isMatch) {
                        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                    }
                    return done(null, user)
                } catch (err) {
                    console.error(err)
                    return done(err)
                }
            },
        ),
    )
}

/* 
module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'identify',
                passwordField: 'password',
            },
            async (identify, password, done) => {
                try {
                    // 이메일 여부
                    const isEmail = identify.includes('@')

                    // DB에 email or userId로 검색
                    const user = await User.findOne({
                        where: isEmail ? { email: identify } : { userId: identify }
                    })

                    if (!user) {
                        return done(null, false, { message: '이메일 또는 ID를 찾을 수 없습니다.')
                    }
                    // 비밀번호 검증
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                    }
                }
                    return done(null, user);
            } catch (err) {
                return done(error);
                done(err)
            }
            
        )
}
    )
}
 */
