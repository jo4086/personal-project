import { Wrap, Main } from '../../styles/styledComponent'
import Menu from '../Menu'
import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'

function AirPollution() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherNavi />
         </Main>
      </Wrap>
   )
}
export default AirPollution
