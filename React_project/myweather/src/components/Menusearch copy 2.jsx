import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import data from '../data/region.json'
import styles from './css/MenuSearch.module.css'
import SearchResults from './SearchResults'

function MenuSearch2() {
   const [inputText, setInputText] = useState('')
   const [results, setResults] = useState([])
   const [debouncedText, setDebouncedText] = useState('')
   const [isItemSelected, setIsItemSelected] = useState(false)

   const fuse = new Fuse(data, {
      keys: ['시도명', '시군구명', '읍면동명', '리명'],
      threshold: 0.5,
   })

   useEffect(() => {
      if (isItemSelected) return
      const delay = setTimeout(() => {
         setDebouncedText(inputText)
      }, 300)
      return () => clearTimeout(delay)
   }, [inputText, isItemSelected])

   useEffect(() => {
      if (isItemSelected || debouncedText.trim() === '') {
         setResults([])
         return
      }
      const searchResults = fuse.search(debouncedText).map((result) => result.item)
      setResults(searchResults.slice(0, 10))
   }, [debouncedText, isItemSelected])

   const onChange = (e) => {
      setInputText(e.target.value)
      setIsItemSelected(false)
   }

   const handleSelect = (selectedItem) => {
      setInputText(selectedItem.리명 || selectedItem.읍면동명 || selectedItem.시군구명 || selectedItem.시도명)
      setResults([])
      setIsItemSelected(true)
      console.log('선택된 항목:', selectedItem)
   }

   return (
      <div className={styles.search}>
         <input className={styles.input} type="text" value={inputText} onChange={onChange} />
         <SearchResults results={results} onSelect={handleSelect} />
      </div>
   )
}

export default MenuSearch2
