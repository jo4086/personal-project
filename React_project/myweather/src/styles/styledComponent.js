import styled from 'styled-components'

export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWdith || '1100px'};
`

export const Main = styled.main`
   width: ${(props) => props.$width || '1100px'};
   margin: 0 auto;

   overflow: hidden;
   padding: ${(props) => props.$padding || 0};
`
export const LayerSection = styled.div`
   display: grid;
   grid-template-columns: 2fr 1fr;
   width: 100%;
   margin: 0;
   padding: 0;
`
export const LeftContainer = styled.div`
   background-color: rgba(200,200,200,0.5);
   padding: 20px;
`
export const RightContainer = styled.div`
   background-color: rgba(30, 200, 200, 0.5);
   padding: 20px;
`
// display: flex;
// justify-content: center;

// width: calc(100% * 2 / 3);
//    width: calc(100% * 1 / 3);

// height: 400px;
