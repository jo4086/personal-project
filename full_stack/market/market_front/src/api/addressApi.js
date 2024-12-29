import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8010'

const addressApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const registerAddress = async (authenticated ,userData) => {
    try {
        const response = await addressApi.post('/register',authenticated , userData)
        return response
    } catch (err) {
        console.error(`Axios 실패 :: API Request 오류 :: registerAddress => ${err.message}`)
        throw err
    }
}
