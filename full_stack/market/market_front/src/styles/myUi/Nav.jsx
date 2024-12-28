import { propsFilter } from './util'
import * as a from './styles/customStyled'

const Nav = ({ display = 'flex', children, ...props }) => {
   const styledProps = propsFilter(props, display)

   return (
      <a.Nav $display={display} {...styledProps}>
         {children}
      </a.Nav>
   )
}

export default Nav

// backgroundColor="white" height="30px"
