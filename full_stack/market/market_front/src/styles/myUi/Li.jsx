import { propsFilter, camelToKebab, filterProps } from './util'
import * as a from './styles/customStyled'

const Li = ({ display = 'flex', type = 'li', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // const styledProps = propsFilter(props, display, true)
    // const { styledProps, otherProps } = propsFilter(props, display, true)

    if (type === 'td' || type === 'th') {
        const filteredProps = filterProps(props, display, true)

        // const styledProps = propsFilter(props, 'table-cell', true)
        // console.log(styledProps)
        return (
            <a.Li $display="table-cell" as={type} {...filteredProps}>
                {children}
            </a.Li>
        )
    }

    return (
        <a.Li $display={display} as={type} {...filteredProps}>
            {children}
        </a.Li>
    )
}

export default Li
