import filterStyleProps from "./filterStyleProps"

const filterProps = (props, display, text=true) => {
    const event = {}
    const functional = {}
    const nonEvent = {}

    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            event[key] = value // 이벤트 핸들러 추출
        } else if (typeof value === 'function') {
            functional[key] = value // 함수형 속성 추출
        } else {
            nonEvent[key] = value // 나머지 속성
        }
    })
    // console.log(display)
    const { styled, other } = filterStyleProps(nonEvent, display, true)
    // console.log(other)

    // const clean = (obj) => (Object.keys(obj).length > 0 ? obj : null)
    
const filteredProps = {
    ...(Object.keys(styled).length > 0 ? styled : {}),
    ...(Object.keys(other).length > 0 ? other : {}),
    ...(Object.keys(event).length > 0 ? event : {}),
    ...(Object.keys(functional).length > 0 ? functional : {}),
}
// console.log(filteredProps)
return filteredProps
}
export default filterProps