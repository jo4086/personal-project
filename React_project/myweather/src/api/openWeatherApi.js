import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org'
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY
const data = '/data/2.5'

const openWeather = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
   },
})

const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await openWeather.get(url, {
         params: {
            ...params,
            appid: OPEN_WEATHER_KEY,
         },
      })
      return response
   } catch (error) {
      console.log(`API 요청 실패 ${error.mesaage}`)
      throw error
   }
}

export const getDirects = (region) => {
   const query = region === 'south-korea' ? '서울특별시' : `${region},KR`

   return fetchFromApi('/geo/1.0/direct', {
      q: query,
   })
}

export const getWeather = (lon, lat) => {
   return fetchFromApi(`${data}/weather`, {
      lon: lon,
      lat: lat,
      units: 'metric',
      lang: 'kr',
   })
}

export const getForecast = (lon, lat) => {
   return fetchFromApi(`${data}/forecast`, {
      lon: lon,
      lat: lat,
      units: 'metric',
      lang: 'kr',
   })
}

export const getAirPollution = (lon, lat) => {
   return fetchFromApi(`${data}/air_pollution`, {
      lon: lon,
      lat: lat,
   })
}

export const getAirHistory = (lon, lat, end) => {
   return fetchFromApi(`${data}/air_pollution/history`, {
      lon: lon,
      lat: lat,
      start: end - 28800,
      end: end,
   })
}

export const getAirForecast = (lon, lat) => {
   return fetchFromApi(`${data}/air_pollution/forecast`, {
      lon: lon,
      lat: lat,
   })
}

// 기본 weather API 호출 함수

// const fetchFromApi = async (url, params = {}) => {
//    try {
//       const response = await openWeather.get(url, {
//          params: {
//             ...params,
//             appid: OPEN_WEATHER_KEY,
//          },
//       })
//       return response
//    }
//    catch (error) {
//       // consolo.error(`API 요청 실패 ${error.message}`)
//       // throw error
//    }
// }

// export const getCoordinate = (region = 'south-korea') => {
//    const query = region ? `${region},KR` : 'south-korea';

//    return fetchFromApi('/direct', {
//       q : query,
//       limit : region ? 10:1
//    })
// }

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
