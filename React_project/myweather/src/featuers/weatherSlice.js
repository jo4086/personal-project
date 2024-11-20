import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getAirPollution, getForecast } from '../api/openWeatherApi'

export const fetchWeathers = createAsyncThunk('weather/fetchWeathers', async ({ lon, lat }) => {
   const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([getWeather(lat, lon), getForecast(lat, lon), getAirPollution(lat, lon)])

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
      weathers: {},
      forecast: {},
      airPollution: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchWeathers.pending, (state) => {
            state.loading = true
            state.error = null
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

/* import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather, getForecast, getAirPollution } from '../api/weatherApi';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ lat, lon }) => {
    const [weatherResponse, forecastResponse, airPollutionResponse] = await Promise.all([
      getWeather(lat, lon),
      getForecast(lat, lon),
      getAirPollution(lat, lon),
    ]);

    return {
      weather: weatherResponse.data,
      forecast: forecastResponse.data,
      airPollution: airPollutionResponse.data,
    };
  }
); */
