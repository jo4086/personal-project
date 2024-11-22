import './css/HomeLayer.css'
import AqiCircle from './circle/AqiCircle'

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
         <div className="module">
            <div className="header">
               <div className="title">{state} </div>
               <button className="details-button">자세히 보기</button>
            </div>
            <div className="sub_title">현재 대기상태</div>
            <div className="container">
               <div className="leftBox1">
                  <AqiCircle data={highest} />
               </div>
               <div className="rightBox1">
                  <ul className="itemList">
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>
                           미세먼지{' '}
                           <span style={{ fontSize: '0.8rem' }}>
                              PM<sub>2.5</sub>
                           </span>
                        </span>{' '}
                        <span>
                           {Number(filterPollution.pm2_5).toFixed(1)} μg/m<sup>3</sup>
                        </span>
                     </li>
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>초 미세먼지</span>{' '}
                        <span>
                           {Number(filterPollution.pm10).toFixed(1)} μg/m<sup>3</sup>
                        </span>
                     </li>
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>오존</span> <span>{Number(filterPollution.o3_ppb * 0.001).toFixed(4)} ppm</span>
                     </li>
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>일산화탄소</span> <span>{Number(filterPollution.co_ppb * 0.001).toFixed(4)} ppm</span>
                     </li>
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>이산화질소</span> <span>{filterPollution.no2_ppm} ppm</span>
                     </li>
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>아황산가스</span> <span>{Number(filterPollution.so2_ppb * 0.001).toFixed(4)} ppm </span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="module">
            <div className="header">
               <div className="title2">대기질 정보 </div>
            </div>
            <div className="sub_title">현재 대기상태</div>
            <div className="container">
               <div className="leftBox1"></div>
               <div className="rightBox1"></div>
            </div>
         </div>
      </>
   )
}

export default AirPollutionLayer
