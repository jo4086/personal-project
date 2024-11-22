import * as Layer from './css/leftStyled'

function Layout({ children }) {
   return (
      <>
         <Layer.module>
            <Layer.header>
               {children}
               <Layer.details_button></Layer.details_button>
            </Layer.header>
            <Layer.sub_title>{children}</Layer.sub_title>
            <Layer.container>
               <Layer.leftBox1>{children}</Layer.leftBox1>
               <Layer.rightBox1>
                  <Layer.itemList>
                     <Layer.items></Layer.items>
                     <Layer.items></Layer.items>
                     <Layer.items></Layer.items>
                     <Layer.items></Layer.items>
                  </Layer.itemList>
               </Layer.rightBox1>
            </Layer.container>
         </Layer.module>
      </>
   )
}
export default Layout