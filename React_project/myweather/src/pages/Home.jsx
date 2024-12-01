import React, { useEffect, useState, useRef, useMemo } from 'react'
import { persistor } from '../store/store'

import { Wrap, Main, LayerSection, Refresh } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import RightLayer from '../components/layer/RightLayer'
import LeftLayer from '../components/layer/LeftLayer'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchWeathers, resetWeather } from '../featuers/weatherSlice'
import { fetchDirects } from '../featuers/directSlice'
import WeatherNavi from '../components/WeatherNavi'

import './css/Home.css'

function Home() {
   const [direct, setDirect] = useState([])
   const [coordinates, setCoordinates] = useState({})
   const [isResetting, setIsResetting] = useState(false)
   const [effectCounter, setEffectCounter] = useState(0)

   const { region } = useParams()
   const { directs } = useSelector((state) => state.directs)
   const { weathers, loading, error } = useSelector((state) => state.weathers)

   const memoizedWeathers = useMemo(() => weathers, [weathers])
   const isData = useRef(true)
   const dispatch = useDispatch()

   useEffect(() => {
      console.log('useEffect1')
      dispatch(fetchDirects(region))
      setEffectCounter((prev) => prev + 1)
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
         setEffectCounter((prev) => prev + 1)
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
         setEffectCounter((prev) => prev + 1)
      }
   }, [coordinates])

   const handleRefresh = async () => {
      if (isResetting) return // 중복 실행 방지
      try {
         setIsResetting(true) // 로딩 상태 활성화
         await persistor.purge() // Redux Persist 데이터 초기화
         dispatch(resetWeather({ force: true })) // Redux 상태 초기화
         await dispatch(fetchWeathers(coordinates)) // 데이터 재패치
      } catch (error) {
         console.error('Error during refresh:', error)
         alert('새로고침 중 문제가 발생했습니다. 다시 시도해주세요.')
      } finally {
         setIsResetting(false) // 로딩 상태 비활성화
      }
   }

   // console.log(memoizedWeathers)

   if (loading || isResetting || effectCounter < 3) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <Banner />
   
               <Refresh onClick={handleRefresh} disabled={isResetting}>
                  {isResetting ? '새로고침' : ' 새로고침'}
               </Refresh>
               <WeatherNavi />
               <h3>Loading...</h3>
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
               <Refresh onClick={handleRefresh} disabled={isResetting}>
                  {isResetting ? '새로고침' : ' 새로고침'}
               </Refresh>
      
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
      
            <Refresh onClick={handleRefresh} disabled={isResetting}>
               {isResetting ? '새로고침' : ' 새로고침'}
            </Refresh>
            <WeatherNavi />
            <LayerSection>
               <LeftLayer type="Home" data={weathers} region={region} event={handleRefresh} state={isResetting} />
               <RightLayer />
            </LayerSection>
         </Main>
      </Wrap>
   )
}

export default Home
