import React, { useEffect, useState, useRef, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchWeathers } from '../featuers/weatherSlice'
import { fetchDirects } from '../featuers/directSlice'

import { Wrap, Main, LayerSection } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import WeatherNavi from '../components/WeatherNavi'

import RightLayer from '../components/layer/RightLayer'
import LeftLayer from '../components/layer/LeftLayer'

import './css/Home.css'

function Home() {
   const isData = useRef(true)
   const dispatch = useDispatch()
   const [direct, setDirect] = useState([])
   const [coordinates, setCoordinates] = useState({})
   const { region } = useParams()
   const { directs } = useSelector((state) => state.directs)
   const { weathers, loading, error } = useSelector((state) => state.weathers)
   const memoizedWeathers = useMemo(() => weathers, [weathers])

   useEffect(() => {
      console.log('useEffect1')
      dispatch(fetchDirects(region))
   }, [region, dispatch])

   useEffect(() => {
      if (directs.length > 0 && directs[0] && directs !== direct) {
         console.log('useEffect2')
         const { lon, lat } = directs[0]
         setCoordinates({
            lon,
            lat,
         })
         setDirect(directs)
      }
   }, [direct])

   useEffect(() => {
      if (isData.current) {
         isData.current = false
         return // 최초 렌더링에서는 실행하지 않음
      }
      console.log('Coordinates changed:', coordinates)

      if (coordinates.lon && coordinates.lat) {
         // coordinates의 값이 변경되었을 때만 실행
         console.log('useEffect3')
         dispatch(fetchWeathers(coordinates))
      }
   }, [coordinates])

   /* 개선전
   useEffect(() => {
      if (isData.current) {
         isData.current = false
         return
      }
      console.log('useEffect3')
      dispatch(fetchWeathers(coordinates))
   }, [coordinates]) */

   if (loading) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <Banner />
               <WeatherNavi />
               <h3>Loadding...</h3>
            </Main>
         </Wrap>
      )
   }
   if (error) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <Banner />
               <WeatherNavi />
               <h3>Error:{error}</h3>
            </Main>
         </Wrap>
      )
   }

   /*    if (weathers?.weather?.weather?.[0]?.icon) {
      console.log(weathers.weather.weather[0].icon)
   } else {
      console.log('Icon data is not available yet.')
   }
 */
   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <WeatherNavi />
            <LayerSection>
               <LeftLayer type="Home" data={memoizedWeathers} />
               <RightLayer />
            </LayerSection>
            {/* <div className="section" style={{ width: '66.66%', height: '300px', backgroundColor: 'green', padding: '20px' }}>
               <div className="section1">
                  <h3></h3>module1
               </div>
               <div className="section2">module2</div>
               <div className="section3">module3</div>
            </div> */}
         </Main>
      </Wrap>
   )
}

export default Home
