import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org'
const AUTH_KEY = 'f24ef11ff3ac3759827b92ca024bf829'

/*
날씨 및 대기정보 : /data/2.5
공통 쿼리파라 : lon, lat, appid

--날씨--
기본화면, 오늘날씨 : /weather?
3시간, 주간날씨 : /forecast?
쿼리파라 : units : metric  // lang : kr

대기오염 : /air_pollution?

지리정보 : /geo/1.0/direct?
쿼리파라 : q=도시명,KR
 */

const data = '/data/2.5'

const openWeather = axios.create({
   baseURL: DIRECT_URL,
   headers: {
      accept: 'application/json',
   },
})

const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await openWeather.get(url, {
         params: {
            ...params,
            appid: AUTH_KEY,
         },
      })
      return response
   } catch (error) {
      console.log(`API 요청 실패 ${error.mesaage}`)
      throw error
   }
}

export const getDirects = (region) => {
   const query = region === 'south-korea' ? 'south-korea' : `${region},KR`

   return fetchFromApi('/geo/1.0/direct', {
      q: query,
   })
}

export const getWeathers = (category, lon, lat) => {
   const endpoint = {
      today: `${data}/weather`,
      hour_3: `${data}/forecast`,
      day_5: `${data}/forecast`,
   }[category]
   return fetchFromApi(endpoint, {
      lon: lon,
      lat: lat,
      units: 'metric',
      lang: 'kr',
   })
}

export const getAirPollutions = (category, lon, lat) => {
   const endpoint = {
      air_pollution: `${data}/air_pollution`,
   }[category]
   return endpoint, { lon: lon, lat: lat }
}
