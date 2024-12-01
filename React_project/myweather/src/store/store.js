import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import directReducer from '../featuers/directSlice'
import weatherReducer from '../featuers/weatherSlice'
import airHistoryReducer from '../featuers/airHistorySlice'

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['directs', 'weathers','airHistorys'], // 필요한 slice만 저장
}

const rootReducer = combineReducers({
   directs: directReducer,
   weathers: weatherReducer,
   airHistorys : airHistoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // redux-persist에서 발생하는 비직렬화 문제 무시
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
         },
      }),
})

export const persistor = persistStore(store) // Persistor 생성


// 개발 환경에서 상태 초기화
// if (process.env.NODE_ENV === 'development') {
//    persistor.purge() // Redux Persist 상태 초기화
// }
