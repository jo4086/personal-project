import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
import Menu from '../Menu'
import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import { useSelector } from 'react-redux'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'

function AirPollution({ data }) {
   const { weathers } = useSelector((state) => state.weathers)
   console.log(weathers)

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
