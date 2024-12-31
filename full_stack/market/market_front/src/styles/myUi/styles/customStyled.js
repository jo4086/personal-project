import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { autoStylesProps, calcMargin, calcPadding } from '../util'

export const TextField = styled.div`
    position: relative;
    display: flex;
    box-sizing: border-box;
    user-select: none;
    // background-color: orange;
    // border: 1px solid white;
    font-size: ${(props) => props.$FontSize || '14px'};

    justify-content: center;
    align-items: center;
    width: 100%;
    width: ${(props) => props.$fieldWidth || '100%'};

    label {
        position: absolute;
        left: 15px;
        top: 20px; /* 초기 위치 */
        width: auto;
        user-select: none;
        box-sizing: border-box;
        text-align: center;
        display: block;
        pointer-events: none;
        caret-color: 'transparent';
        transition: 0.2s ease all;
        // margin-bottom: ${(props) => props.$labelcMarginBottom || '8px'};
        font-size: ${(props) => props.$labelFontSize || '14px'};
        color: ${(props) => props.$labelColor || 'black'};
        // border: 1px solid black;
    }

    input,
    textarea {
        ${(props) => autoStylesProps(props)}
        outline: ${(props) => props.$outline || 'none'};
        display: ${(props) => props.$display || 'block'};
        padding: ${(props) => calcPadding(props)};
        margin: ${(props) => calcMargin(props)};
        width: ${(props) => props.$width || 'auto'};
        height: ${(props) => props.$height || 'auto'};
        //   font-size: ${(props) => props.$fontSize || 'auto'};

        box-sizing: border-box;
        &:focus {
            // border-color: ${(props) => props.$focusBorderColor || '#4caf50'};
        }
    }

    textarea {
        resize: ${(props) => (props.$resize ? props.$resize : 'none')};
    }
    label.active {
        top: 7px;
        left: 15px;
        font-size: 10px;
        color: #4caf50;
    }
    input:focus + label {
        top: 7px;
        left: 15px;
        font-size: 10px;
        color: #4caf50;
    }
`
export const Container = styled.div`
    box-sizing: border-box;
    
    ${(props) => autoStylesProps(props)}
    margin: ${(props) => calcMargin(props)};

    flex-grow: ${(props) => props.$flexGrow || '0'}
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    max-width: ${(props) => props.$maxWidth || 'none'};
    justify-content: ${(props) => props.$justifyContent || 'center'};
    align-items: ${(props) => props.$alignItems || 'center'};

    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
export const Text = styled.p`
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`

export const Box = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$display || 'block'};
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
// export const HyperLink = styled.span`
//     ${(props) => autoStylesProps(props)}
// `

export const HyperLink = styled(Link)`
    color: black;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: ${(props) => props.$hoverColor || props.$color || 'blue'};
    }
    &:visited {
        color: ${(props) => props.$visitedColor || props.$color || 'inherit'};
    }
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`

export const Button = styled.button`
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
    cursor: pointer;
`
export const Nav = styled.nav`
    ${(props) => autoStylesProps(props)}
    position: fixed;
    box-sizing: border-box;
    z-index: 9999;
    width: 100%;
    max-width: ${(props) => props.$maxWidth || '1080px'};

    // justify-content: space-between;
    // max-width: 1080px;
    // left: max(0px, calc((100% - 1080px) / 2));
    // right: max(0px, calc((100% - 1080px) / 2));
    // padding: 0 10px 0 0;
    // top: 0px;
    // border: 1px solid black;
    // display: flex;
    // background-color: #bdd;
    // align-items: center;
    // user-select: none;
`
export const Li = styled.li`
    box-sizing: border-box;
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
export const Ul = styled.ul`
    box-sizing: border-box;
    list-style: none;
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
    border-radius: 10px;
`

export const Table = styled.table`
    box-sizing: border-box;
    border-collapse: collapse;
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`

export const Thead = styled.thead`
    box-sizing: border-box;
    border-collapse: collapse;

    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`

export const Tbody = styled.tbody`
    box-sizing: border-box;
    border-collapse: collapse;
    // border-collapse: separate;
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
export const Divider = styled.div`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    width: 1px;
    height: 100%;
    background-color: black;
    margin: auto 3px;
    color: #333;
    alignItems:center;

    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
