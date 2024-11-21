import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Today from '../components/Category/Today'
import Hour from '../components/Category/Hour'
import Daily from '../components/Category/Daily'
import AirPollution from '../components/Category/AirPollution'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

function WeatherCategory() {
   const { weathers } = useSelector((state) => state.weathers)

   const memoizedWeathers = useMemo(() => weathers, [weathers])

   return (
      <Routes>
         <Route path="today" element={<Today data={memoizedWeathers} />} />
         <Route path="hour_3" element={<Hour data={memoizedWeathers} />} />
         <Route path="day_5" element={<Daily data={memoizedWeathers} />} />
         <Route path="air_pollution" element={<AirPollution data={memoizedWeathers} />} />
      </Routes>
   )
}

export default WeatherCategory
