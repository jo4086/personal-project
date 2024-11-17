const fs = require('fs')
const path = require('path')

// 현재 파일(locations.json)의 절대 경로를 얻기 위해 __dirname 사용
const jsonFilePath = path.join(__dirname, 'loca.json')

// JSON 파일 읽기
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
   if (err) {
      console.log('파일 읽기 오류:', err)
      return
   }

   // JSON 데이터 파싱
   const locations = JSON.parse(data)

   // 여기서 locations 데이터를 수정하는 작업을 할 수 있습니다.
   // 예를 들어, 삭제일자가 존재하는 객체를 제거하는 작업:
   const filteredLocations = locations.filter((location) => !location.삭제일자)

   // 수정된 데이터를 다시 JSON 파일로 쓰기
   fs.writeFile(jsonFilePath, JSON.stringify(filteredLocations, null, 2), (err) => {
      if (err) {
         console.log('파일 쓰기 오류:', err)
      } else {
         console.log('파일이 성공적으로 저장되었습니다.')
      }
   })
})
