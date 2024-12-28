import { configureStore } from '@reduxjs/toolkit'
import blurReducer from '../slice/blurSlice'
import authReducer from '../slice/authSlice'

const store = configureStore({
    reducer: {
        blur: blurReducer,
        auth: authReducer,
    },
})

export default store
