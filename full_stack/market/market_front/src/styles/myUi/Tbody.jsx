import { filterProps } from './util'

import * as a from './styles/customStyled'

const Tbody = ({ display = 'table', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)
    // console.log(filteredProps)
    // console.log(display)
    // const { styledProps, otherProps } = propsFilter(props, display, true)

    return (
        <a.Tbody $display={display} {...filteredProps}>
            {children}
        </a.Tbody>
    )
}
export default Tbody
