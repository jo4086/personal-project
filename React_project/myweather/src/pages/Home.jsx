import React, { useEffect, useState, useRef } from 'react'

import { Wrap, Main } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchWeathers } from '../featuers/weatherSlice'
import { fetchDirects } from '../featuers/directSlice'
import WeatherNavi from '../components/WeatherNavi'

import './css/Home.css'

function Home2() {
   const [direct, setDirect] = useState([])
   const [coordinates, setCoordinates] = useState({})
   const { region } = useParams()

   const isData = useRef(true)

   const dispatch = useDispatch()

   const { directs } = useSelector((state) => state.directs)
   const { weathers, loading, error } = useSelector((state) => state.weathers)
   useEffect(() => {
      console.log('useEffect1')
      dispatch(fetchDirects(region))
   }, [region, dispatch])

   useEffect(() => {
      if (directs.length > 0 && directs[0]) {
         console.log('useEffect2')
         const { lon, lat } = directs[0]
         setCoordinates({
            lon,
            lat,
         })
      }
   }, [directs])

   useEffect(() => {
      if (isData.current) {
         isData.current = false
         return
      }
      console.log('useEffect3')
      dispatch(fetchWeathers(coordinates))
   }, [coordinates])

   // console.log(region)
   // console.log('directs:', directs)
   // console.log('weathers:', weathers)
   // console.log(weathers.weather)
   // if (weathers.weather) {
   //    console.log(weathers.weather.weather[0].icon)
   //    const icon = weathers.weather.weather[0].icon
   // }
   if (loading) {
      return <div>Loading...</div>
   }
   if (error) {
      return <div>Error: {error}</div>
   }

   // console.log(weathers.weather.weather[0].icon)
   if (weathers?.weather?.weather?.[0]?.icon) {
      console.log(weathers.weather.weather[0].icon)
   } else {
      console.log('Icon data is not available yet.')
   }

   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <WeatherNavi />
            <div className="section" style={{ width: '66.66%', height: '300px', backgroundColor: 'green', padding: '20px' }}>
               <div className="section1">
                  <h3></h3>module1
                  <img src={`https://openweathermap.org/img/wn\${icon}`} />
               </div>
               <div className="section2">module2</div>
               <div className="section3">module3</div>
            </div>
         </Main>
      </Wrap>
   )
}

export default Home2
