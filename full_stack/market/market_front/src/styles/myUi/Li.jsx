import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Li = ({ display, children, style, ...props }) => {
    const styledProps = propsFilter(props, display)

    return (
        <a.Li style={style} {...styledProps}>
            {children}
        </a.Li>
    )
}

export default Li
