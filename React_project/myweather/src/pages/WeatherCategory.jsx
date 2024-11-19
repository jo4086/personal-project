import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

import '../styles/common.css'
import { Wrap, Main } from '../styles/styledComponent'

function WeatherCategory({ catrgory }) {
   const dispatch = useDispatch()
   const [page, setPage] = useState({
      today: 1,
      hour_3: 1,
      day_5: 1,
      air_pollution: 1,
   })

   return (
      <Wrap>
         <Menu />
         <Main>
            <h1>hi</h1>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default WeatherCategory
