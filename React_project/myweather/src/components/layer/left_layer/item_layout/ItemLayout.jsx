import * as L from '../css/leftStyled'
import '../css/HomeLayer.css'
import LabelValue from './LabelValue'

function ItemLayout({children}) {
   return (
      <L.flexItem1>
         <L.itemList>
            <L.items>
            {children}
            </L.items>
         </L.itemList>
      </L.flexItem1>
   )
}
export default ItemLayout

{
   /* <div className="label"></div>
<div className="value"></div> */
}
