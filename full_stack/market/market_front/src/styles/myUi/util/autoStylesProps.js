const autoStylesProps = (props) => {
    // 1. 상태별 프롭스와 일반 프롭스 분리
    // console.log(props)
   const statePrefixes = ['hover', 'active', 'visited']
   const baseStyles = {}
   const stateStyles = {}

   Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('$')) {
         const cleanKey = key.slice(1) // '$' 제거
         const matchedState = statePrefixes.find((state) => cleanKey.startsWith(state))
         if (matchedState) {
            // 상태 속성으로 분류
            const stateKey = cleanKey.slice(matchedState.length) // 상태명 이후의 부분
            const cssKey =
               stateKey.charAt(0).toLowerCase() +
               stateKey
                  .slice(1) // 첫 글자 소문자
                  .replace(/([A-Z])/g, '-$1') // camelCase → kebab-case
                  .toLowerCase() // 전체 소문자
            if (!stateStyles[matchedState]) stateStyles[matchedState] = {}
            stateStyles[matchedState][cssKey] = value
         } else {
            // 일반 스타일로 분류
            const cssKey = cleanKey
               .replace(/([A-Z])/g, '-$1') // camelCase → kebab-case
               .toLowerCase()
            baseStyles[cssKey] = value
         }
      }
   })

   // 2. 일반 스타일 변환
   const baseCSS = Object.entries(baseStyles)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')

   // 3. 상태별 스타일 변환
   const stateCSS = Object.entries(stateStyles)
      .map(([state, styles]) => {
         const styleBlock = Object.entries(styles)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')
         console.log(`&:${state} { ${styleBlock} }`)
         return `&:${state} { ${styleBlock} }`
      })
      .join('\n')

//    console.log('State Styles:', stateStyles)
   // 4. 최종 CSS 반환
   return `${baseCSS}\n${stateCSS}`
}

export default autoStylesProps
