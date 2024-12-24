import styled from 'styled-components'

export const calculatePadding = (props) => {
    if (props.$padding) {
        return props.$padding
    }

    const paddingTop = props.$paddingTop || props.$paddingVertical || '0px'
    const paddingRight = props.$paddingRight || props.$paddingSide || '0px'
    const paddingBottom = props.$paddingBottom || props.$paddingVertical || '0px'
    const paddingLeft = props.$paddingLeft || props.$paddingSide || '0px'

    return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
}

export const calculateMargin = (props) => {
    if (props.$margin) {
        return props.$margin
    }

    const marginTop = props.$marginTop || props.$paddingVertical || '0px'
    const marginRight = props.$marginRight || props.$paddingSide || '0px'
    const marginBottom = props.$marginBottom || props.$paddingVertical || '0px'
    const marginLeft = props.$marginLeft || props.$paddingSide || '0px'

    return `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`
}

export const Box = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$model || 'block'}; /* 기본값 block */
    gap: ${(props) => props.$gap || '0'};
    justify-content: ${(props) => props.$justify || 'flex-start'};
    align-items: ${(props) => props.$align || 'stretch'};
    flex-direction: ${(props) => (props.$model === 'flex' ? props.$direction || 'row' : 'unset')};

    background-color: ${(props) => props.$backgroundColor || 'transparent'};
    grid-template-columns: ${(props) => (props.$model === 'grid' ? props.$columns || 'repeat(3, 1fr)' : 'none')};
    grid-template-rows: ${(props) => (props.$model === 'grid' ? props.$rows || 'auto' : 'none')};
    width: 100%;
    max-width: ${(props) => props.$maxWidth || 'none'};
    padding: ${(props) => props.$padding || '0'};
    margin: ${(props) => props.$margin || '0 auto'};
    aspect-ratio: ${(props) => props.$aspectRatio || 'initial'}; // 추가
    border-radius: ${(props) => props.$borderRadius || 'initial'}; // 추가
    border: ${(props) => props.$border || '1px solid rgba(0,0,0,0.3)'}; // 추가
`

export const Nav = styled.nav`
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: ${(props) => props.$height || 'auto'};
    justify-content: space-between;
    max-width: 1080px;
    left: calc((100% - 1080px) / 2);
    right: calc((100% - 1080px) / 2);
    padding: 0 10px 0 0;
    top: 0px;
    border: 1px solid black;
    display: flex;
    background-color: #bdd;
    align-items: center;
`

export const Button = styled.button`
    width: ${(props) => props.$width || 'auto'};
    display: block;
    background-color: #ffffff;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.7rem;
    letter-spacing: 1.1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    color: #222222;
    border: none;
    border-radius: 3px;
    text-decoration: none;
    // box-shadow: #000000;
    box-shadow: ${(props) => (props.$boxShadow ? '0 0 1px 0.5px rgba(0, 0, 0,0.8)' : 'none')};
    padding: ${(props) => {
        // 가장 우선적으로 padding을 체크
        if (props.padding) {
            return props.$padding
        }

        // Vertical & Side 값 적용
        const paddingTop = props.$paddingTop || props.$paddingVertical || '3px'
        const paddingRight = props.$paddingRight || props.$paddingSide || '8px'
        const paddingBottom = props.$paddingBottom || props.$paddingVertical || '3px'
        const paddingLeft = props.$paddingLeft || props.$paddingSide || '8px'

        // 최종 padding 값 반환
        return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
    }};

    &:hover {
        background-color: #efefef;
        color: black;
        cursor: pointer;
    }
`

export const Divider = styled.div`
    // padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 1px;
    height: 80%;
    background-color: black;
    margin: auto 3px;
    color: #333;
`

export const Li = styled.li`
    list-style: none;
    display: ${(props) => props.$display || 'flex'};
    justify-content: ${(props) => props.$justifyContent || 'center'};
    align-items: ${(props) => props.$alignItems || 'center'};
    width: ${(props) => props.$width || 'auto'};
    margin: ${(props) => props.$margin || '0 auto'};
    height: ${(props) => props.$height || 'auto'};
    box-sizing: ${(props) => props.$boxSizing || 'border-box'};

    ${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
    ${(props) => props.$gap && `gap: ${props.$gap};`}
    ${(props) => props.$gridTemplateColumns && `grid-template-columns: ${props.$gridTemplateColumns};`}
    ${(props) => props.$gridTemplateRows && `grid-template-rows: ${props.$gridTemplateRows};`}
    ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight};`}
    ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
    ${(props) => props.$border && `border: ${props.$border};`}
    ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
    ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
    ${(props) => props.$height && `height: ${props.$height};`}
    
    
    padding: ${(props) => calculatePadding(props)};
`

export const Container = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$display || 'flex'};
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    margin: ${(props) => props.$margin || '0 auto'};
    max-width: ${(props) => props.$maxWidth || 'none'};
    justify-content: ${(props) => props.$justifyContent || 'center'};
    align-items: ${(props) => props.$alignItems || 'center'};

    ${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
    ${(props) => props.$gap && `gap: ${props.$gap};`}
    ${(props) => props.$gridTemplateColumns && `grid-template-columns: ${props.$gridTemplateColumns};`}
    ${(props) => props.$gridTemplateRows && `grid-template-rows: ${props.$gridTemplateRows};`}
    ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight};`}
    ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
    ${(props) => props.$border && `border: ${props.$border};`}
    ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
    ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
    ${(props) => props.$height && `height: ${props.$height};`}
    flex-grow: ${(props) => props.$flexGrow || '0'}
    // ${(props) => props.$flexGrow && `flex-grow: ${props.$flexGrow};`}


    padding: ${(props) => calculatePadding(props)};
    margin: ${(props) => `${calculateMargin(props)}`};
    // margin: ${(props) => props.$margin || '0 auto'};
`

/* AAAAAAAAAAAAAAAAAAAAAA${(props) => props.$textAlign && `text-align: ${props.$textAlign};`} */
/* padding: ${(props) => props.$padding || '0px'}; */

/* ${(props) => props.$justifyContent && `justify-content: ${props.$justifyContent};`} */
/* ${(props) => props.$display && `display: ${props.$display};`} */
/* ${(props) => props.$alignItems && `align-items: ${props.$alignItems};`} */
/* ${(props) => props.$padding && `padding: ${props.$padding};`} */
/* ${(props) => props.$margin && `margin: ${props.$margin};`} */
/* ${(props) => props.$width && `width: ${props.$width};`} */
