import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
import Menu from '../Menu'
import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'

function Hour({data}) {

   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherNavi />
            {/* <div className='LayerSection' style={{ display:'flex',}}> */}
            <LayerSection>
               <LeftLayer type="Hour" data={data} />
               <RightLayer />
            </LayerSection>
            {/* </div> */}
         </Main>
      </Wrap>
   )
}
export default Hour
