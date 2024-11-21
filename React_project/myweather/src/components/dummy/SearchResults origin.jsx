import styles from './css/MenuSearch.module.css'
import React, { useState, useEffect } from 'react'
import { useKeyPress } from '@uidotdev/usehooks'

function SearchResultsorigin({ results, onSelect }) {
   const [selectedIndex, setSelectedIndex] = useState(-1)

   useEffect(() => {
      if (results.length > 0) {
         setSelectedIndex(0)
      } else {
         setSelectedIndex(-1)
      }
   }, [results])

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
   //    const handleKeyDown = (e) => {
   //       if (e.key === 'ArrowDown') {
   //          setSelectedIndex((prev) => (prev + 1) % results.length)
   //       } else if (e.key === 'ArrowUp') {
   //          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
   //       } else if (e.key === 'Enter' && selectedIndex !== -1) {
   //          onSelect(results[selectedIndex])
   //       }
   //    }

   //    const handleKeyDown = (e, index) => {
   //       if (e.key === 'Enter') {
   //          onSelect(results[index]) // 선택된 항목 실행
   //       }
   //    }

   //    const handleKeyDown = (e) => {
   //       if (e.key === 'ArrowDown') {
   //          setSelectedIndex((prev) => (prev + 1) % results.length)
   //       } else if (e.key === 'ArrowUp') {
   //          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
   //       } else if (e.key === 'Enter' && selectedIndex !== -1) {
   //          onSelect(results[selectedIndex])
   //       }
   //    }

   return (
      <ul tabIndex={0} onKeyDown={handleKeyDown} className={styles.ul}>
         {results.map((item, index) => (
            <li key={item.법정동코드} className={index === selectedIndex ? styles.selected : ''} onClick={() => onSelect(item)} onMouseOver={() => setSelectedIndex(index)}>
               {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
            </li>
         ))}
      </ul>
      // <ul className={styles.ul}>
      //    {results.map((item, index) => (
      //       <li key={item.법정동코드} tabIndex={0} onKeyDown={(e) => handleKeyDown(e, index)} onClick={() => onSelect(item)} className={index === selectedIndex ? 'styles.selected' : ''}>
      //          {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
      //       </li>
      //    ))}
      // </ul>
   )
}

export default SearchResultsorigin

/* 

import { useKeyPress } from '@xyflow/react'
const spacePressed = useKeyPress('Space')
   {
      spacePressed && <p>Space pressed!</p>
   }

*/
