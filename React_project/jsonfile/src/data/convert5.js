const fs = require('fs')

// Step 1: JSON 파일 읽기
const inputFile = './weatherDescKo.json'
const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

// Step 2: 그룹명 배열 생성
const weatherGroups = Object.keys(jsonData)

// Step 3: 개별 변수 형태로 변환
const variableDefinitions = weatherGroups.map((groupName) => {
   const groupData = jsonData[groupName]
   return `const ${groupName} = ${JSON.stringify(groupData, null, 2)};`
})

// Step 4: 배열 + 변수 선언 코드 작성
const outputScript = `
const weatherGroups = ${JSON.stringify(weatherGroups, null, 2)};
${variableDefinitions.join('\n\n')}
`

// Step 5: 변환된 데이터를 새로운 파일로 저장
const outputFile = './weatherDataTransformed.js'
fs.writeFileSync(outputFile, outputScript, 'utf8')
console.log(`변환 완료: ${outputFile}`)
