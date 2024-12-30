const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.startsWith('01')) {
        if (cleaned.length === 10) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
        } else if (cleaned.length === 11) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`
        }
    } else if (/^(02|0[3-6][1-9])/.test(cleaned)) {
        const areaCode = cleaned.startsWith('02') ? 2 : 3
        const mainNumber = cleaned.slice(areaCode)
        if (mainNumber.length <= 7) {
            return `${cleaned.slice(0, areaCode)}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3)}`
        }
        return `${cleaned.slice(0, areaCode)}-${mainNumber.slice(0, mainNumber.length - 4)}-${mainNumber.slice(-4)}`
    }

    return cleaned // 유효하지 않은 경우 그대로 반환
}

export default formatPhone