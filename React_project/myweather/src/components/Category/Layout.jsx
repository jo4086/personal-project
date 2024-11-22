import { Wrap, Main, LayerSection } from "../../styles/styledComponent";
import Menu from "../Menu";
import WeatherNavi from "../WeatherNavi";
import '../../styles/common.css'

function Layout ({children}) {
    return (
       <Wrap>
          <Menu />
          <Main>
             <WeatherNavi />
             <LayerSection>{children}</LayerSection>
          </Main>
       </Wrap>
    )
}

export default Layout