const validateField = (type, value, confirmValue = '') => {
    switch (type) {
        case 'phone':
            return /^[0-9]+$/.test(value) ? '' : '숫자만 입력 가능합니다.'
        case 'withdrawal':
            return /^[0-9\-]+$/.test(value) ? '' : '숫자와 "-"만 입력 가능합니다.'
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

/* 
        case 'phone':
            return /^[0-9]+$/.test(value) ? '' : '숫자만 입력 가능합니다.'
*/

/* const AREA_CODES = {
    '02': '서울특별시, 과천시, 광명시',
    '031': '경기도',
    '032': '인천광역시, 부천시',
    '033': '강원도',
    '041': '충청남도',
    '042': '대전광역시, 계룡시, 공주시 반포면 일부',
    '043': '충청북도',
    '044': '세종특별자치시',
    '051': '부산광역시',
    '052': '울산광역시',
    '053': '대구광역시, 경산시',
    '054': '경상북도, 대구광역시 군위군',
    '055': '경상남도',
    '061': '전라남도',
    '062': '광주광역시',
    '063': '전북특별자치도',
    '064': '제주특별자치도',
}



const formatPhoneNumber = (value) => {
    // 숫자만 남기기
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.startsWith('01')) {
        // 휴대전화
        const mainNumber = cleaned.slice(3) // 앞 3자리 제거
        if (mainNumber.length === 7) {
            return `${cleaned.slice(0, 3)}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3)}`
        } else if (mainNumber.length === 8) {
            return `${cleaned.slice(0, 3)}-${mainNumber.slice(0, 4)}-${mainNumber.slice(4)}`
        }
    } else if (cleaned.startsWith('1')) {
        // 특수번호
        if (cleaned.length <= 8) {
            return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
        }
        return cleaned
    } else {
        // 유선전화
        const areaCode = Object.keys(AREA_CODES).find((code) => cleaned.startsWith(code))
        if (areaCode) {
            const mainNumber = cleaned.slice(areaCode.length) // 지역번호 제거
            if (mainNumber.length <= 7) {
                return `${areaCode}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3)}`
            } else {
                return `${areaCode}-${mainNumber.slice(0, mainNumber.length - 4)}-${mainNumber.slice(-4)}`
            }
        }
    }

    return cleaned // 매칭되지 않는 경우 그대로 반환
} */

/* 
            case 'phone':{
            const cleaned = value.replace(/\D/g, '') // 숫자만 남기기

            // 시작 부분 검증
            if (!/^(01|02|0[3-6][1-9])/.test(cleaned)) {
                return '유효한 전화번호 형식이 아닙니다..'
            }

            // 길이 검증
            if (cleaned.startsWith('01')) {
                if (cleaned.length !== 10 && cleaned.length !== 11) {
                    return '10자리 또는 11자리를 입력하세요.'
                }
            } else if (/^(02|0[3-6][1-9])/.test(cleaned)) {
                const areaCodeLength = cleaned.startsWith('02') ? 2 : 3 // 지역번호 길이
                const mainNumberLength = cleaned.length - areaCodeLength
                if (mainNumberLength < 7 || mainNumberLength > 8) {
                    return '9자리 또는 10자리를 입력하세요.'
                }
            }
        }
     */
