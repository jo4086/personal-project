import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Table = ({ display = 'table', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    return (
        <a.Table $display={display} style={style} {...styledProps}>
            {children}
        </a.Table>
    )
}
export default Table
