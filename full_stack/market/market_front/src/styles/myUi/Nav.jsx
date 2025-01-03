import { filterProps } from './util'
import * as a from './styles/customStyled'

const Nav = ({ display = 'flex', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)

   //  const { styledProps, otherProps } = propsFilter(props, display, true)
    // const styledProps = propsFilter(props, display)

    return (
        <a.Nav $display={display} {...filteredProps}>
            {children}
        </a.Nav>
    )
}

export default Nav

// backgroundColor="white" height="30px"
