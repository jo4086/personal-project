import React, { useState, useRef } from 'react'
import PokeTemplate from './components/PokeTemplate.jsx'
import PokeList from './components/PokeList.jsx'
import PokeInsert from './components/PokeInsert.jsx'
// import PokeImages from './components/PokeImages.jsx'
import PokeImagesTest from './components/PokeImagesTest.jsx'

function App() {
   const [pokes, setPokes] = useState([
      {
         id: '',
         name: '',
         trinumber: '',
         tribe: '',
      },
   ])
   const nextPoke = useRef(1)

   // const onInsert
   return (
      <PokeTemplate>
         {/* <PokeImages /> */}
         <PokeInsert />
         <PokeImagesTest />
         <PokeList />
      </PokeTemplate>
   )
}

export default App
