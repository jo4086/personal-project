import React, { memo } from 'react'
// import styles from './css/MenuSearch.module.css'
import styles from '../css/MenuSearch.module.css'

const SearchResults = memo(({ results, selectedIndex, onSelect }) => {
   console.log(results)
   return (
      <ul className={styles.ul}>
         {results.map((item, index) => (
            <li key={item.법정동코드} className={index === selectedIndex ? styles.selected : ''} onClick={() => onSelect(item)}>
               {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
            </li>
         ))}
      </ul>
   )
})

export default SearchResults
