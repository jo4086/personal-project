export const flexPropsKeys = [
    'display', // 반드시 'flex'여야 유효
    'flexDirection',
    'justifyContent',
    'alignItems',
    'gap',
    'alignSelf',
    'justifySelf',
    'flexGrow',
]
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
    'fontFamily',
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
    'borderTop',
    'borderBottom',
    'borderRight',
    'borderLeft',
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
    'position',
    'labelTop',
    'labelLeft',
    'fsLabelLeft',
    'fsLabelTop',
    'zIndex',
    'atvAfterWidth',
    'fsFontSize',
    'atvAfterLeft',
    'objectFit',
    'resize',
    // 'lineHeight',
]

export const tablePropsKeys = [
    'colspan', // 열 병합
    'rowspan', // 행 병합
    'cellSpacing', // 셀 간 간격
    'cellPadding', // 셀 내부 간격
    'borderCollapse', // 테이블 보더 스타일
    'captionSide', // 테이블 캡션 위치
    'emptyCells', // 빈 셀 표시 여부
    'tableLayout', // 테이블 레이아웃
]

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const createStateKeys = (commonProps, textProps) => {
    // 1. commonPropsKeys와 textPropsKeys 합치기
    console.log('Creating state keys...')
    // console.log('common',commonProps)
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

const filterStyleProps = (props, display, text = true) => {
    // console.log(display)
    if (!validKeysCache[display]) {
        console.log(`Generating valid keys for ${display}...`)

        const layoutKeys = {
            flex: [...flexPropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            grid: [...gridPropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            table: [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            'table-cell': [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            'table-row': [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
        }

        validKeysCache[display] = [...(layoutKeys[display] || [...commonPropsKeys, ...Object.values(stateKeys).flat()]), ...(text ? textPropsKeys : [])]
    }
    const validKeys = validKeysCache[display]
    const validKeysSet = new Set(validKeys)

    // CSS 속성 필터링 및 나머지 속성 분리
    const filtered = { styled: {}, other: {} }

    Object.keys(props).forEach((key) => {
        const cleanKey = key.startsWith('$') ? key.slice(1) : key

        if (validKeysSet.has(cleanKey)) {
            // CSS 속성은 $ 접두어 붙여서 styled에 저장
            filtered.styled[`$${cleanKey}`] = props[key]
        } else {
            // 나머지 속성은 other에 저장
            filtered.other[key] = props[key]
        }
    })

    // console.log(layoutKeys)
    return filtered
}
export default filterStyleProps

// const validKeys = layoutKeys[display] || commonPropsKeys // layout이 없으면 공통 속성만

/*
const validKeys = [
    ...(layoutKeys[display] || commonPropsKeys), // display에 해당하는 유효한 키
    ...(text ? textPropsKeys : []), // text가 true일 때만 textPropsKeys 추가
]

*/
/*
const filterStyleProps = (props, display, text = true) => {
    if (!validKeysCache[display]) {
        const layoutKeys = {
            flex: [...flexPropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            grid: [...gridPropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            table: [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            'table-cell': [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
            'table-row': [...tablePropsKeys, ...commonPropsKeys, ...Object.values(stateKeys).flat()],
        }

        validKeysCache[display] = [...(layoutKeys[display] || [...commonPropsKeys, ...Object.values(stateKeys).flat()]), ...(text ? textPropsKeys : [])]
    }

    const validKeys = validKeysCache[display]
    const validKeysSet = new Set(validKeys)

    // CSS 속성 필터링 및 나머지 속성 분리
    const filtered = { styledProps: {}, otherProps: {} }

    Object.keys(props).forEach((key) => {
        const cleanKey = key.startsWith('$') ? key.slice(1) : key

        if (validKeysSet.has(cleanKey)) {
            // CSS 속성은 $ 접두어 붙여서 styledProps에 저장
            filtered.styledProps[`$${cleanKey}`] = props[key]
        } else {
            // 나머지 속성은 otherProps에 저장
            filtered.otherProps[key] = props[key]
        }
    })

    return filtered
}
*/
