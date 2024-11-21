import { useSelector } from 'react-redux'
import * as Layers from './left_layer'
import { LeftContainer, RightContainer } from '../../styles/styledComponent'

function LeftLayer({ type, data }) {
   const SelectedLayer = Layers[`${type}Layer`]

   console.log('left type:', type)
   console.log('left data: ', data)
   // console.log(data)
   // console.log(weathers)

   return (
      <LeftContainer>
         <SelectedLayer data={data} />
      </LeftContainer>
   )
}

export default LeftLayer
