import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import Detail from './pages/Detail'
import WeatherCategory from './pages/WeatherCategory'
// import NotFound from './pages/NotFound'

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
      </Routes>
   )
}

export default App

{
   /* <Route path="/weather/today" element={<WeatherCategory category="today" />} />
<Route path="/weather/hour_3" element={<WeatherCategory category="hour-3" />} />
<Route path="/weather/day_5" element={<WeatherCategory category="day-5" />} />
<Route path="/weather/air_pollution" element={<WeatherCategory category="air_pollution" />} /> */
}
