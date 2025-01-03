import { filterProps } from './util'

// import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Thead = ({ display = 'table', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)
    // const { styledProps, otherProps } = propsFilter(props, display, true)

    // const styledProps = propsFilter(props, display, true)

    return (
        <a.Thead $display={display} {...filteredProps}>
            {children}
        </a.Thead>
    )
}
export default Thead
