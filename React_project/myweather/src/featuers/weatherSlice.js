import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   // const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lon, lat), getForecast(lon, lat), getAirPollution(lon, lat)])
   const weatherResponse = await getWeather(lon, lat)
   const forecastResponse = await getForecast(lon, lat)
   const airPollutionResponse = await getAirPollution(lon, lat)

   const w_data = weatherResponse.data
   const { clouds, coord, dt, id, main, weather, sys, timezone, visibility, wind } = w_data

   const f_data = forecastResponse.data
   const { city, list, message } = f_data

   const a_data = airPollutionResponse.data
   // const { components } = a_data

   // console.log('Weather Data:', w_data) // 날씨 데이터 확인
   // console.log('Forecast Data:', f_data) // 예보 데이터 확인
   // console.log('Air Pollution Data:', a_data) // 대기오염 데이터 확인

   const filteredWeather = {
      data: w_data,
      id,
      lon: coord.lon,
      lat: coord.lat,
      clouds: clouds.all,
      date: new Date(dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      time: dt + timezone,
      dt,
      timezone,
      temp: main.temp,
      min_temp: main.temp_min,
      max_temp: main.temp_max,
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

   /*    const filteredForecast = {
      data: list, // list를 data에 그대로 할당
   } */

   const filteredForecast = message
      ? { message } // 예보 데이터에 message가 있으면 메시지만 반환
      : list.map((item) => ({
           date: new Date(item.dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }), // dt_txt를 date로 변환
           city: city.name, // 도시 이름
           temperature: item.main.temp, // 현재 온도
           feels_like: item.main.feels_like, // 체감 온도
           temp_min: item.main.temp_min, // 최저 온도
           temp_max: item.main.temp_max, // 최고 온도
           humidity: item.main.humidity, // 습도
           weather_detail: item.weather[0].description, // 날씨 상세 설명
           clouds: item.clouds.all, // 구름 양
           pop: item.pop, // 강수 확률
           rain: item.rain ? item.rain['3h'] : 0, // 비가 온 경우 3시간 내 강수량, 없으면 0
           visibility: item.visibility, // 가시 거리
           wind_speed: item.wind.speed, // 바람 속도
           wind_deg: item.wind.deg, // 바람 방향
           wind_gust: item.wind.gust, // 바람 돌풍
        }))

   const filteredAirPollution = {
      aqi: a_data.list[0].main.aqi, // aqi 값
      pm2_5: a_data.list[0].components.pm2_5, // 미세먼지 PM2.5
      pm10: a_data.list[0].components.pm10, // 미세먼지 PM10
      co: a_data.list[0].components.co, // 일산화탄소
      no2: a_data.list[0].components.no2, // 이산화질소
      o3: a_data.list[0].components.o3, // 오존
      so2: a_data.list[0].components.so2,
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
