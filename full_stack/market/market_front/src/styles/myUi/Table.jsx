import { filterProps } from './util'
import * as a from './styles/customStyled'

const Table = ({ display = 'table', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // const { styledProps, otherProps } = propsFilter(props, display, true)

    return (
        <a.Table $display={display} {...filteredProps}>
            {children}
        </a.Table>
    )
}
export default Table
