import React, { useEffect, useRef, useState } from 'react'
import styles from './css/MenuSearch.module.css'

function SearchResults2({ results, onSelect }) {
   const [selectedIndex, setSelectedIndex] = useState(-1)
   const resultsRef = useRef(null) // 리스트 포커스 관리

   useEffect(() => {
      if (results.length > 0 && resultsRef.current) {
         resultsRef.current.focus() // 검색 결과가 업데이트되면 리스트로 포커스 이동
      }
   }, [results])

   const handleKeyDown = (e) => {
      e.preventDefault()
      if (e.key === 'ArrowDown') {
         setSelectedIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === 'ArrowUp') {
         setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === 'Enter' && selectedIndex !== -1) {
         onSelect(results[selectedIndex])
      }
   }

   return (
      <ul tabIndex={0} ref={resultsRef} onKeyDown={handleKeyDown} className={styles.ul}>
         {results.map((item, index) => (
            <li key={item.법정동코드} className={index === selectedIndex ? styles.selected : ''} onClick={() => onSelect(item)} onMouseOver={() => setSelectedIndex(index)}>
               {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
            </li>
         ))}
      </ul>
   )
}

export default SearchResults2
