import React, { useState, useRef } from 'react'
import PokeTemplate from './components/PokeTemplate.jsx'
import PokeList from './components/PokeList.jsx'
import PokeInsert from './components/PokeInsert.jsx'
// import PokeImages from './components/PokeImages.jsx'
import PokeListImages from './components/PokeListImages.jsx'

function App() {
   const [pokes, setPokes] = useState([
      {
         id: '1',
         name: '이상해씨',
         uniqueNumber: '000100',
         speciesNumber: '0001',
         src: '',
      },
      {
         id: '2',
         name: '파이리',
         uniqueNumber: '000200',
         speciesNumber: '0002',
         src: '',
      },
      {
         id: '3',
         name: '꼬부기',
         uniqueNumber: '000300',
         speciesNumber: '0003',
         src: '',
      },
   ])
   const nextPoke = useRef(1)

   // const onInsert
   return (
      <PokeTemplate>
         <PokeInsert />
         <PokeList />
      </PokeTemplate>
   )
}

export default App
