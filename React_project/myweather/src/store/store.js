import { configureStore } from '@reduxjs/toolkit'
import directReducer from '../featuers/directSlice'
import weatherReducer from '../featuers/weatherSlice'

const store = configureStore({
   reducer: {
      directs: directReducer,
      weathers: weatherReducer,
   },
})
export default store
