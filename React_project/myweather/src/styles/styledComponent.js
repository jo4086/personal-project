import styled from 'styled-components'
import { IoMdRefresh } from 'react-icons/io'

export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWdith || '1100px'};
   position:relative
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
   background-color: rgba(200, 200, 200, 0.5);
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

export const Refresh = styled.button`
   width: 80px;
   height: 25px;
   background-color:#a5c2c200;
   box-sizing:border-box;
   border-radius:3px;

   padding-left:26px;
   line-height:15px;
   text-align: left;
   border: none;
   // padding: 10px;
   background-image : url("/images/refresh.svg");
   background-size:10px 10px;
   background-repeat: no-repeat;
   background-position:10px center;


   // &:before {
   //    content: '🔄'; /* 아이콘 표시 */
   //    position: relative;
   //    margin-right: 8px; /* 텍스트와 간격 */
   //    font-size: 16px;
   //    animation: ${(props) => (props.isRefreshing ? 'spin 1s linear infinite' : 'none')};
   }
`

