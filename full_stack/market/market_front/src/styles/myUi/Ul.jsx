import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Ul = ({ type = 'ul', display = 'flex', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    if (type === 'tr') {
        const styledProps = propsFilter(props, 'table-row', true)
        // console.log(styledProps)

        return (
            <a.Ul as={type} $display="table-row" style={style} {...styledProps}>
                {children}
            </a.Ul>
        )
    }

    return (
        <a.Ul as={type} $display={display} style={style} {...styledProps}>
            {children}
        </a.Ul>
    )
}

export default Ul
