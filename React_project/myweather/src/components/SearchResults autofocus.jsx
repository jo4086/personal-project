import styles from './css/MenuSearch.module.css'
import React, { useState, useEffect,useRef,memo } from 'react'

function SearchResultsautofocus({ results, onSelect, autoFocus }) {
   const [selectedIndex, setSelectedIndex] = useState(-1)
   const resultsRef = useRef(null)

  useEffect(() => {
     if (autoFocus && results.length > 0) {
        // 검색 결과 리스트에 포커스 자동 이동
        resultsRef.current?.focus()
     }
  }, [autoFocus, results])

   const handleKeyDown = (e) => {
      e.preventDefault()
      if (e.key === 'ArrowDown') {
         setSelectedIndex((prev) => {
            const newIndex = (prev + 1) % results.length
            console.log('ArrowDown - selectedIndex:', newIndex) // 확인
            return newIndex
         })
      } else if (e.key === 'ArrowUp') {
         setSelectedIndex((prev) => {
            const newIndex = (prev - 1 + results.length) % results.length
            console.log('ArrowUp - selectedIndex:', newIndex) // 확인
            return newIndex
         })
      } else if (e.key === 'Enter' && selectedIndex !== -1) {
         onSelect(results[selectedIndex])
      }
   }
   console.log(results)

  return (
     <ul
        ref={resultsRef}
        tabIndex={0} // 포커스 받을 수 있도록 설정
        onKeyDown={handleKeyDown}
        className={styles.ul}
     >
        {results.map((item, index) => (
           <li key={item.법정동코드} className={index === selectedIndex ? styles.selected : ''} onClick={() => onSelect(item)} onMouseOver={() => setSelectedIndex(index)}>
              {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
           </li>
        ))}
     </ul>
  )
}

export default SearchResultsautofocus

