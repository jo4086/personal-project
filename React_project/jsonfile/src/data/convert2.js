const fs = require('fs')
const path = require('path')

// 현재 파일(locations.json)의 절대 경로를 얻기 위해 __dirname 사용
const jsonFilePath = path.join(__dirname, 'region.json')

// JSON 파일 읽기
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
   if (err) {
      console.log('파일 읽기 오류:', err)
      return
   }

   // JSON 데이터 파싱
   const locations = JSON.parse(data)

   // 삭제일자가 존재하는 객체를 제거하고, 생성일자와 과거법정동코드를 제외
   const filteredLocations = locations
      .map(({ 삭제일자,...rest }) => rest) // 생성일자와 과거법정동코드 속성 제외

   // 수정된 데이터를 다시 JSON 파일로 쓰기
   fs.writeFile(jsonFilePath, JSON.stringify(filteredLocations, null, 2), (err) => {
      if (err) {
         console.log('파일 쓰기 오류:', err)
      } else {
         console.log('파일이 성공적으로 저장되었습니다.')
      }
   })
})
