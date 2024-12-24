import * as a from '../customStyled'
import filterPropsByLayout from './utils'

const Li = ({ display, children, style, ...props }) => {
    const styledProps = filterPropsByLayout(props, display)

    return (
        <a.Li style={style} {...styledProps}>
            {children}
        </a.Li>
    )
}

export default Li
