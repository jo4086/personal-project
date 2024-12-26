import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { autoStylesProps, calcMargin, calcPadding } from '../util'

export const TextField = styled.div`
   position: relative;
   display: flex;
   // flex-direction:column;
   box-sizing: border-box;
   // background-color: orange;
   // border: 1px solid white;

   justify-content: center;
   align-items: center;
   // width: 100%;

   label {
      position: absolute;
      left: 15px;
      top: 20px; /* 초기 위치 */
      width: auto;
      // flex-grow: 1;
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
      // flex-grow: 1;
      ${(props) => autoStylesProps(props)}
      outline: ${(props) => props.$outline || 'none'};
      display: ${(props) => props.$display || 'block'};
      padding: ${(props) => calcPadding(props)};
      margin: ${(props) => calcMargin(props)};
      width: ${(props) => props.$width || 'auto'};
      height: ${(props) => props.$height || 'auto'};

      box-sizing: border-box;
      &:focus {
         // border-color: ${(props) => props.$focusBorderColor || '#4caf50'};
         // box-shadow: ${(props) => props.$focusBoxShadow || '0 0 0px 0px rgba(0, 0, 0, 0.2)'};
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
    // margin: ${(props) => calcMargin(props)};
`
export const Text = styled.p`
   ${(props) => autoStylesProps(props)}
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
   ${(props) => autoStylesProps(props)}
   transition: color 0.3s ease;
   padding: ${(props) => calcPadding(props)};
   margin: ${(props) => calcMargin(props)};

   &:hover {
      color: ${(props) => props.$hoverColor || props.$color || 'blue'};
   }
   &:visited {
      color: ${(props) => props.$visitedColor || props.$color || 'inherit'};
   }
`
export const Button = styled.button`
   ${(props) => autoStylesProps(props)}
   padding: ${(props) => calcPadding(props)};
   margin: ${(props) => calcMargin(props)};
   cursor: pointer;
`