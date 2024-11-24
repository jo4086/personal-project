import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'
import '../data/groupData_object.json'
import { weatherGroups, getWeatherScript } from '../data/groupData_array_object'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   // const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lon, lat), getForecast(lon, lat), getAirPollution(lon, lat)])
   const weatherResponse = await getWeather(lon, lat)
   const forecastResponse = await getForecast(lon, lat)
   const airPollutionResponse = await getAirPollution(lon, lat)

   const w_data = weatherResponse.data
   const { clouds, coord, dt, id, main, weather, sys, timezone, visibility, wind, rain, cityname } = w_data

   const f_data = forecastResponse.data
   const { city, list, message } = f_data

   const a_data = airPollutionResponse.data
   const { aqi } = a_data.list[0].main
   const { pm2_5, pm10, co, no2, o3, so2 } = a_data.list[0].components

   // 스크립트 계산함수를 외부로 빼기 전 코드
   // const selectedWeather = weatherGroups[weather[0].main] ?? weatherGroups['Extreme']
   // const weatherName = selectedWeather.name
   // const description = selectedWeather.id[weather[0].id].korean
   // const script = { weatherName, description }

   const scripts = getWeatherScript(weather)
   console.log('함수', scripts)

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
      temp: main.temp,
      min_temp: main.temp_min,
      max_temp: main.temp_max,
      temp_kf: main.temp_kf,
      feel_temp: main.feels_like,
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
   }

   /*    const filteredForecast = {
      data: list, // list를 data에 그대로 할당
   } */

   const filteredForecast = message
      ? { message } // 예보 데이터에 message가 있으면 메시지만 반환
      : list.map((item) => {
           const scripts = getWeatherScript(item.weather)
           console.log('forecast 스크립트:', scripts)
           return {
              date: new Date(item.dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }), // dt_txt를 date로 변환
              city: city.name,
              temperature: item.main.temp,
              feels_like: item.main.feels_like,
              temp_min: item.main.temp_min,
              temp_max: item.main.temp_max,
              temp_kf: item.main.temp_kf,
              humidity: item.main.humidity,
              weather_detail: item.weather[0].description,
              clouds: item.clouds.all,
              pop: item.pop,
              rain: item.rain ? item.rain['3h'] : 0, // 비가 온 경우 3시간 내 강수량, 없으면 0
              visibility: item.visibility,
              wind_speed: item.wind.speed,
              wind_deg: item.wind.deg,
              wind_gust: item.wind.gust,
              icon: item.weather[0].icon,
              scripts,
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
            state.error = action.error.message
         })
   },
})

export default weatherSlice.reducer
