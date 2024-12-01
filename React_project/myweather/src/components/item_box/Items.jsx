import * as L from '../layer/left_layer/css/leftStyled'
import '../layer/left_layer/css/HomeLayer.css'

const rotate = {
   '북 (N)': 0,
   '북동 (NE)': 45,
   '동 (E)': 90,
   '남동 (SE)': 135,
   '남 (S)': 180,
   '남서 (SW)': 225,
   '서 (W)': 270,
   '북서 (NW)': 315,
}

const Items = ({ label, value, icon: Icon, unit, color, extra = null }) => {
   console.log(extra)

   const direction = extra?.direction
   const rotation = direction ? `${rotate[direction] - 90}deg` : '0deg'

   return (
      <>
         <L.items>
            <div className="label">
               {Icon && <Icon color={color} />}
               <span>{label}</span>
            </div>

            {extra && <span style={{ fontSize: '0.6em', width: '20%', textAlign: 'center' }}>{extra.direction}</span>}
            <div
               style={{
                  transform: `rotate(${rotation})`,
                  display: 'flex',
                  alignItems: 'center',
               }}>
               {extra && <extra.icon />}
            </div>

            <div className="value">
               <span style={{ letterSpacing: '2px' }}>{value}</span>
               <span>{unit}</span>
            </div>
         </L.items>
      </>
   )
}

export default Items

//    <div className="info">
//       <span>
//          {label}: {value} {unit}
//       </span>
//    </div>
//    {extra && <div className="extra">{extra}</div>}
// </div>

/* 

   return (
      <div className="items">
         <div className="label">
            {Icon && <Icon style={{ marginRight: '8px' }} />} 
            <span>{label}</span>
         </div>
         {extra && <span style={{ fontSize: '0.85rem', marginRight: '8px' }}>{extra}</span>} 
         <div className="value">
            <span>{value}</span>
            {unit && (
               <span>
                  {unit.includes('/') ? (
                     unit.split('/').map((u, index) => (
                        <span
                           key={index}
                           style={{
                              position: 'relative',
                              top: index === 0 ? '-2.5px' : '2.5px',
                              fontSize: index === 0 ? '0.95rem' : '0.9rem',
                              marginLeft: index === 1 ? '-2px' : '2.5px',
                           }}
                        >
                           {u}
                        </span>
                     ))
                  ) : (
                     <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>{unit}</span>
                  )}
               </span>
            )}
         </div>
      </div>
   )
*/
