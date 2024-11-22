import styled from 'styled-components'

export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWdith || '1100px'};
`

export const module = styled.div`
   width: 100%;
   background-color: #c6dfdf;
   border: 1px solid #ddd;
   border-radius: 10px;
   overflow: hidden;
   box-shadow: 0 0 3px 0 black;
   margin: 15px 0;
`
export const header = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 20px;
   background-color: #8bafaf;
`

export const title = styled.div`
   font-size: 1.6em;
   font-weight: bold;
`

export const title2 = styled.div`   
    font-size: 1.2em;
   font-weight: bold;
}`

export const sub_title = styled.div`
   font-family: 'Do Hyeon', serif;
   font-size: 1.3em;
   letter-spacing: 1.1px;
   font-weight: 400;
   margin: 0px 0 0px 0px;
`

export const details_button = styled.button`
   padding: 5px 15px;
   background-color: #ffffff;
   border: none;
   box-shadow: 0px 0px 2px 0px rgb(149, 149, 149);
   border-radius: 5px;
   cursor: pointer;
   font-size: 14px;

   &:hover {
      background-color: #bababa;
      transition: 100ms;
      font-weight: bold;
   }
`

export const container = styled.div`
   display: flex;
   gap: 10px;
   margin-top: 20px;
   margin-top: 20px;
`

export const leftBox1 = styled.div`
   flex: 1;
   padding: 10px 0px;
   border-radius: 0 0 0 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 50%;
   box-sizing: border-box;
   justify-content: center;
   /* border: 1px solid black; */
`
export const rightBox1 = styled.div`
   box-sizing: border-box;
   flex: 1;
   padding: 0 20px 20px 20px;
   border-radius: 0 0 10px 0;
   /* border: 1px solid black; */
`

export const itemList = styled.ul`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 10px;

   &:last-child {
   padding-top-30px;
   }
`
export const items = styled.li`
   display: flex;
   justify-content: space-between;
   background-color: #fff;
   color: #555;
   padding: 10px 20px;
   border-radius: 5px;
   font-size: 14px;

   & span:first-child {
      color: black;
   }
`