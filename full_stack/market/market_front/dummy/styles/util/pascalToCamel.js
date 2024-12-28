const pascalToCamel = (props) => {
   const convertedProps = {}

   Object.keys(props).forEach((key) => {
      if (/^[A-Z][a-zA-Z]*$/.test(key)) {
         // PascalCase → camelCase 변환
         const camelKey = key.charAt(0).toLowerCase() + key.slice(1)
         convertedProps[camelKey] = props[key]
      } else {
         // PascalCase가 아닌 키는 그대로 유지
         convertedProps[key] = props[key]
      }
   })

   return convertedProps
}

export default pascalToCamel
