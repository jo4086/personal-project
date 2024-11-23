// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getWeather } from '../../api/openWeatherApi'

// export const fetchWeathers = createAsyncThunk('weather', async ({ catogory, region }) => {
//    const response = await getWeather(catogory, region)
//    return response
// })

// const weatherSlice = createSlice({
//    name: 'weather',
//    initialState: {
//       loading: false,
//       weather: {},
//       forecast: {},
//       air_pollution: {},
//       error: null,
//    },
//    reducers: {},
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchWeathers.pending, (state) => {
//             ;(state.loading = true), (state.error = null)
//          })
//          .addCase(fetchWeathers.fulfilled, (state, action) => {
//             ;(state.loading = false), (state.weathers = action.payload)
//          })
//          .addCase(fetchWeathers.rejected, (state, action) => {
//             ;(state.loading = false), (state.error = action.error.message)
//          })
//    },
// })

// export default weatherSlice.reducer


