import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import data from './data/region.json'

import { fatchDirects } from './features/directSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
   const [inputText, setInputText] = useState('')
   const [results, setResults] = useState([])
   const [debouncedText, setDebouncedText] = useState('')

   const fuse = new Fuse(data, {
      keys: ['시도명', '시군구명', '읍면동명', '리명'],
      threshold: 0.3,
   })

   useEffect(() => {
      const delay = setTimeout(() => {
         setDebouncedText(inputText)
      }, 300)
      return () => clearTimeout(delay)
   }, [inputText])

   useEffect(() => {
      if (debouncedText.trim() !== '') {
         const searchResults = fuse.search(debouncedText).map((result) => result.item)
         setResults(searchResults.slice(0, 10)) // 최대 10개로 제한
      } else {
         setResults([])
      }
   }, [debouncedText])

   const onChange = (e) => {
      setInputText(e.target.value)
   }

   return (
      <div>
         <input type="text" value={inputText} onChange={onChange} />
         <ul>
            {results.map((item) => (
               <li key={item.법정동코드}>
                  {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default App
