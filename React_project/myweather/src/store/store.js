import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../featuers/weather/weatherSlice'
import coordinateReducer     from '../featuers/coordinate/coordinate'

const store = configureStore({
   reducer: {
      coordinates: coordinateReducer,
   },
})
export default store
