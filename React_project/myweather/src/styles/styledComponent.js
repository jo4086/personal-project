import styled from 'styled-components'

export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWdith || '1320px'};
`

export const Main = styled.main`
   width: ${(props) => props.$width || '1320px'};
   margin: 0 auto;
   overflow: hidden;
   padding: ${(props) => props.$padding || 0};
`
