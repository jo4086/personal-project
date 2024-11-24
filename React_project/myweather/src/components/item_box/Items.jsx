import * as L from '../layer/left_layer/css/leftStyled'
import '../layer/left_layer/css/HomeLayer.css'

const Items = ({ label, value, icon: Icon, unit, extra = null }) => {
   return (
      <div className="items">
         <div className="label">
            {Icon && <Icon style={{ marginRight: '8px' }} />} {/* 아이콘 */}
            <span>{label}</span>
         </div>
         {extra && <span style={{ fontSize: '0.85rem', marginRight: '8px' }}>{extra}</span>} {/* 추가 정보 (예: 풍향) */}
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
}

export default Items