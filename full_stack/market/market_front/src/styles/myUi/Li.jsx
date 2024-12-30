import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Li = ({ display='flex', children, style, ...props }) => {
    const styledProps = propsFilter(props, display)

    return (
        <a.Li $display={display} style={style} {...styledProps}>
            {children}
        </a.Li>
    )
}

export default Li
