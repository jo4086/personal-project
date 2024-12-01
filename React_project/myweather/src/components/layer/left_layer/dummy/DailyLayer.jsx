import './css/HomeLayer.css'
import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FlexBox from '../../item_box/FlexBox'
import Items from '../../item_box/Items'
import FlexItemReusable from '../../item_box/FlexItemReusable'
import getMappedWeather from './processing/getMappedWeather'

import { airQualityMapper, weatherMapper } from '../../../data/mapper'

function getWeatherArray(today, forecast, validTimes) {
   const filter = forecast.filter((item) => {
      const [date, time] = item.date.split('오')
      if (date === today) {
         return false
      }
      if (!validTimes.includes(time)) {
         return false
      }
      return date && time
   })

   const arraylength = filter.slice(0, Math.floor(filter.length / 4) * 4)

   return arraylength
}

function DailyLayer({ data, region }) {
   const [state, setState] = useState('대한민국 (Republic of Korea)')
   const validTimes = ['전 3:00:00', '전 9:00:00', '후 3:00:00', '후 9:00:00']
   const navigate = useNavigate()
   // console.log(weatherMapper)

   const today = data.weather.date.split('오')[0]

   const forecast = data.forecast

   const weatherArray = getWeatherArray(today, forecast, validTimes)

   // console.log('true', forecastfilter)
   // const weatherArray = forecastfilter[0]
   // console.log(weatherArray.icon)

   const link = () => {
      navigate(`/weather/${region}/detail`)
   }

   const mappedWeather = getMappedWeather(weatherArray)
   // console.log(mappedWeather)
   // const { group1, group2, group3 } = mappedWeather
   // console.log(group1)

   const { renderItems, group1, group2, group3 } = mappedWeather
   console.log('반복', weatherArray)
   // console.log(true[0])
   return (
      <>
         <L.title>{state}</L.title>
         <L.module>
            <L.header>
               <L.sub_title>
                  <span style={{ fontSize: '1.0em', fontWeight: 'normal' }}>
                     업데이트 시간 <span style={{ margin: '5px 0', fontSize: '0.8em' }}>{data.weather.date} </span>
                  </span>
               </L.sub_title>
               <L.details_button type="button" onClick={link} style={{ margin: '0px', padding: '5px 20px', borderRadius: '10px' }}>
                  자세히 보기
               </L.details_button>
            </L.header>
            <L.container>
               <L.flexBox>
                  <L.flexItem1 style={{ border: '1px solid black' }}>
                     <L.div>
                        <L.div $variant="blank" $icon></L.div>
                        <L.div $variant="right">
                           <L.p style={{ fontSize: '1.5em', letterSpacing: '-1px' }}>{}</L.p>
                           <L.p $variant="temp main">
                              <L.span $variant="decimal">.</L.span>
                              <sup style={{ fontSize: '1.5rem' }}>º</sup>
                           </L.p>
                        </L.div>
                     </L.div>
                     <L.div $variant="explain">
                        <L.p style={{ marginLeft: '10px', borderTop: '1px solid darkgray', width: '90%' }}>{}</L.p>
                     </L.div>
                  </L.flexItem1>

                  <FlexItemReusable>{renderItems(group1)}</FlexItemReusable>
                  <FlexItemReusable>{renderItems(group2)}</FlexItemReusable>
                  <FlexItemReusable>{renderItems(group3)}</FlexItemReusable>
               </L.flexBox>
            </L.container>
         </L.module>
      </>
   )
}

export default DailyLayer

/* 일출일몰계산.... 오류남
import { getSunData } from '../../../data/suncalc'
const lon = data.weather.lon
const lat = data.weather.lat
const timezone = data.weather.timezone
const sunData = getSunData(lat,lon,timezone)
 */
