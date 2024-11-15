import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import WeatherCategory from './pages/WeatherCategory'
import NotFound from './pages/NotFound'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />

         <Route path="/today" element={<WeatherCategory category="today" />} />
         <Route path="/hour-3" element={<WeatherCategory category="hour-3" />} />
         <Route path="/day-5" element={<WeatherCategory category="day-5" />} />
         <Route path="/air_pollution" element={<WeatherCategory category="air_pollution" />} />
      </Routes>
   )
}

export default App
