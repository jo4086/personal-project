import './css/HomeLayer.css'
import AqiCircle from './circle/AqiCircle'

import * as L from './css/leftStyled'
import './css/CommonLayer.css'

function AirPollutionLayer({ data, region }) {
   let state = ''

   console.log(data)

   const AQI_array = Object.values(data.AQIs).map((item) => Number(item.aqi))

   const maxAQI = Math.max(...AQI_array)

   // 다른수치 체크용
   // const entries = Object.entries(data.AQIs)
   // console.log(entries[0][1])

   const highest = Object.entries(data.AQIs).reduce(
      (max, [key, value]) => {
         const currentAqi = Number(value.aqi) // aqi를 숫자로 변환
         return currentAqi > max.aqi ? { aqi: currentAqi, status: value.status } : max
      },
      { aqi: -Infinity, status: '' }
   )
   // console.log(highest)

   if (region === 'south-korea') {
      state = `대한민국 (${region})`
   }

   const nes = { ...data.pollution }
   console.log('new', nes)
   const filterPollution = Object.fromEntries(Object.entries(data.pollution).map(([key, value]) => [key, parseFloat(value).toFixed(4)]))
   console.log(filterPollution)

   return (
      <>
         <L.module>
            <L.header style={{ gap:'0'}}>
               <L.title>
                  {state} <L.sub_title style={{ fontSize: '1.3rem', marginTop: '4px' }}>현재 대기상태</L.sub_title>
               </L.title>
               <L.details_button style={{ padding: '10px 20px', borderRadius: '10px' }}>자세히보기</L.details_button>
            </L.header>
            <L.container style={{ margionTop:'0', gap:'0'}}>
               <L.leftBox1>
                  <AqiCircle data={highest} />
               </L.leftBox1>
               <L.rightBox1>
                  <L.itemList>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           미세먼지
                           <span style={{ fontSize: '1rem' }}>
                              {' '}
                              PM<sub>2.5</sub>
                           </span>
                        </span>
                        <span>
                           {Number(filterPollution.pm2_5).toFixed(1)} μg/m<sup>3</sup>
                        </span>
                     </L.items>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           초 미세먼지
                           <span style={{ fontSize: '1rem' }}>
                              {' '}
                              PM<sub>10</sub>
                           </span>
                        </span>{' '}
                        <span>
                           {Number(filterPollution.pm10).toFixed(1)} μg/m<sup>3</sup>
                        </span>
                     </L.items>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           오존
                           <span style={{ fontSize: '1.1rem' }}>
                              {' '}
                              O<sub>3</sub>
                           </span>
                        </span>{' '}
                        <span>{Number(filterPollution.o3_ppb * 0.001).toFixed(4)} ppm</span>
                     </L.items>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           일산화탄소
                           <span style={{ fontSize: '1.1rem' }}> CO</span>
                        </span>{' '}
                        <span>{Number(filterPollution.co_ppb * 0.001).toFixed(4)} ppm</span>
                     </L.items>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           이산화질소
                           <span style={{ fontSize: '1.1rem' }}>
                              {' '}
                              NO<sub>2</sub>
                           </span>
                        </span>{' '}
                        <span>{filterPollution.no2_ppm} ppm</span>
                     </L.items>
                     <L.items>
                        <span style={{ fontWeight: 'bold' }}>
                           아황산가스
                           <span style={{ fontSize: '1.1rem' }}>
                              {' '}
                              SO<sub>2</sub>
                           </span>
                        </span>{' '}
                        <span>{Number(filterPollution.so2_ppb * 0.001).toFixed(4)} ppm </span>
                     </L.items>
                  </L.itemList>
               </L.rightBox1>
            </L.container>
         </L.module>
      </>
   )
}

export default AirPollutionLayer
