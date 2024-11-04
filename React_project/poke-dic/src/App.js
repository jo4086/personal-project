import React, { useState } from 'react'
import PokeTemplate from './components/PokeTemplate.jsx'
import PokeList from './components/PokeList.jsx'
import PokeInsert from './components/PokeInsert.jsx'
import PokeImages from './components/PokeImages.jsx'

function App() {
   return (
      <PokeTemplate>
         <PokeImages />
         <PokeList />
         <PokeInsert />
      </PokeTemplate>
   )
}

export default App
