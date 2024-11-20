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
   const { weathers } = useSelector((state) => state.weathers)
   useEffect(() => {
      console.log('useEffect1')
      dispatch(fetchDirects(region))
   }, [region, dispatch])

   useEffect(() => {
      if (directs.length > 0 && directs[0]) {
         console.log('useEffect2')
         const { lon, lat } = directs[0]
         setCoordinates({
            lon: parseFloat(lon).toFixed(6),
            lat: parseFloat(lat).toFixed(6),
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

   console.log(region)
   console.log('directs:',directs)
   console.log('weathers:',weathers)

   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <WeatherNavi />
            <div className="section" style={{ width: '66.66%', height: '300px', backgroundColor: 'green', padding: '20px' }}>
               <div className="section1"><h3></h3>module1</div>
               <div className="section2">module2</div>
               <div className="section3">module3</div>
            </div>
         </Main>
      </Wrap>
   )
}

export default Home2
