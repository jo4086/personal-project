const validatePascalCaseProps = (key) => /^[A-Z][a-zA-Z]*$/.test(key)

const pascalToCamel = (props) => {
   const invalidKeys = []

   console.log(props)
   // PascalCase 검증
   Object.keys(props).forEach((key) => {
      if (!validatePascalCaseProps(key)) {
         invalidKeys.push(key)
      }
   })

   // 검증 실패 시 에러
   if (invalidKeys.length > 0) {
      const suggestions = invalidKeys.map((key) => `"${key.charAt(0).toUpperCase() + key.slice(1)}"`).join(', ')

      throw new Error(`Invalid prop keys detected: [${invalidKeys.join(', ')}]. ` + `Keys passed via ...props must start with an uppercase letter (PascalCase). ` + `Did you mean: ${suggestions}?`)
   }

   // PascalCase → camelCase 변환
   const convertedProps = {}
   Object.keys(props).forEach((key) => {
      if (validatePascalCaseProps(key)) {
         const camelKey = key.charAt(0).toLowerCase() + key.slice(1)
         convertedProps[camelKey] = props[key]
      } else {
         convertedProps[key] = props[key]
      }
   })

   return convertedProps
}

export default pascalToCamel
