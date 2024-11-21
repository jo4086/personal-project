import React, { memo } from 'react'
// import styles from './css/MenuSearch.module.css'
import styles from '../css/MenuSearch.module.css'

const SearchResults = memo(({ results, selectedIndex, onSelect }) => {
   console.log(results)
   return (
      <ul className={styles.ul}>
         {results.map((item, index) => (
            <li key={item.법정동코드} className={index === selectedIndex ? styles.selected : ''} onClick={() => onSelect(item)}>
               {/* 시도명 + 합한행정명 출력 */}
               {item.시도명} {item.합한행정명 || ''}
            </li>
         ))}
      </ul>
   )
})

export default SearchResults
