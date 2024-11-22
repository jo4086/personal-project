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
   const { co_ppb, no2_ppm, pm2_5, pm10, so2_ppb } = weathers.airPollution
   const { o3_ppb_8h_average } = airHistorys

   useEffect(() => {
      console.log('히스토리콜백')
      dispatch(fetchAirHistorys(patch))
   }, [])

   console.log(co_ppb)

   // 대기오염종류별 AQI 매핑테이블
   const aqiRanges = [
      { aqi: '0-50', pm2_5: [0, 12.0], pm10: [0, 54], co: [0, 4400], o3: [0, 54], no2: [0, 0.053], so2: [0, 35] },
      { aqi: '51-100', pm2_5: [12.1, 35.4], pm10: [55, 154], co: [4500, 9400], o3: [55, 70], no2: [0.054, 0.1], so2: [36, 75] },
      { aqi: '101-150', pm2_5: [35.5, 55.4], pm10: [155, 254], co: [9500, 12400], o3: [71, 85], no2: [0.101, 0.36], so2: [76, 185] },
      { aqi: '151-200', pm2_5: [55.5, 150.4], pm10: [255, 354], co: [12500, 15400], o3: [86, 105], no2: [0.361, 0.649], so2: [186, 304] },
      { aqi: '201-300', pm2_5: [150.5, 250.4], pm10: [355, 424], co: [15500, 30400], o3: [106, 200], no2: [0.65, 1.249], so2: [305, 604] },
      { aqi: '301-500', pm2_5: [250.5, 500.4], pm10: [425, 604], co: [30500, 50400], o3: [201, 604], no2: [1.25, 2.049], so2: [605, 1004] },
   ]

   // AQI 계산 함수
   const calculateAqi = (Cp, param, ranges) => {
      // Cp : value, param : key, ranges : aqiRanges
      for (const range of ranges) {
         const BP_LO = range[param][0] // 오염물질 최솟값
         const BP_HI = range[param][1] // 오염물질 최댓값
         const I_LO = parseInt(range.aqi.split('-')[0], 10) // 오염물질 AQI구간 최솟값
         const I_HI = parseInt(range.aqi.split('-')[1], 10) // 오염물질 AQI구간 최댓값

         // 측정값이 범위 내에 있을 경우 AQI 계산
         if (Cp >= BP_LO && Cp <= BP_HI) {
            return ((I_HI - I_LO) / (BP_HI - BP_LO)) * (Cp - BP_LO) + I_LO
         }
      }

      // 범위 밖인 경우 처리
      if (Cp < ranges[0][param][0]) {
         return parseInt(ranges[0].aqi.split('-')[0], 10) // 최소 AQI 반환
      } else if (Cp > ranges[ranges.length - 1][param][1]) {
         return parseInt(ranges[ranges.length - 1].aqi.split('-')[1], 10) // 최대 AQI 반환
      }

      return 'Out of range' // 예외 처리
   }

   // 입력값과 매핑
   const inputs = { co: co_ppb, no2: no2_ppm, pm2_5, pm10, so2: so2_ppb, o3: o3_ppb_8h_average }

   // AQI 계산
   // Object.entries : 객체의 키와 값을 배열로 변환,,, [co:value]...
   // reduce는 acc에 받은 배열을 누적시킴
   const AQIs = Object.entries(inputs).reduce((acc, [key, value]) => {
      acc[`${key}_AQI`] = calculateAqi(value, key, aqiRanges)
      return acc
   }, {})

   // 구조분해로 결과 변수화
   const { co_AQI, no2_AQI, pm2_5_AQI, pm10_AQI, so2_AQI, o3_AQI } = AQIs
   console.log(AQIs)

   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherNavi />
            <LayerSection>
               <LeftLayer type="AirPollution" data={data} AQI={AQIs} />
               <RightLayer />
            </LayerSection>
         </Main>
      </Wrap>
   )
}
export default AirPollution
