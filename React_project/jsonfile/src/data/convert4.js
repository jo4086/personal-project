const fs = require('fs')
const readline = require('readline')

const inputFile = './weatherDescKo.csv' // 입력 CSV 파일 경로
const outputFile = './weatherDescKo.json' // 출력 JSON 파일 경로

const result = {} // 최종 JSON 데이터를 저장할 객체

// CSV 파일 읽기
const rl = readline.createInterface({
   input: fs.createReadStream(inputFile),
   output: process.stdout,
   terminal: false,
})

let headers = [] // CSV 파일의 헤더 저장
rl.on('line', (line) => {
   // 첫 번째 줄은 헤더로 처리
   if (headers.length === 0) {
      headers = line.split(',').map((header) => header.trim())
      return
   }

   // 데이터 줄 파싱
   const values = line.split(',').map((value) => value.trim())
   const row = headers.reduce((acc, header, index) => {
      acc[header] = values[index]
      return acc
   }, {})

   // 데이터 처리
   const group = row.group
   const id = parseInt(row.id, 10)
   const english = row.English
   const korean = row.KR

   // 그룹이 없으면 새로 생성
   if (!result[group]) {
      result[group] = {}
   }

   // 그룹 내 ID 추가
   result[group][id] = { english, korean }
})

rl.on('close', () => {
   // JSON 파일로 저장
   fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8')
   console.log(`JSON 파일로 변환 완료: ${outputFile}`)
})
