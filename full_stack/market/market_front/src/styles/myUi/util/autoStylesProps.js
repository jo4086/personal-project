const autoStylesProps = (props) => {
    return Object.entries(props)
        .map(([key, value]) => {
            if (key.startsWith('$')) {
                // $ 접두어 확인
                const cssKey = key
                    .slice(1) // $ 제거
                    .replace(/([A-Z])/g, '-$1') // camelCase -> kebab-case
                    .toLowerCase()
                // console.log(`CSS Key: ${cssKey}, Value: ${value}`)
                console.log(`"${cssKey}: ${value};"`)
                return `${cssKey}: ${value};` // CSS 문자열 생성
            }
            return '' // $ 접두어 없으면 무시
        })
        .join('\n') // 문자열 합치기
}

export default autoStylesProps
