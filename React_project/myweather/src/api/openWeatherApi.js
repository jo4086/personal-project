import axios from 'axios'

const BASE_URL = 'api.openweathermap.org/data/2.5'
const AUTH_KEY = 'f24ef11ff3ac3759827b92ca024bf829'

const openWeather = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
   },
})

// 기본 weather API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await openWeather.get(url, {
         params: {
            ...params,
            appid: AUTH_KEY,
         },
      })
      return response
   }
   catch (error) {
      consolo.error('API 요청 실패')
      throw error
   }
}

export const getWeather = (category = 'today') => {
   const endpoint = {
      today: '/weather',
      hour_3: '/forecast',
      day_5: '/forecast',
   }[category]

   return fetchFromApi(endpoint, {
      q: '',
      lang: 'kr',
      units: 'metric',
   })
}