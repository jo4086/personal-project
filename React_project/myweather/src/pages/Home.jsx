import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Wrap, Main } from '../styles/styledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'

function Home() {
   const navigate = useNavigate()

   useEffect(() => {
      navigate('/weather-south-korea', { replace: true })
   }, [navigate])

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
