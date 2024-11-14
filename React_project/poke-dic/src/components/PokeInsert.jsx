import './css/PokeInsert.css'
import { IoMdAddCircleOutline } from 'react-icons/io'

function PokeInsert() {
   return (
      <div className="insert__layer">
         <form className="input__box">
            <p>포켓몬 도감</p>
            <input type="text" placeholder='포켓몬 검색'/>
            <button type="submit">
               <IoMdAddCircleOutline />
            </button>
         </form>
      </div>
   )
}
export default PokeInsert
