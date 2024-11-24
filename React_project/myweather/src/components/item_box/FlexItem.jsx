import Items from './Items'
import * as L from '../layer/left_layer/css/leftStyled'
import '../layer/left_layer/css/HomeLayer.css'

const FlexItem = ({ items }) => {
   return (
      <L.flexItem1>
         <L.itemList>
            {items.map((item, index) => (
               <Items key={index} label={item.label} value={item.value} />
            ))}
         </L.itemList>
      </L.flexItem1>
   )
}

export default FlexItem