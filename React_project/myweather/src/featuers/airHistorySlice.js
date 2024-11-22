import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAirHistory } from '../api/openWeatherApi'

export const fetchAirHistorys = createAsyncThunk('airHistory/fetchAirHistorys', async ({ lon, lat, end }) => {
   const response = await getAirHistory(lon, lat, end)
   return response.data
})

const airHistorySlice = createSlice({
   name: 'airHistory',
   initialState: {
      loading: false,
      error: null,
      airHistorys: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAirHistorys.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAirHistorys.fulfilled, (state, action) => {
            state.loading = false

            // o3, dt 필터
            state.airHistorys = {
               list: action.payload.list.map((item) => ({
                  dt: item.dt,
                  o3: item.components.o3,
                  o3_ppb: item.components.o3 * (24.45 / 48),
                  date: new Date(item.dt * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
               })),
               o3_ppb_8h_average: action.payload.list.map((item) => item.components.o3 * (24.45 / 48)).reduce((sum, value, _, array) => sum + value / array.length, 0), // 평균 계산
            }
         })
         .addCase(fetchAirHistorys.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default airHistorySlice.reducer
