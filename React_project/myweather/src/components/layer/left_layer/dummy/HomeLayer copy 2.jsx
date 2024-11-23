import './css/HomeLayer.css'
import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomeLayer({ data, region }) {
   const [state, setState] = useState('대한민국 (Republic of Korea)')
   const weather = data.weather
   const forecast = data.forecast
   const air_pollution = data.airPollution

   const navigate = useNavigate()

   console.log(data)
   useEffect(() => {
      if (region === 'south-korea') {
         return
      }
      setState(region)
   }, [region])

   const link = () => {
      navigate(`/weather/${region}/detail`)
   }
   return (
      <>
         <L.title>{state}</L.title>
         {/* <p style={{ margin: '5px 0' }}>{weather.date} 업데이트</p> */}
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
               <L.leftBox1 style={{ border: '1px solid black' }}>
                  <L.flexBox style={{ display: 'flex' }}>
                     <L.flexItemImage icon={weather.icon}>1</L.flexItemImage>
                     <L.flexItem1>2</L.flexItem1>
                     <L.flexItem2>3</L.flexItem2>
                     <L.flexItem2>4</L.flexItem2>
                  </L.flexBox>
               </L.leftBox1>
               <L.rightBox1 style={{ border: '1px solid black' }}></L.rightBox1>
            </L.container>
         </L.module>
      </>
   )
}

export default HomeLayer

