import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Li = ({ type = 'li', onClick, display = 'flex', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    if (type === 'td' || type === 'th') {
    const styledProps = propsFilter(props, 'table-cell', true)
        // console.log(styledProps)
        return (
            <a.Li as={type} onClick={onClick} $display="table-cell" style={style} {...styledProps}>
                {children}
            </a.Li>
        )
    }

    return (
        <a.Li as={type} onClick={onClick} $display={display} style={style} {...styledProps}>
            {children}
        </a.Li>
    )
}

export default Li
