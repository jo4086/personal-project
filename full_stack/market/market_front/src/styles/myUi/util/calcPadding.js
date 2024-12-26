const calcPadding = (props) => {
    if (props.$padding) {
        return props.$padding
    }

    const paddingTop = props.$paddingTop || props.$paddingVertical || '0px'
    const paddingRight = props.$paddingRight || props.$paddingSide || '0px'
    const paddingBottom = props.$paddingBottom || props.$paddingVertical || '0px'
    const paddingLeft = props.$paddingLeft || props.$paddingSide || '0px'

    return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
}

export default calcPadding