import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lon, lat), getForecast(lon, lat), getAirPollution(lon, lat)])

   return {
      weather: weatherResponse.data,
      forecast: forecastResponse.data,
      airPollution: airPollutionResponse.data,
   }
})

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      loading: false,
      error: null,
      rowData: {},
      home: {},

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
            // state.rowData = action.payload
            // state.home = getHome(action.payload)
         })
         .addCase(fetchWeathers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default weatherSlice.reducer
