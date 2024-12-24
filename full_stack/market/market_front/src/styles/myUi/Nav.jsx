import * as a from '../customStyled'

const Nav = ({ children, height }) => {
    return <a.Nav $height={height}>{children}</a.Nav>
}

export default Nav