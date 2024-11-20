import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDirects } from '../api/openWeatherApi'

export const fetchDirects = createAsyncThunk('direct/fetchDirects', async (region) => {
   const response = await getDirects(region)
//    console.log(response.data)
   return response.data
})

const directSlice = createSlice({
   name: 'direct',
   initialState: {
      loading: false,
      error: null,
      directs: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchDirects.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchDirects.fulfilled, (state, action) => {
            state.loading = false
            state.directs = action.payload
         })
         .addCase(fetchDirects.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default directSlice.reducer
