import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import './css/CommonLayer.css'

function HourLayer({ data, region }) {
   const [state, setState] = useState('대한민국 (Republic of Korea)')
   const [moduleCount, setModuleCount] = useState(5)
   const castmap = data.forecast
   console.log(castmap)
   console.log(data.weather.date)
   useEffect(() => {
      if (region === 'south-korea') {
         return
      }
      setState(region)
   }, [region])
   // console.log(state)
   // console.log(data)
   const loadMore = () => {
      setModuleCount((count) => count+5)
   }

   return (
      <>
         <L.title>{state} 3시간</L.title>
         <p style={{ margin: '5px 0' }}>검색시간 : {data.weather.date}</p>
         {castmap.slice(0, moduleCount).map((item, index) => (
            <L.module key={index}>
               <L.header>
                  <L.sub_title>
                     {/* {item.date} */}
                     <span style={{ fontSize: '0.8em', fontWeight: 'normal' }}>{item.date}</span>
                  </L.sub_title>
                  <L.details_button>자세히 보기</L.details_button>
               </L.header>
               <L.container style={{ marginTop: '0' }}>
                  <L.leftBox1 style={{ border: '1px solid black' }}>
                     <div className="weather-info">
                        <div className="weather-image" style={{ backgroundImage: `url(https://openweathermap.org/img/wn/${item.icon}@4x.png)` }}></div>
                        <ul className="weather-details">
                           <li className="weather-status">{item.weather_detail}</li>
                           <li className="temperature">
                              {item.temperature.toFixed(1)}°<span style={{ fontSize: '0.6em' }}>C</span>
                           </li>
                        </ul>
                     </div>
                     <L.itemList style={{width:'70%'}}>
                        <L.items>
                           <span style={{ fontWeight: 'bold' }}>체감온도</span> <span>{item.feels_like.toFixed(1)}°C</span>
                        </L.items>
                        <L.items>
                           <span style={{ fontWeight: 'bold' }}>최대기온</span> <span>{item.temp_max.toFixed(1)}°C</span>
                        </L.items>
                        <L.items>
                           <span style={{ fontWeight: 'bold' }}>체저기온</span> <span>{item.temp_min.toFixed(1)}°C</span>
                        </L.items>
                     </L.itemList>
                  </L.leftBox1>
                  <L.rightBox1>
                     <L.itemList>
                        <L.items></L.items>
                        <L.items></L.items>
                        <L.items></L.items>
                        <L.items></L.items>
                     </L.itemList>
                  </L.rightBox1>
               </L.container>
            </L.module>
         ))}
      </>
   )
}

export default HourLayer
