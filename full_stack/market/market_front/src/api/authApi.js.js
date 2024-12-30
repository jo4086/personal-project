import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8010'

const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const registerUser = async (userData) => {
    try {
        const response = await authApi.post('/auth/join', userData)
        return response
    } catch (err) {
        console.error(`Axios 실패 :: API Request 오류 :: registerUser => ${err.message}`)
        throw err
    }
}

export const loginUser = async(credentials) => {
    try {
        console.log('api 회원정보',credentials)
        const response = await authApi.post('/auth/login', credentials)
        return response
    } catch (err) {
        console.error(`Axios 실패 :: API Request 오류 :: => ${err.message}`)
        throw err
    }
}
export const logoutUser = async() => {
    try {
        const response = await authApi.get('/auth/logout')
        return response
    } catch (err) {
        console.error(`Axios 실패 :: API Request 오류 :: => ${err.message}`)
        throw err
    }
}
export const checkAuthStatus = async() => {
    try {
        const response = await authApi.get('/auth/status')
        return response
    } catch (err) {
        console.error(`Axios 실패 :: API Request 오류 :: => ${err.message}`)
        throw err
    }
}
