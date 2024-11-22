// import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
// import Menu from '../Menu'
// import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import '../../styles/common.css'
import { useDispatch, useSelector } from 'react-redux'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'
import { useEffect } from 'react'
import { fetchAirHistorys } from '../../featuers/airHistorySlice'
import { aqiCal } from './aqi/aqiCal'
import Layout from './Layout'

function AirPollution({ data, region }) {
   const dispatch = useDispatch()
   const { weathers } = useSelector((state) => state.weathers)
   const { airHistorys } = useSelector((state) => state.airHistorys)
   const patch = {
      lon: weathers.weather.lon,
      lat: weathers.weather.lat,
      end: weathers.weather.dt,
   }
   const { co_ppb, no2_ppm, pm2_5, pm10, so2_ppb } = weathers.airPollution
   const { o3_ppb_8h_average } = airHistorys

   useEffect(() => {
      // console.log('히스토리콜백')
      dispatch(fetchAirHistorys(patch))
   }, [])

   // 객체구조분해로 이름변환
   const inputs = {
      co: co_ppb,
      no2: no2_ppm,
      pm2_5,
      pm10,
      so2: so2_ppb,
      o3: o3_ppb_8h_average,
   }

   // AQI 계산
   const AQIs = aqiCal(inputs)
   const pollution = { ...data.airPollution }
   const airData = { pollution, AQIs }
   return (
      <Layout>
         <LeftLayer type="AirPollution" data={airData} region={region} />
         <RightLayer />
      </Layout>
   )
}
export default AirPollution

