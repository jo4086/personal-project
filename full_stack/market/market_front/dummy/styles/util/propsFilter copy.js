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
]

const propsFilter = (props, display, text = false) => {
    // 레이아웃별 유효한 키
    const layoutKeys = {
        flex: [...flexPropsKeys, ...commonPropsKeys],
        grid: [...gridPropsKeys, ...commonPropsKeys],
        // text: [...textPropsKeys, ...commonPropsKeys],
    }

    const validKeys = [
        ...(layoutKeys[display] || commonPropsKeys), // display에 해당하는 유효한 키
        ...(text ? textPropsKeys : []), // text가 true일 때만 textPropsKeys 추가
    ]

    // 유효한 키만 필터링
    return Object.keys(props).reduce((acc, key) => {
        if (validKeys.includes(key)) {
            acc[`$${key}`] = props[key] // $ 접두어 추가
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
