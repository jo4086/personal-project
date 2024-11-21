import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
import Menu from '../Menu'
import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import { useDispatch, useSelector } from 'react-redux'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'
import { useEffect } from 'react'
import { fetchAirHistorys } from '../../featuers/airHistorySlice'

function AirPollution({ data }) {
   const dispatch = useDispatch()
   const { weathers } = useSelector((state) => state.weathers)
   const { airHistorys } = useSelector((state) => state.airHistorys)
   const patch = {
      lon: weathers.weather.lon,
      lat: weathers.weather.lat,
      end: weathers.weather.dt,
   }
   console.log('aurP :', weathers)
   console.log('AP:', airHistorys)

   const ppb = []
   const { co_ppb, no2_ppm, pm2_5, pm10, so2_ppb } = weathers.airPollution
   console.log(co_ppb)

   //    const o3_ppmb = airHistorys.map((item) => {
   //    ppb.push(item.o3_ppb)
   // })
   // console.log(airHistorys)
   useEffect(() => {
      console.log('히스토리콜백')
      dispatch(fetchAirHistorys(patch))
   }, [])

   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherNavi />
            <LayerSection>
               <LeftLayer type="AirPollution" data={data} />
               <RightLayer />
            </LayerSection>
         </Main>
      </Wrap>
   )
}
export default AirPollution
