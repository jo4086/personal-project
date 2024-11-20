import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Today from '../components/Category/Today'
import Hour from '../components/Category/Hour'
import Daily from '../components/Category/Daily'
import AirPollution from '../components/Category/AirPollution'

function WeatherCategory() {
   return (
      <Routes>
         <Route path="today" element={<Today />} />
         <Route path="hour_3" element={<Hour />} />
         <Route path="day_5" element={<Daily />} />
         <Route path="air_pollution" element={<AirPollution />} />
      </Routes>
   )
}

export default WeatherCategory