import * as Layers from './left_layer'
import { LeftContainer, RightContainer } from '../../styles/styledComponent'
import { useMemo } from 'react'

function LeftLayer({ type, data, region}) {
   const SelectedLayer = Layers[`${type}Layer`]



   return (
      <LeftContainer>
         <SelectedLayer data={data} region={region} />
      </LeftContainer>
   )
}

export default LeftLayer
