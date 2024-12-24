import * as a from '../customStyled'
import filterPropsByLayout from './utils'

const Container = ({ display, children, style, ...props }) => {
    const styledProps = filterPropsByLayout(props, display)
    return (
        <a.Container style={style} {...styledProps}>
            {children}
        </a.Container>
    )
}

export default Container
