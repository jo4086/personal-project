const calcMargin = (props) => {
    if (!props.$margin && !props.$marginTop && !props.marginBottom && !props.$marginLeft && !props.$marginRight && !props.$marginSide && !props.$marginVertical) {
        return `0 auto`
    }
    
    if (props.$margin) {
        return props.$margin
    }

    const marginTop = props.$marginTop || props.$marginVertical || '0px'
    const marginRight = props.$marginRight || props.$marginSide || '0px'
    const marginBottom = props.$marginBottom || props.$marginVertical || '0px'
    const marginLeft = props.$marginLeft || props.$marginSide || '0px'

    return `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`
}

export default calcMargin