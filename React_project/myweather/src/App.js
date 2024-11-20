import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WeatherCategory from './pages/WeatherCategory'
import NotFound from './pages/NotFound'
import { Navigate } from 'react-router-dom'

function App() {
   //    return (
   //       <div>
   //          <h1>hi</h1>
   //     </div>
   //  )

   return (
      <Routes>
         {/* 기본 대한민국 */}
         <Route path="/" element={<Navigate to="/weather/south-korea" replace />} />
         <Route path="/weather/:region" element={<Home />} />
         <Route path="/weather/:region/*" element={<WeatherCategory />} />
         <Route element={<NotFound />} path="/*" />
      </Routes>
   )
}

export default App
