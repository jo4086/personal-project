import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8010'

const signCheckApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
})



export const signCheck = async (type, data) => {
    try {
        const response = await signCheckApi.post(`/auth/join/check/${type}`, {data})
        console.log(`signCheck: `, response.data)
        return response.data
    } catch (err) {
        console.error(`${type} 확인 실패!! ~ API Request 오류: CHECK_API => ${err}`)
        throw err
    }
}

/* const userIdBlur = async (userId) => {
    try {
        await checkApi('userId', userId, '아이디 확인 중 문제가 발생했습니다.')
        console.log('아이디 확인 성공')
    } catch (err) {
        console.error('아이디 확인 실패:', err)
    }
}

const emailBlur = async (email) => {
    try {
        await checkApi('email', email, '이메일 확인 중 문제가 발생하였습니다.')
        console.log('이메일 확인 성공')
    } catch (err) {
        console.error('이메일 확인 실패', err)
    }
}

const phoneBlur = async (phone) => {
    try {
        await checkApi('phone', phone, '번호 확인중 문제가 발생하였습니다.')
        console.log('번호 확인 성공')
    } catch (err) {
        console.error('번호 확인 실패', err)
    }
}
 */
