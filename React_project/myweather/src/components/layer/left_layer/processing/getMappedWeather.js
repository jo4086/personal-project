import { weatherMapper } from '../../../../data/mapper/index'
import Items from '../../../item_box/Items'

function getMappedWeather(array) {
   // console.log(weatherMapper)
   console.log(array)
   const mapper = array.map((item) => {
      return Object.keys(weatherMapper).map((key) => {
         const weather = weatherMapper[key]
         const value = item[key] // 각 항목의 값 (예: temp, max_temp 등)
         return (
            <Items
               key={key}
               icon={weather.icon}
               value={value}
               label={weather.label}
               unit={weather.unit}
               extra={null} // 추가 정보가 있으면 넣을 수 있습니다.
            />
         )
      })
   })
   const group1 = [
      { key: 'feel_temp' }, // 체감온도
      { key: 'max_temp' }, // 최고기온
      { key: 'min_temp' }, // 최저기온
      { key: 'wind' }, // 풍향 / 풍속
      { key: 'humidity' }, // 습도
   ]

   const group2 = [
      { key: 'aqi' }, // 대기질
      { key: 'pm10' }, // 미세먼지
      { key: 'pm2_5' }, // 초미세먼지
   ]

   const group3 = [
      { key: 'clouds' }, // 구름량
      { key: 'pop' }, // 강수확률
      { key: 'rain' }, // 비
      // { key: 'snow' }, // 눈
   ]

   const renderItems = (group) => {
      return group.map((item) => {
         const { key } = item
         const mappingData = weatherMapper[key]

         let value

         if (key === 'wind') {
            const windData = array[0] // 첫 번째 데이터 객체
            const { wind_deg, wind_gust, wind_speed } = windData

            // wind 관련 데이터를 별도로 처리
            // const windDirection = wind_deg ? `${wind_deg}°` : '정보 없음'
            const windSpeed = wind_speed ? `${wind_speed}` : '정보 없음'

            value = ` ${windSpeed}`
         } else {
            value = array[0][key]
         }

         const isWind = key === 'wind'
         const extra = isWind
            ? {
                 icon: mappingData.extra[array[0].wind_speed > 5 ? 'hight' : 'low'],
                 direction: array[0].scripts.direction,
                 wind_deg: array[0].wind_deg,
              }
            : null

         return (
            <Items
               key={key}
               icon={mappingData.icon}
               value={value}
               label={mappingData.label}
               unit={mappingData.unit}
               color={mappingData.color}
               extra={extra}
            />
         )
      })
   }
   console.log(renderItems)
   return { renderItems, group1, group2, group3 }
   //  return { mapper, group1, group2, group3 }
}

export default getMappedWeather
