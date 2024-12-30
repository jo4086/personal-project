export const flexPropsKeys = [
    'display', // 반드시 'flex'여야 유효
    'flexDirection',
    'justifyContent',
    'alignItems',
    'gap',
    'alignSelf',
    'justifySelf',
    // 'flexGrow'
]
// ;('')
// 그리드 박스 관련 속성
export const gridPropsKeys = [
    'display', // 반드시 'grid'여야 유효
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridGap',
    'alignItems',
    'justifyContent',
]

// 텍스트 관련 속성
export const textPropsKeys = [
    'textAlign', // 텍스트
    'lineHeight',
    'letterSpacing',
    'color',
    'fontSize',
    'fontWeight',
    'textDecoration',
]
/*

*/

// 공통 속성
export const commonPropsKeys = [
    'padding', // 공통속성
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'paddingSide',
    'paddingVertical',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginVertical',
    'marginSide',
    'backgroundColor',
    'border',
    'borderRadius',
    'boxShadow',
    'width',
    'height',
    'maxWidth',
    'minWidth',
    'maxHeight',
    'minHeight',
    'aspectRatio',
    'boxSizing',
    'flexGrow',
    'outline',
    'tabindex',
    'caretColor',
    'pointerEvents',
    'fieldWidth',
    'left',
    'right',
    'top',
    'bottom',
    'userSelect',
    'cursor',
]

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const createStateKeys = (commonProps, textProps) => {
    // 1. commonPropsKeys와 textPropsKeys 합치기
    console.log('Creating state keys...')
    const combinedKeys = [...commonProps, ...textProps]

    // 2. 첫 글자를 대문자로 변환
    const capitalizedKeys = combinedKeys.map((key) => capitalizeFirstLetter(key))

    // 3. 상태별 키 생성
    const states = ['hover', 'active', 'visited', 'focus', 'disabled']
    const stateKeys = {}

    states.forEach((state) => {
        stateKeys[state] = capitalizedKeys.map((key) => `${state}${key}`)
    })

    return stateKeys
}

const stateKeys = createStateKeys(commonPropsKeys, textPropsKeys)

let validKeysCache = {} // display별로 캐싱

const propsFilter = (props, display, text = true) => {
    if (!validKeysCache[display]) {
        console.log(`Generating valid keys for ${display}...`)
        const layoutKeys = {
            flex: [...flexPropsKeys, ...commonPropsKeys],
            grid: [...gridPropsKeys, ...commonPropsKeys],
        }

        // display별 validKeys 생성 및 캐싱
        validKeysCache[display] = [
            ...(layoutKeys[display] || [
                ...commonPropsKeys,
                ...Object.values(stateKeys).flat(), // 5가지 상태 추가
            ]),
            ...(text ? textPropsKeys : []),
        ]
    }

    const validKeys = validKeysCache[display] // 캐싱된 키 사용
    const validKeysSet = new Set(validKeys) // Set으로 변환
    //    console.log(validKeys)

    return Object.keys(props).reduce((acc, key) => {
        const cleanKey = key.startsWith('$') ? key.slice(1) : key // $ 제거
        if (validKeysSet.has(cleanKey)) {
            acc[`$${cleanKey}`] = props[key] // $ 접두어 추가
        }
        return acc
    }, {})
}
export default propsFilter

// const validKeys = layoutKeys[display] || commonPropsKeys // layout이 없으면 공통 속성만

/*
const validKeys = [
    ...(layoutKeys[display] || commonPropsKeys), // display에 해당하는 유효한 키
    ...(text ? textPropsKeys : []), // text가 true일 때만 textPropsKeys 추가
]

*/
