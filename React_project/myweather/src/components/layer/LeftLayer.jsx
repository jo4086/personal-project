import { useSelector } from 'react-redux'
import * as Layers from './left_layer'
import { LeftContainer, RightContainer } from '../../styles/styledComponent'

function LeftLayer({ type, data, region }) {
   const SelectedLayer = Layers[`${type}Layer`]

   const processingData = { ...data }

   if (data.weather) {
      const deg = data.weather.wind_deg
      const directions = ['북풍 (N)', '북동풍 (NE)', '동풍 (E)', '남동풍 (SE)', '남풍 (S)', '남서풍 (SW)', '서풍 (W)', '북서풍 (NW)']

      const direction = directions[Math.round(deg / 45) % 8]
      processingData.direction = direction
   }

   // console.log('left type:', type)
   // console.log('left data: ', data)
   // console.log('프로세싱데이터:', processingData)
   return (
      <LeftContainer>
         <SelectedLayer data={processingData} region={region} />
      </LeftContainer>
   )
}

export default LeftLayer
