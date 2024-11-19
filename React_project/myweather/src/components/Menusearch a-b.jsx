import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import data from '../data/region.json'
import styles from './css/MenuSearch.module.css'
import SearchResults from './SearchResults'

function MenuSearch() {
   const [inputText, setInputText] = useState('')
   const [results, setResults] = useState([])
   const [debouncedText, setDebouncedText] = useState('')
   const [isSearching, setIsSearching] = useState(false)
   const [selectedIndex, setSelectedIndex] = useState(-1)

   const fuse = new Fuse(data, {
      keys: ['시도명', '시군구명', '읍면동명', '리명'],
      threshold: 0.2,
      includeScore: true, // Fuse.js 점수 포함
   })

   // 디바운스 처리
   useEffect(() => {
      const delay = setTimeout(() => {
         setDebouncedText(inputText)
      }, 400)
      return () => clearTimeout(delay)
   }, [inputText])

   // 검색 결과 업데이트
   useEffect(() => {
      if (debouncedText.trim() === '') {
         setResults([])
         setSelectedIndex(-1)
         setIsSearching(false)
         return
      }

      setIsSearching(true)

      // **정렬 추가: 순위와 주소 계층을 기준으로 정렬**
      const searchResults = fuse.search(debouncedText).map((result) => result.item)

      // **정렬: 계층 구조와 순위를 함께 고려**
      const sortedResults = searchResults.sort((a, b) => {
         // 1. "시군구명"만 포함된 데이터 우선 처리
         const isUpperLevel = (item) => item.리명 === '' && item.읍면동명 === '' && item.시군구명 !== ''

         if (isUpperLevel(a) && !isUpperLevel(b)) {
            return -1 // `a`가 상위로 이동
         }
         if (!isUpperLevel(a) && isUpperLevel(b)) {
            return 1 // `b`가 상위로 이동
         }

         // 2. 기본 계층 구조 정렬: 시군구명 > 읍면동명 > 리명
         const getPriority = (item) => (item.리명 ? 4 : item.읍면동명 ? 3 : item.시군구명 ? 2 : 1)

         const aPriority = getPriority(a)
         const bPriority = getPriority(b)

         if (aPriority !== bPriority) {
            return aPriority - bPriority
         }

         // 3. 순위로 정렬
         if (a.순위 !== b.순위) {
            return a.순위 - b.순위
         }

         // 4. 기타: 법정동코드로 정렬 (같은 계층과 순위)
         return a.법정동코드 - b.법정동코드
      })

      setResults(sortedResults.slice(0, 10)) // 최대 10개 결과
      setSelectedIndex(0)
      setIsSearching(false)
   }, [debouncedText])

   const onChange = (e) => {
      setInputText(e.target.value)
   }

   const handleSelect = (selectedItem) => {
      const region = selectedItem.리명 || selectedItem.읍면동명 || selectedItem.시군구명 || selectedItem.시도명
      setInputText(region)
      setResults([])
      setSelectedIndex(-1)
   }

   return (
      <div className={styles.search}>
         <input className={styles.input} type="text" value={inputText} onChange={onChange} />
         {!isSearching && results.length > 0 && <SearchResults results={results} selectedIndex={selectedIndex} onSelect={handleSelect} />}
      </div>
   )
}

export default MenuSearch
