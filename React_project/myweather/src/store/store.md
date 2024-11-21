새로고침시 데이터가 사라지는걸 막기위해 redux-persist라이브러리를 추가\

-  redux-toolkit에 **combineReducers** 추가 사용,
-  redux-persist에 **persistReducer, persistStore** 추가 사용
-  redux-persist에 **storage** 추가 사용
-  여기서 redux-persist라는 같은 상위경로를 두고 따로 import를 해야하는이유??
   -  redux-persist는 상위경로위 하위경로의 모듈을 명확히 구분하여 사용하기 때문\
      핵심기능 : (persistReducer, persistStore)\
      스토리지 관련 모듈(storage, sessionStorage)\
      서로 다른 역할을 가짐\
      storage는 로컬 스토리지에 대한 의존성을 가지므로 플랫폼별 다르게 동작 할 수 있음, 이를 명확히 하기 위해 라이브러리 개발자가 하위모듈로 별도 분리해서 설계

새로고침시 redux-persist가 초기화 과정에서 비직렬화가 가능한 값을 액션에 포함해서 에러가 발생함( 함수, DOM요소, 객체)\
redux는 액션과 상태가 직렬화 기능(plain JavaScript object)해야만 정상 작동하는데 redux-persist의 기본 설정이 이를 방해

이 문제는 redux-toolkit, redux-persist를 함께 사용할 때 발생하는 일반적 문제로\
serializableCheck 비활성화를하여 해결한다.\

configureStore에서 middleware 설정 시, serializableCheck 옵션을 비활성화하거나 예외로 처리\

```diff
! 추가 import
+ import { combineReducers } from '@reduxjs/toolkit'
+ import storage from 'redux-persist/lib/storage'
+ import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import directReducer from '../featuers/directSlice'
import weatherReducer from '../featuers/weatherSlice'

! 추가 함수 // 저장
+ const persistConfig = {
+   key: 'root',
+   storage,
+   whitelist: ['directs', 'weathers'], // 필요한 slice만 저장
+}

! combineReducers (rootReducer) : 개별 슬라이스(리듀서)를 하나로 합친 최종 리듀서
! => 앱 상태 구조를 정의
! 1. 리덕스 상태를 분리하여 관리
! 2. 리덕스 스토어에 전달
+ const rootReducer = combineReducers({
+    directs: directReducer,
+    weathers: weatherReducer,
+ })

! persistReducer (persistedReducer) : redux-persist를 적용하여 상태를 영구적으로 저장(persist)하도록 확장된 리듀서
! => rootReducer 위에 redux-persist 설정을 추가하여 상태를 로컬 스토리지에 저장하고 복원 // persistedReducer는 store에 전달
!
! 1. redux-persist 설정 적용
! ├─ persistReducer는 persistConfig(저장 설정)과 rootReducer를 받아, 상태를 로컬 스토리지 또는 세션 스토리지에 저장하고 복원할 수 있도록 설정
!
! 2. 상태 복원 및 저장
! ├─ 앱이 새로고침되거나 닫혀도, 상태가 로컬 스토리지에 저장되어 유지
! └─ 지정된 슬라이스(whitelist 또는 blacklist)만 저장/복원
+ const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
! 추가한 코드
+   middleware: (getDefaultMiddleware) =>
+      getDefaultMiddleware({
+         serializableCheck: {
+            // redux-persist에서 발생하는 비직렬화 문제 무시
+            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
+         },
+      }),
})

export const persistor = persistStore(store) // Persistor 생성

```
