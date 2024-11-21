const fs = require('fs')
const path = require('path')

// JSON 파일 경로 설정 (현재 디렉토리에 region.json 파일이 있다고 가정)
const jsonFilePath = path.join(__dirname, 'region_v2.json')

// JSON 파일 읽기
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error('JSON 파일 읽기 오류:', err)
      return
   }

   try {
      // JSON 데이터를 파싱
      const jsonData = JSON.parse(data)

      // 데이터 변환
      const transformedData = jsonData.map((item) => {
         // 시군구명, 읍면동명, 리명을 합쳐서 합한행정명 생성
         const 합한행정명 = [item['시군구명'], item['읍면동명'], item['리명']]
            .filter((value) => value) // 빈 문자열 제거
            .join(' ') // 공백으로 연결

         // 변환된 데이터 구조
         return {
            법정동코드: item['법정동코드'],
            시도명: item['시도명'],
            합한행정명: 합한행정명 || null, // 값이 없으면 null
         }
      })

      // 변환된 데이터를 JSON 문자열로 변환
      const transformedJson = JSON.stringify(transformedData, null, 2)

      // 변환된 데이터를 다시 파일에 쓰기
      fs.writeFile(jsonFilePath, transformedJson, 'utf8', (writeErr) => {
         if (writeErr) {
            console.error('JSON 파일 쓰기 오류:', writeErr)
         } else {
            console.log('JSON 파일 수정 완료:', jsonFilePath)
         }
      })
   } catch (parseErr) {
      console.error('JSON 데이터 파싱 오류:', parseErr)
   }
})

