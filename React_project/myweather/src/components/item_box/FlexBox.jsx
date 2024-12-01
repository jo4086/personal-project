import FlexItemReusable from './FlexItemReusable'
import * as L from '../layer/left_layer/css/leftStyled'
import '../layer/left_layer/css/HomeLayer.css'


const FlexBox = ({ data }) => {
   return (
      <L.flexBox>
         {/* {data.map((flexItem) => (
            <FlexItemReusable key={flexItem.id} items={flexItemReusable.items} />
         ))} */}
      </L.flexBox>
   )
}

export default FlexBox
