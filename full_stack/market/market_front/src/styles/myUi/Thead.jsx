import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Thead = ({ display = 'table', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    return (
        <a.Thead $display={display} style={style} {...styledProps}>
            {children}
        </a.Thead>
    )
}
export default Thead
