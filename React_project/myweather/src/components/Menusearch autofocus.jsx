import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import data from '../data/region.json'
import styles from './css/MenuSearch.module.css'

// import { fetchCoordinates } from '../featuers/coordinate/coordinate'
import { useDispatch, useSelector } from 'react-redux'

import SearchResults from './SearchResults'

function MenuSearchautofocus() {
   const [inputText, setInputText] = useState('')
   const [results, setResults] = useState([])
   const [debouncedText, setDebouncedText] = useState('')
   const [autoFocus, setAutoFocus] = useState(false)

   // const dispatch=useDispatch()
   // const {region, loading, error} = useSelector((state) => state.fetchCoordinate)

   const fuse = new Fuse(data, {
      keys: ['시도명', '시군구명', '읍면동명', '리명'],
      threshold: 0.5,
   })

   useEffect(() => {
      const delay = setTimeout(() => {
         setDebouncedText(inputText)
      }, 400)
      return () => clearTimeout(delay)
   }, [inputText])

   useEffect(() => {
      if (debouncedText.trim() !== '') {
         const searchResults = fuse.search(debouncedText).map((result) => result.item)
         setResults(searchResults.slice(0, 10)) // 최대 10개 결과
         setAutoFocus(true) // 결과 리스트에 포커스 이동
      } else {
         setResults([])
         setAutoFocus(false) // 포커스 해제
      }
   }, [debouncedText])

   const onChange = (e) => {
      setInputText(e.target.value)
   }

   const handleSelect = (selectedItem) => {
      console.log('선택된 항목:', selectedItem)
      const region = selectedItem.리명 || selectedItem.읍면동명 || selectedItem.시군구명 || selectedItem.시도명

      const province = selectedItem.시도명

      console.log('Direct API로 보낼 지역 이름:', region)
      console.log('JSON 좌표 비교에 사용할 시도명:', province)
      setInputText(region) // 선택된 값 표시
      setResults([]) // 검색 결과 초기화
      setAutoFocus(false) // 포커스 해제
      // dispatch(fetchCoordinates({ region })) // Redux Thunk 호출
   }

   const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
         // 검색 결과로 포커스 이동
         setAutoFocus(true)
      }
   }

   return (
      <div className={styles.search}>
         <input className={styles.input} type="text" value={inputText} onChange={onChange} />
         <SearchResults results={results} onSelect={handleSelect} onKeyDown={handleKeyDown} autoFocus={autoFocus} />
         {/* <ul className={styles.ul}>
            {results.map((item) => (
               <li key={item.법정동코드}>
                  {item.시도명} {item.시군구명} {item.읍면동명} {item.리명}
               </li>
            ))}
         </ul> */}
      </div>
   )
}

export default MenuSearchautofocus
