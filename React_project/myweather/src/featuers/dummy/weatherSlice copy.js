import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   // const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lon, lat), getForecast(lon, lat), getAirPollution(lon, lat)])
   const weatherResponse = await getWeather(lon, lat)
   const forecastResponse = await getForecast(lon, lat)
   const airPollutionResponse = await getAirPollution(lon, lat)

   const w_data = weatherResponse.data
   const { clouds, coord, dt, id, main, weather, sys, timezone, visibility, wind, rain, name } = w_data

   const f_data = forecastResponse.data
   const { city, list, message } = f_data

   const a_data = airPollutionResponse.data
   const { aqi } = a_data.list[0].main
   const { pm2_5, pm10, co, no2, o3, so2 } = a_data.list[0].components


   const filteredWeather = {
      data: w_data,
      id,
      name,
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
   }

   const filteredForecast = message
      ? { message } // 예보 데이터에 message가 있으면 메시지만 반환
      : list.map((item) => ({
           date: new Date(item.dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }), // dt_txt를 date로 변환
           city: city.name, // 도시 이름
           temperature: item.main.temp, // 현재 온도
           feels_like: item.main.feels_like, // 체감 온도
           temp_min: item.main.temp_min, // 최저 온도
           temp_max: item.main.temp_max, // 최고 온도
           temp_kf: item.main.temp_kf,
           humidity: item.main.humidity, // 습도
           weather_detail: item.weather[0].description, // 날씨 상세 설명
           clouds: item.clouds.all, // 구름 양
           pop: item.pop, // 강수 확률
           rain: item.rain ? item.rain['3h'] : 0, // 비가 온 경우 3시간 내 강수량, 없으면 0
           visibility: item.visibility, // 가시 거리
           wind_speed: item.wind.speed, // 바람 속도
           wind_deg: item.wind.deg, // 바람 방향
           wind_gust: item.wind.gust, // 바람 돌풍
           icon: item.weather[0].icon,
        }))

   const filteredAirPollution = {
      aqi, // aqi 값
      pm2_5, // 미세먼지 PM2.5
      pm10, // 미세먼지 PM10
      co, // 일산화탄소
      no2, // 이산화질소
      o3, // 오존
      so2, // 아황산가스
      no2_ppm: no2 * 0.001 * (24.45 / 46.055),
      so2_ppb: so2 * (24.45 / 64.066),
      co_ppb: co * (24.45 / 28.01),
      o3_ppb: o3 * (24.45 / 48),
   }

   //   console.log('Filtered Weather:', filteredWeather);   // 필터된 날씨 데이터 확인
   // console.log('Filtered Forecast:', filteredForecast); // 필터된 예보 데이터 확인
   // console.log('Filtered Air Pollution:', filteredAirPollution);

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
      // forecast: {},
      // airPollution: {},
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
