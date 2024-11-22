import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Today from '../components/Category/Today'
import Hour from '../components/Category/Hour'
import Daily from '../components/Category/Daily'
import AirPollution from '../components/Category/AirPollution'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

function WeatherCategory() {
   const {region} = useParams()
   const { weathers } = useSelector((state) => state.weathers)

   const memoizedWeathers = useMemo(() => weathers, [weathers])

   return (
      <Routes>
         <Route path="today" element={<Today data={memoizedWeathers} region={region} />} />
         <Route path="hour_3" element={<Hour data={memoizedWeathers} region={region} />} />
         <Route path="day_5" element={<Daily data={memoizedWeathers} region={region} />} />
         <Route path="air_pollution" element={<AirPollution data={memoizedWeathers} region={region} />} />
      </Routes>
   )
}

export default WeatherCategory
