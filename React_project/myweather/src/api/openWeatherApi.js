import axios from 'axios'

const BASE_URL = 'api.openweathermap.org/data/2.5'
const DIRECT_URL = 'https://api.openweathermap.org/geo/1.0'
const AUTH_KEY = 'f24ef11ff3ac3759827b92ca024bf829'

const openWeather = axios.create({
   baseURL: DIRECT_URL,
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
      // consolo.error(`API 요청 실패 ${error.message}`)
      // throw error
   }
}

export const getCoordinate = (region = 'south-korea') => {
   const query = region ? `${region},KR` : 'south-korea';
   
   return fetchFromApi('/direct', {
      q : query,
      limit : region ? 10:1
   })
}
   
   // export const getWeather = (category, region = 'Republic of Korea') => {
   //    const endpoint = {
   //       q: region,
   //       today: '/weather',
   //       hour_3: '/forecast',
   //       day_5: '/forecast',
   //    }[category]
   
   //    return fetchFromApi(endpoint, {
   //       q: '',
   //       lang: 'kr',
   //       units: 'metric',
   //    })
   // }
   
   // export const getForecast = (category = 'hour_3', region = 'Republic of Korea') => {
   //    const endpoint = {
   //       hour_3: '/forecast',
   //       day_5: '/day_5',
   //    }[catrgory]
   
   //    return (
   //       endpoint,
   //       {
   //          q: region,
   //          units: metric,
   //          lang: kr,
   //       }
   //    )
   // }
   
   // export const getAirPollution = (lon, lat) => {
   //    return fetchFromApi('/air_pollution', {
   //       lat: lat,
   //       lon: lon,
   //    })
   // }