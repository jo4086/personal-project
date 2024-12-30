import { configureStore } from '@reduxjs/toolkit'
import blurReducer from '../slice/blurSlice'
import authReducer from '../slice/authSlice'
import addressReducer from '../slice/addressSlice'

const store = configureStore({
    reducer: {
        blur: blurReducer,
        auth: authReducer,
        address: addressReducer,
    },
})

export default store
