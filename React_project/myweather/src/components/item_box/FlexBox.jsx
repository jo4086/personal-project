import FlexItem from './FlexItem'
import * as L from '../layer/left_layer/css/leftStyled'
import '../layer/left_layer/css/HomeLayer.css'


const FlexBox = ({ data }) => {
   return (
      <L.flexBox>
         {/* {data.map((flexItem) => (
            <FlexItem key={flexItem.id} items={flexItem.items} />
         ))} */}
      </L.flexBox>
   )
}

export default FlexBox
