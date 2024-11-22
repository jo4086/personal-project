import './css/HomeLayer.css'

function HomeLayer({ data }) {
   // console.log('HomeLayer Data: ', data)
   const weather = data.weather
   const forecast = data.forecast
   const air_pollution = data.airPollution
   return (
      <div className="module">
         {/* 최상단 헤더 */}
         <div className="header">
            <div className="title">대한민국</div>
            <button className="details-button">자세히 보기</button>
         </div>

         {/* 좌측과 우측 구역 */}
         <div className="container">
            {/* 좌측 박스 */}
            <div className="leftBox1">
               <div className="time">검색 시간: 2024-11-21 14:30</div>
               <div className="weather-info">
                  <div className="weather-image" style={{ backgroundImage: `url(https://openweathermap.org/img/wn/${weather.icon}@4x.png)` }}></div>
                  <ul className="weather-details">
                     <li className="weather-status">맑음</li>
                     <li className="temperature">
                        {weather.temp.toFixed(1)}°<span style={{fontSize:'0.6em'}}>C</span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* 우측 박스 */}
            <div className="rightBox1">
               <ul className="itemList">
                  <li className="items">
                     <span style={{ fontWeight: 'bold' }}>체감온도</span> <span>{weather.feel_temp.toFixed(1)}°C</span>
                  </li>
                  <li className="items">
                     <span style={{ fontWeight: 'bold' }}>풍향 / 풍속</span>{' '}
                     <span>
                        {data.direction} {weather.wind_speed}m/s
                     </span>
                  </li>
                  {weather.rain && (
                     <li className="items">
                        <span style={{ fontWeight: 'bold' }}>강수량</span> <span>시간당 {weather.rain['1h']}mm</span>
                     </li>
                  )}
                  <li className="items">
                     <span style={{ fontWeight: 'bold' }}>대기질지수</span> <span>좋음</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default HomeLayer
