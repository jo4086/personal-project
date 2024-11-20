import './css/WeatherNavi.css'
import { NavLink, useParams } from 'react-router-dom'

function WeatherNavi() {
   const { region } = useParams()
   return (
      <div className="Navi" style={{ position: 'relative' }}>
         <ul>
            <li className="navi_list">
               <NavLink to={`/weather/${region}/today`}>오늘</NavLink>
            </li>
            <li className="navi_list">
               <NavLink to={`/weather/${region}/hour_3`}>3시간</NavLink>
            </li>
            <li className="navi_list">
               <NavLink to={`/weather/${region}/day_5`}>주간</NavLink>
            </li>
            <li className="navi_list">
               <NavLink to={`/weather/${region}/air_pollution`}>대기오염</NavLink>
            </li>
         </ul>
         {/* <div style={{ position: 'absolute', width: '100%', height: '100px', backgroundColor: 'yellow', top: '0px' }}>
            <h1>hi</h1>
         </div>
         <div style={{ width: '66.66%', height: '600px', backgroundColor: 'green', marginTop: '100px' }}></div> */}
      </div>
   )
}
export default WeatherNavi
