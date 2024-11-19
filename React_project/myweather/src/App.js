import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WeatherCategory from './pages/WeatherCategory'
import NotFound from './pages/NotFound'

function App() {
   //    return (
   //       <div>
   //          <h1>hi</h1>
   //     </div>
   //  )

   return (
      <Routes>
         {/* 기본 대한민국 */}
         <Route path="/" element={<Home />} />
         <Route path="/weather-south-korea" element={<Home />} />
         <Route path="/weather-:region" element={<Home />} />

         <Route element={<WeatherCategory category="today" path="/weather-:region/today" />} />
         <Route element={<WeatherCategory category="hour_3" path="/weather-:region/hour_3" />} />
         <Route element={<WeatherCategory category="day_5" path="/weather-:region/day_5" />} />
         <Route element={<WeatherCategory category="air_pollution" />} path="/weather-:region/air_pollution" />
         <Route element={<NotFound />} path="/*" />
      </Routes>
   )
}

export default App

{
   /* <Route path="/weather/today" element={<WeatherCategory category="" category="today" />} />
<Route path="/weather/hour_3" element={<WeatherCategory category="" category="hour-3" />} />
<Route path="/weather/day_5" element={<WeatherCategory category="" category="day-5" />} />
<Route path="/weather/air_pollution" element={<WeatherCategory category="" category="air_pollution" />} /> */
}

/* 
         



*/
