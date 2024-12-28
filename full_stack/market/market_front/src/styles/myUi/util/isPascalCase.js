const validatePascalCaseProps = (key) => /^[A-Z][a-zA-Z]*$/.test(key)

const isPascalCase = (props) => {
   const invalidKeys = []

   // 모든 키를 검사하여 PascalCase가 아닌 키를 수집
   Object.keys(props).forEach((key) => {
      if (!validatePascalCaseProps(key)) {
         invalidKeys.push(key)
      }
   })

   // 잘못된 키가 있으면 에러 생성
   if (invalidKeys.length > 0) {
      const suggestions = invalidKeys
         .map((key) => `"${key.charAt(0).toUpperCase() + key.slice(1)}"`) // PascalCase로 변환 제안
         .join(', ')

      const error = new Error(`Invalid prop keys detected: [${invalidKeys.join(', ')}]. ` + `Keys passed via ...props must start with an uppercase letter (PascalCase). ` + `Did you mean: ${suggestions}?`)

      // 스택 추적 분석
      const stackTrace = error.stack.split('\n')
      const parentComponentTrace = stackTrace.find((line) => line.includes('.jsx') && !line.includes('Text.jsx'))

      console.error(`Error occurred in ${parentComponentTrace || 'unknown parent component'}:\n${error.stack}`)
      throw error
   }

   // props가 문제 없으면 그대로 반환
   return { ...props }
}

export default isPascalCase
