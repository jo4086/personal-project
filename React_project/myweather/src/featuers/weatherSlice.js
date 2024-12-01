import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'
import '../data/groupData_object.json'
import { weatherGroups, getWeatherScript } from '../data/groupData_array_object'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lon, lat), getForecast(lon, lat), getAirPollution(lon, lat)])

   const w_data = weatherResponse.data
   const { clouds, coord, dt, id, main, weather, sys, timezone, visibility, wind, rain, cityname } = w_data

   const f_data = forecastResponse.data
   const { city, list, message } = f_data

   console.log(f_data)

   const a_data = airPollutionResponse.data
   const { aqi } = a_data.list[0].main
   const { pm2_5, pm10, co, no2, o3, so2 } = a_data.list[0].components

   const scripts = getWeatherScript(weather, wind)
   // console.log('함수', scripts)

   const filteredWeather = {
      data: w_data,
      id,
      cityname,
      lon: coord.lon,
      lat: coord.lat,
      clouds: clouds.all,
      date: new Date(dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      time: dt + timezone,
      dt,
      timezone,
      rain: rain ? rain : null,
      temp: Number(main.temp).toFixed(1),
      min_temp: Number(main.temp_min).toFixed(1),
      max_temp: Number(main.temp_max).toFixed(1),
      temp_kf: Number(main.temp_kf),
      feel_temp: Number(main.feels_like).toFixed(1),
      humidity: main.humidity,
      country: sys.country,
      sunrise: sys.sunrise + timezone,
      sunset: sys.sunset + timezone,
      visibility,
      weather_group: weather[0].main,
      weather_detail: weather[0].description,
      icon: weather[0].icon,
      wind_speed: wind.speed,
      wind_deg: wind.deg,
      scripts,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
   }

   const filteredForecast = message
      ? { message } // 예보 데이터에 message가 있으면 메시지만 반환
      : list.map((item) => {
           const scripts = getWeatherScript(item.weather, item.wind)
           //   console.log(item)
           const period = item.sys.pod === 'n' ? '밤' : item.sys.pod === 'd' ? '낮' : '데이터 없음'
           return {
              date: new Date(item.dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }), // dt_txt를 date로 변환
              city: city.name,
              temp: item.main.temp.toFixed(1),
              feel_temp: item.main.feels_like.toFixed(1),
              min_temp: item.main.temp_min.toFixed(1),
              max_temp: item.main.temp_max.toFixed(1),
              temp_kf: item.main.temp_kf.toFixed(1),
              humidity: item.main.humidity,
              weather_detail: item.weather[0].description,
              clouds: item.clouds.all,
              pop: item.pop,
              rain: item.rain ? item.rain['3h'] : 0, // 비가 온 경우 3시간 내 강수량, 없으면 0
              visibility: item.visibility,
              wind_speed: item.wind.speed.toFixed(1),
              wind_deg: item.wind.deg,
              wind_gust: item.wind.gust,
              icon: item.weather[0].icon,
              scripts,
              period,
           }
        })

   const filteredAirPollution = {
      aqi,
      pm2_5,
      pm10,
      co,
      no2,
      o3,
      so2,
      no2_ppm: no2 * 0.001 * (24.45 / 46.055),
      so2_ppb: so2 * (24.45 / 64.066),
      co_ppb: co * (24.45 / 28.01),
      o3_ppb: o3 * (24.45 / 48),
   }

   return {
      weather: filteredWeather,
      forecast: filteredForecast,
      airPollution: filteredAirPollution,
   }
})

export const resetWeather = createAction('weather/reset')

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      loading: false,
      error: null,
      weathers: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchWeathers.pending, (state, action) => {
            state.loading = true
            state.error = null
            // state.error = action.error.message
         })
         .addCase(fetchWeathers.fulfilled, (state, action) => {
            state.loading = false
            state.weathers = action.payload
         })
         .addCase(fetchWeathers.rejected, (state, action) => {
            state.loading = false
            // state.error = action.error.message
            // 에러 message 미존재시 나올 문구
            state.error = action.error?.message || 'An unknown error occurred.'
         })
         .addCase(resetWeather, (state, action) => {
            const { force } = action.payload || {} // payload에서 조건 확인
            if (force) {
               state.loading = false
               state.error = null
               state.weathers = {}
               // return {
               //    loading: false,
               //    error: null,
               //    weathers: {}, // 초기 상태
               // }
            }
         })
   },
})

export default weatherSlice.reducer
