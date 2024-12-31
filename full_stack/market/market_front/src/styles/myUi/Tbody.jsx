import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Tbody = ({ display = 'table', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    return (
        <a.Tbody $display={display} style={style} {...styledProps}>
            {children}
        </a.Tbody>
    )
}
export default Tbody