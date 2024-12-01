// import Items from './Items'
import * as L from '../layer/left_layer/css/leftStyled'
// import '../layer/left_layer/css/HomeLayer.css'

const FlexItemReusable = ({ children }) => {
   return (
      <L.flexItem1>
         <L.itemList>{children}</L.itemList>
      </L.flexItem1>
   )
}

export default FlexItemReusable

{
   /* {items.map((item, index) => (
   <Items key={index} label={item.label} value={item.value} />
))} */
}
