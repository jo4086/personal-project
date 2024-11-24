import styled from 'styled-components'

export const module = styled.div`
   width: 100%;
   background-color: #c6dfdf;
   border: 1px solid #ddd;
   border-radius: 10px;
   overflow: hidden;
   box-shadow: 0 0 3px 0 black;
   margin: 15px 0;
   * {
      user-select: none;
   }
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
   // padding: 5px 15px;
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
   // margin-top: 20px;
   // padding: 0 20px 0 20px;
   padding: 0 20px;
   gap: 20px;
`

export const leftBox1 = styled.div`
   // border: 1px solid black;
   flex: 1;
   // padding: 10px 0px;
   border-radius: 0 0 0 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 50%;
   box-sizing: border-box;
   justify-content: center;
   // background-color:yellow;
`
export const rightBox1 = styled.div`
   // border: 1px solid black;
   box-sizing: border-box;
   width: 50%;
   flex: 1;
   padding: 0px;
   border-radius: 0 0 10px 0;
`

export const itemList = styled.ul`
   width:100%;
   height:100%;
   background-color: salmon;
   list-style-type: none;
   display: flex;
   flex-direction: column;
   justify-content:center;
   padding:0;
   align-items : center;

   &:last-child {
   padding-top-30px;
   }
`
export const items = styled.li`
   list-style-type: none;
   display: flex;
   justify-content: space-between;
   background-color: #fff;
   color: #555;
   padding: 5px 20px;
   border-radius: 5px;
   font-size: 16px;
   margin: 5px auto;
   width: 80%;
   line-height: 25px;
   height: 25px;
   align-items: center;

   & div:first-child {
      color: black;
      font-weight:bold;
   }
`
export const flexBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
   justify-content: center;
   background-color: pink;
   margin: 0;
`
export const flexItem1 = styled.div`
   box-sizing: border-box;
   width: 400px;
   // height: 250px;
   padding: 10px 0;
   flex: 1 1 calc(50% - 10px);
   font-size: 16px;
   margin: 0;
   background-color: yellow;
`

export const flexItem2 = styled.div`
   box-sizing: border-box;
   width: 100px;
   // height: 200px;
   flex: 1 1 calc(50% - 10px);
   font-size: 16px;
   margin: 0;
   padding: 10px 0;
   background-color: yellow;
`

export const div = styled.div`
   display: flex;
   flex: 1;
   box-sizing: border-box;
   height: 70%;
   margin: 0;
   padding: 0;
   // border: 1px solid black;
   alignitems: 'stretch';
   font-family: 'Jua', sans-serif;
   font-weight:200px;
   ${(props) =>
      props.$variant === 'blank' &&
      `
      flex:0.5;
      height:100%;
      // width:100%;
      // background-color: pink;
   padding-left: 30px;

      background-image: url("https://openweathermap.org/img/wn/${props.$icon}@2x.png");
      background-size: 200px 200px;
      background-position: top;
      background-repeat: no-repeat;
      `};
   ${(props) =>
      props.$variant === 'right' &&
      `
      flex:0.5;
      height:100%;
      flex-direction: column;
      justify-content:end;
      padding-bottom:20px;
      gap:10px;
   padding-left: 30px;

    
   `};
   ${(props) =>
      props.$variant === 'explain' &&
      `
    height:30%;
    height:100%;
    flex:1;
    width:100%
   `}
`

export const p = styled.p`
   font-size: 1.2em;
   font-weight: bold;
   position: relative;
   letter-spacing: 1.4px;
   line-height: 35px;
   width:100%;

   ${(props) =>
      props.$variant === 'temp main' &&
      `
      font-size: 3.4em;
      font-weight:600;
      letter-spacing:-2px;

      &::after {
      content:"C";
      position:relative;
      left:-10px;
      font-size:3.5rem;
      font-weight:normal;
      padding-left:6px;

      }
   `}
`
export const span = styled.span`
   font-size: 1em;
   letter-spacing: 1px;

   ${(props) =>
      props.$variant === 'integer' &&
      `

       }
   `};

   ${(props) =>
      props.$variant === 'decimal' &&
      `
      font-size:0.45em;
       }
   `};
   ${(props) =>
      props.$variant === 'int' &&
      `
       }
   `};
`
export const spanitem = styled.div`
width:100%'
`