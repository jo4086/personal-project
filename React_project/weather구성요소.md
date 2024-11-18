홈
검색 및 배경


## page 구성
 - 기본페이지 : weather-지역명 (weather-south-korea)
 - 검색페이지 : weather-


## App.js
 1. 경로설정


```
App.js
import {Routes, Route} from 'react-router-dom'


```

http://api.openweathermap.org/geo/1.0/direct?q=incheon&limit=5&appid=f24ef11ff3ac3759827b92ca024bf829


api.openweathermap.org/data/2.5/weather?q=Gyeonggi-do&appid=f24ef11ff3ac3759827b92ca024bf829&units=metric&lang=kr


GET http://api.openweathermap.org/data/2.5/find?q=Incheon&limit=10&appid=f24ef11ff3ac3759827b92ca024bf829


```
-- 폴더구조 --
src
├─api  : openWeatherApi.js
├─components 
│      ├─ Banner.jsx
│      └─ Footer.jsx
│      └─ Menu.jsx
│      └─ WeatherDetail.jsx
├─ data : region.json
├─ featuers
│    ├─weather : weatherSlice.js
│    └─airPollution: airPollutionSlice.js
├─ page
│    ├─ Detail.jsx
│    ├─ Home.jsx
│    ├─ NotFound.jsx
│    ├─ WeatherCategory.jsx
│    ├─ SearchResults.jsx
├─ store : store.jsx
├─ style
│    ├─ common.cdd
│    └─ styledComponent.js
└─ App.js
```