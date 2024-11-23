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
   list-style-type: none;
   display: flex;
   flex-direction: column;
   padding:0;

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
   line-height:20px
   height:20px

   :first-child {
      margin-top: 5px;
   }
   & span:first-child {
      color: black;
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
export const flexItem1 = styled.div.withConfig({
   shouldForwardProp: (prop) => prop !== 'icon',
})`
   box-sizing: border-box;
   width: 400px;
   height: 250px;
   flex: 1 1 calc(50% - 10px);
   font-size: 16px;
   margin: 0;
   background-color: yellow;
   background-size: 200px 200px;
   background-position: left;
   background-repeat: no-repeat;
   background-image: url(${(props) => `https://openweathermap.org/img/wn/${props.icon}@2x.png`});
`


export const flexItem2 = styled.div`
   box-sizing: border-box;
   width: 100px;
   height: 200px;
   flex: 1 1 calc(50% - 10px);
   font-size: 16px;
   margin: 0;
   background-color: yellow;
   background-size: cover;
   background-position: center;
`

export const flexItemImage = styled.div.withConfig({
   shouldForwardProp: (prop) => prop !== 'icon',
})`
   box-sizing: border-box;
   width: 400px;
   height: 250px;
   flex: 1 1 calc(50% - 10px);
   font-size: 16px;
   margin: 0;
   background-color: yellow;
   background-size: 200px 200px;
   background-position: left;
   background-repeat: no-repeat;
   background-image: url(${(props) => `https://openweathermap.org/img/wn/${props.icon}@2x.png`});
`
/* export const flexItemImage = styled.div`
   box-sizing: border-box;
   width: 100px;
   backgounrd-color:
   // height: 200px;
   flex: 1 1 calc(50% - 5px);
   font-size: 16px;
   margin: 0;
   background-color: yellow;
   background-image: url(${(props) => `https://openweathermap.org/img/wn/${props.icon}@4x.png`});
   background-size: cover;
   height: 50px;
   background-position: center;
`
 */
