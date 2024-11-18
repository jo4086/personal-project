// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getWeather } from '../../api/openWeatherApi'

// export const fetchWeathers = createAsyncThunk('weather', async ({ catogory, q }) => {
//     const response = await getWeather(catogory, q)
//     return response
// })


// const weatherSlice = createSlice({
//    name: 'weathers',
//    initialState: {
//       loading: false,
//       weathers: [],
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