import { NavLink } from 'react-router-dom'
import './css/Menu.css'
import React, { useState } from 'react'

import { IoCloseCircleOutline, IoList, IoSearch } from 'react-icons/io5'
import MenuSearch from './Search/Menusearch'

function Menu() {
   const [tabToggle, setTabToggle] = useState(false)
   const toggle = (e) => {
      setTabToggle((prevState) => !prevState)
   }

   return (
      <header>
         <nav>
            <ul>
               <li className="logo">
                  <NavLink className="logo" to="/">
                     <img src="/images/logo.svg" alt="로고" width="30" style={{ boxShadow: '0px 0px 2px 1px rgba(50,50,50,0.5)', borderRadius: '8px' }} /> <span style={{ textShadow: '0px 0px 5px rgba(0,0,0,0.8)' }}>My Weather</span>
                  </NavLink>
               </li>

               <li className="btn" style={{ float: 'right' }}>
                  <div>
                     <IoList size="30" onClick={toggle} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className={`tab ${tabToggle ? 'open' : ''}`}>
                     <ul>
                        <li style={{ fontSize: 16, color: 'black' }}>
                           현재지역 <IoCloseCircleOutline size={30} onClick={toggle} style={{ cursor: 'pointer' }} />
                        </li>
                        <li style={{ margin: '10px auto' }}>
                           <hr style={{ width: '100%' }}></hr>
                        </li>
                        <li className="tab__text">
                           <NavLink className="tab__link">오늘</NavLink>
                        </li>
                        <li>
                           <NavLink className="tab__link">3시간</NavLink>
                        </li>
                        <li>
                           <NavLink className="tab__link">5일</NavLink>
                        </li>
                        <li>
                           <NavLink className="tab__link">대기오염</NavLink>
                        </li>
                     </ul>
                  </div>
               </li>
               <li className="searchbox">
                  <div>
                     {/* <input type="text" placeholder="검색" /> */}
                     <MenuSearch />
                     <IoSearch className="searchicon" />
                  </div>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
