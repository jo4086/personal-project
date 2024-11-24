import React, { useEffect, useState, useRef, useMemo } from 'react'

import { Wrap, Main, LayerSection } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import RightLayer from '../components/layer/RightLayer'
import LeftLayer from '../components/layer/LeftLayer'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchWeathers } from '../featuers/weatherSlice'
import { fetchDirects } from '../featuers/directSlice'
import WeatherNavi from '../components/WeatherNavi'

import './css/Home.css'

function Home() {
   const [direct, setDirect] = useState([])
   const [coordinates, setCoordinates] = useState({})
   const { region } = useParams()
   const { directs } = useSelector((state) => state.directs)
   const { weathers, loading, error } = useSelector((state) => state.weathers)
   
   const memoizedWeathers = useMemo(() => weathers, [weathers])   
   const isData = useRef(true)
   const dispatch = useDispatch()
   
   useEffect(() => {
      // console.log('useEffect1')
      dispatch(fetchDirects(region))
   }, [region, dispatch])

   useEffect(() => {
      if (directs.length > 0 && directs[0] && directs !== direct) {
         // console.log('useEffect2')
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
         // console.log('useEffect3')
         dispatch(fetchWeathers(coordinates))
      }
   }, [coordinates])

   // console.log(memoizedWeathers)

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


   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <WeatherNavi />
            <LayerSection>
               <LeftLayer type="Home" data={weathers} region={region} />
               <RightLayer />
            </LayerSection>
         </Main>
      </Wrap>
   )
}

export default Home
