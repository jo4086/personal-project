import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCoordinate } from '../../api/openWeatherApi'

export const fetchCoordinates = createAsyncThunk('coordinate/fetchCoordinates', async ({ region }) => {
   const response = await getCoordinate(region)
   return response
})

export const coordinateSlice = createSlice({
   name: 'coordinate',
   initialState: {
      loading: false,
      coordinates: [],
      selectedCoordinate: null, // 단일 선택 좌표
      error: null,
   },
   reducers: {
      setSelectedCoordinate: (state, action) => {
         state.selectedCoordinate = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCoordinates.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCoordinates.fulfilled, (state, action) => {
            state.loading = false
            state.coordinates = action.payload
         })
         .addCase(fetchCoordinates.recjected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export const { setSelectedCoordinate } = coordinateSlice.actions
export default coordinateSlice.reducer
