import './css/HomeLayer.css'
import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoWaterOutline } from 'react-icons/io5'
import { LuWind, LuDroplets } from 'react-icons/lu'
// import { FaTemperatureLow } from 'react-icons/fa6'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { CiTempHigh } from 'react-icons/ci'
import { FaTemperatureArrowUp, FaTemperatureArrowDown, FaTemperatureHigh } from 'react-icons/fa6'

import FlexBox from '../../item_box/FlexBox'

import ItemLayout from './item_layout/ItemLayout'

import { airQualityMapper, weatherMapper } from '../../../data/mapper'

function HomeLayer({ data, region }) {
   const [state, setState] = useState('대한민국 (Republic of Korea)')
   console.log(data)
   const weather = data.weather
   const forecast = data.forecast
   const air_pollution = data.airPollution

   const navigate = useNavigate()

   const temperature = weather.temp
   const integer = Math.floor(temperature) // 정수 부분
   const decimal = Math.round((temperature * 10) % 10) // 소수점 아래 첫째 자리

   const aqiDescriptions = {
      1: '좋음 (Good)',
      2: '보통 (Fair)',
      3: '나쁨 (Moderate)',
      4: '나쁨 (Poor)',
      5: '매우 나쁨 (Very Poor)',
   }

   useEffect(() => {
      if (region === 'south-korea') {
         return
      }
      setState(region)
   }, [region])

   const link = () => {
      navigate(`/weather/${region}/detail`)
   }
   const aqiData = data.airPollution.aqi
   const AQI = aqiDescriptions[aqiData]
   // console.log(AQI)
   // console.log('%cweatherMapper\n','font-weight:bold',weatherMapper)
   // console.log('%cairQualityMapper\n', 'font-weight:bold', airQualityMapper)

   const flexData = [
      {
         id: 1,
         items: [{ label: '대기질 지수', value: aqiData }],
      },
   ]
   console.log(weather)
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
            <L.container style={{ alignItems: 'stretch' }}>
               <L.flexBox>
                  <L.flexItem1 style={{ border: '1px solid black' }}>
                     <L.div>
                        <L.div $variant="blank" $icon={weather.icon}></L.div>
                        <L.div $variant="right">
                           <L.p style={{ fontSize: '1.5em', letterSpacing: '-1px' }}>{weather.scripts.weatherName}</L.p>
                           <L.p $variant="temp main">
                              {integer}
                              <L.span $variant="decimal">.{decimal}</L.span>
                              <sup style={{ fontSize: '1.5rem' }}>º</sup>
                           </L.p>
                        </L.div>
                     </L.div>
                     <L.div $variant="explain">
                        <L.p style={{ marginLeft: '10px', borderTop: '1px solid darkgray', width: '90%' }}>{weather.scripts.description}</L.p>
                     </L.div>
                  </L.flexItem1>
                  <L.flexItem1>
                     <L.itemList>
                        <L.items>
                           <div className="label">
                              <FaTemperatureHigh color="#E57373" />
                              <span>체감온도</span>
                           </div>
                           <div className="value">
                              <span>{weather.feel_temp}</span>
                              <span style={{ fontSize: '0.8em' }}>°C</span>
                           </div>
                        </L.items>
                        <L.items>
                           <div className="label">
                              <FaTemperatureArrowUp color="red" />
                              <span>최대기온</span>
                           </div>
                           <div className="value">
                              <span>{weather.max_temp}</span>
                              <span style={{ fontSize: '0.8em' }}>°C</span>
                           </div>
                        </L.items>
                        <L.items>
                           <div className="label">
                              <FaTemperatureArrowDown color="#4A90E2" />
                              <span>최저기온</span>
                           </div>
                           <div className="value">
                              <span>{weather.min_temp}</span>
                              <span style={{ fontSize: '0.8em' }}>°C</span>
                           </div>
                        </L.items>
                        <L.items>
                           <div className="label">
                              <LuDroplets />
                              <span>습도</span>
                           </div>
                           <div className="value">
                              <span style={{ letterSpacing: '2px' }}>{weather.humidity}</span>
                              <span>%</span>
                           </div>
                        </L.items>
                        <L.items>
                           <div className="label">
                              <LuWind />
                              <span>풍속 / 풍향</span>
                           </div>
                           <span style={{ fontSize: '0.85rem' }}>{weather.scripts.direction}</span>
                           <div className="value">
                              <span>{weather.min_temp}</span>
                              <span>
                                 <span style={{ position: 'relative', left: '2.5px', top: '-2.5px', fontSize: '0.95rem' }}>m</span>/<span style={{ position: 'relative', left: '-2px', top: '2.5px', fontSize: '0.9rem' }}>s</span>
                              </span>
                           </div>
                        </L.items>
                     </L.itemList>
                  </L.flexItem1>
                  <L.flexItem2></L.flexItem2>
               </L.flexBox>
            </L.container>
         </L.module>
      </>
   )
}

export default HomeLayer
