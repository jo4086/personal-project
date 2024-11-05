import './css/PokeTemplate.css'

function PokeTemplate({children}) {
   return (
      <div className="container">
         <div className="title"><img src="poke_icon/main_logo.png" alt="로고" /></div>
           <div className="main">{children}</div>
      </div>
   )
}
export default PokeTemplate
