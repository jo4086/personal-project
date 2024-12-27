exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({
            status: 'unauthorized',
            message: '로그인이 필요합니다.'
        })
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.status(400).json({
            status: 'fail',
            message: '이미 로그인이 된 상태입니다.'
        })
    }
}
