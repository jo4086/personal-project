// import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
// import Menu from '../Menu'
// import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import '../../styles/common.css'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'
import Layout from './Layout'

function Hour({ data, region }) {
   return (
      <Layout>
         <LeftLayer type="Hour" data={data} region={region} />
         <RightLayer />
      </Layout>
   )
}
export default Hour
