import React, { useState, useEffect, useCallback } from 'react'
import Fuse from 'fuse.js'
import data from '../data/region.json'
import styles from './css/MenuSearch.module.css'
import SearchResults from './SearchResults'

function MenuSearch() {
   const [inputText, setInputText] = useState('')
   const [results, setResults] = useState([])
   const [debouncedText, setDebouncedText] = useState('')
   const [isSearching, setIsSearching] = useState(false) // 검색 중 상태
   const [selectedIndex, setSelectedIndex] = useState(-1) // 현재 선택된 인덱스

   const fuse = new Fuse(data, {
      keys: ['시도명', '시군구명', '읍면동명', '리명'],
      threshold: 0.5,
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
         setSelectedIndex(-1) // 선택 초기화
         setIsSearching(false) // 검색 종료
         return
      }

      setIsSearching(true) // 검색 시작
      const searchResults = fuse.search(debouncedText).map((result) => result.item)

      // 검색 결과가 이전과 동일한 경우 업데이트하지 않음
      setResults((prevResults) => {
         const isSameResults = prevResults.length === searchResults.length && prevResults.every((item, index) => item.법정동코드 === searchResults[index].법정동코드)

         if (isSameResults) {
            return prevResults // 상태 변경하지 않음
         }

         setSelectedIndex(0) // 첫 번째 항목 자동 선택
         return searchResults.slice(0, 10) // 최대 10개 결과
      })

      setIsSearching(false) // 검색 종료
   }, [debouncedText])

   const onChange = (e) => {
      setInputText(e.target.value)
   }

   const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
         e.preventDefault()
         setSelectedIndex((prev) => (prev + 1) % results.length) // 다음 항목으로 이동
      } else if (e.key === 'ArrowUp') {
         e.preventDefault()
         setSelectedIndex((prev) => (prev - 1 + results.length) % results.length) // 이전 항목으로 이동
      } else if (e.key === 'Enter' && selectedIndex !== -1) {
         const selectedItem = results[selectedIndex]
         handleSelect(selectedItem) // 현재 선택된 항목 처리
      }
   }

   const handleSelect = useCallback((selectedItem) => {
      const region = selectedItem.리명 || selectedItem.읍면동명 || selectedItem.시군구명 || selectedItem.시도명
      setInputText(region)
      setResults([])
      setSelectedIndex(-1) // 선택 초기화
   }, [])

   return (
      <div className={styles.search}>
         <input
            className={styles.input}
            type="text"
            value={inputText}
            onChange={onChange}
            onKeyDown={handleKeyDown} // 키보드 이벤트 연결
         />
         {!isSearching && results.length > 0 && <SearchResults results={results} selectedIndex={selectedIndex} onSelect={handleSelect} />}
      </div>
   )
}

export default MenuSearch