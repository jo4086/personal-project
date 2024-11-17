const csv = require('csvtojson')
const fs = require('fs')

const csvFilePath = './south-korea-state-region.csv' // CSV 파일 경로
const outputFilePath = './filteredLocations.json' // JSON 파일 경로

csv()
   .fromFile(csvFilePath)
   .then((jsonArray) => {
      // 1. 삭제일자가 존재하는 데이터 제거
      const filteredData = jsonArray.filter((item) => !item.삭제일자)

      // 2. 필요한 필드만 선택
      const processedData = filteredData.map(({ 법정동코드, 시도명, 시군구명, 읍면동명 }) => ({
         code: 법정동코드,
         city: 시도명,
         district: 시군구명,
         town: 읍면동명,
         Village : 리명,
      }))

      // 3. JSON 파일로 저장
      fs.writeFileSync(outputFilePath, JSON.stringify(processedData, null, 2))
      console.log(`데이터 변환 완료: ${outputFilePath}`)
   })
   .catch((error) => {
      console.error('오류 발생:', error)
   })