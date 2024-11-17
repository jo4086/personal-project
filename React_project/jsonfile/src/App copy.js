import React, { useState, useEffect } from 'react'
import locationsData from './data/region.json'

function App() {
   const [searchTerm, setSearchTerm] = useState('')
   const [filteredLocations, setFilteredLocations] = useState([])
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

   // searchTerm이 변경될 때마다 500ms 후에 debouncedSearchTerm을 업데이트
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm)
      }, 500)
      return () => clearTimeout(timer) // 타이머 정리
   }, [searchTerm])

   // debouncedSearchTerm을 사용하여 필터링 후 정렬
   useEffect(() => {
      // "서울"을 검색하면 "서울특별시"에 속하는 시군구만 필터링
      const filtered = locationsData
         .filter((location) => {
            // 검색어가 시도명, 시군구명, 읍면동명에 포함되는지 확인
            return location.시도명.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || location.시군구명.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || location.읍면동명.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
         })
         .sort((a, b) => {
            // 시군구명과 읍면동명으로 가나다순 정렬
            return a.시군구명.localeCompare(b.시군구명) || a.읍면동명.localeCompare(b.읍면동명)
         })

      // 만약 검색어가 시도명만 포함하는 경우
      if (debouncedSearchTerm.trim() && !filtered.some((location) => location.읍면동명)) {
         // 시군구명만 포함된 데이터 중에서 중복 제거 후, 가나다순으로 정렬
         const uniqueCities = []
         filtered.forEach((location) => {
            if (location.읍면동명 === '' && !uniqueCities.includes(location.시군구명)) {
               uniqueCities.push(location.시군구명)
            }
         })

         // 상위 10개 시군구명만 선택
         const top10Cities = uniqueCities.slice(0, 10)

         // 상위 10개의 시군구명을 포함한 데이터 필터링
         const top10Locations = filtered.filter((location) => top10Cities.includes(location.시군구명) && location.읍면동명 === '')

         setFilteredLocations(top10Locations)
      } else {
         // 읍면동명까지 포함된 검색어를 처리하는 경우, 전체 결과 표시
         setFilteredLocations(filtered)
      }
   }, [debouncedSearchTerm])

   return (
      <div>
         <h1>지역 검색</h1>
         <input type="text" placeholder="검색어 입력" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
         <ul>
            {filteredLocations.length > 0 ? (
               filteredLocations.map((location) => (
                  <li key={location.법정동코드}>
                     {location.시도명} {location.시군구명} {location.읍면동명}
                  </li>
               ))
            ) : (
               <li>검색 결과가 없습니다.</li>
            )}
         </ul>
      </div>
   )
}

export default App
