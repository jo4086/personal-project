// import { Wrap, Main, LayerSection } from '../../styles/styledComponent'
// import Menu from '../Menu'
// import WeatherNavi from '../WeatherNavi'
import '../css/Category.css'
import { useSelector } from 'react-redux'
import LeftLayer from '../layer/LeftLayer'
import RightLayer from '../layer/RightLayer'
import Layout from './Layout'

function Today({ data, region }) {
   // const {weathers} = useSelector((state)=>state.weathers)
   // console.log(data)

   return (
      <Layout>
         <LeftLayer type="Today" data={data} region={region} />
         <RightLayer />
      </Layout>
   )
}
export default Today
