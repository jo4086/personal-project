import React, { useEffect, useState, useRef } from 'react'

import { Wrap, Main } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchWeather } from '../featuers/weatherSlice'

function Home3() {
   const dispatch = useDispatch()
   const [direct, setDirect] = useState([])
   const { directs } = useSelector((state) => state.directs)
   const { weathers, loading, error} = useSelector((state) =>state.weathers)
   const isData = useRef(true)
   const { region } = useParams()

   useEffect(() => {
      if (isData.current) {
         isData.current = false
         return
      }

      if (directs.length === 0) {
         return
      }
      setDirect(directs)
   }, [directs])

   if (direct.length !== 0) {
      console.log(direct)
      let { lon, lat } = direct[0]
      lat = lat.toFixed(6)
      lon = lon.toFixed(6)


      // console.log(lat.toFixed(6), lon.toFixed(6))
   }
   // console.log(direct)
   // if (direct.length !== 0) {
   //    console.log(direct)
   // }
   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
         </Main>
      </Wrap>
   )
}

export default Home
3