const validateField = (type, value, confirmValue = '') => {
    switch (type) {
        case 'phone':
            return /^[0-9\-]+$/.test(value) ? '' : '숫자와 "-"만 입력 가능합니다.'
        case 'withdrawal':
        case 'refund':
            return /^[0-9\-]+$/.test(value) ? '' : '숫자와 "-"만 입력 가능합니다.'
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '올바른 이메일 형식이 아닙니다.'
        case 'userId':
            return value.length <= 12 ? '' : '아이디는 12자 이내로 입력하세요.'
        case 'nick':
            return value.length <= 12 ? '' : '닉네임은 12자 이내로 입력하세요.'
        case 'password':
            return /[!@#$%^&*(),.?":{}|<>]/.test(value) ? '' : '비밀번호에는 특수문자를 포함해야 합니다.'
        case 'confirmPassword':
            return value === confirmValue ? '' : '비밀번호가 일치하지 않습니다.'
        default:
            return ''
    }
}

export default validateField