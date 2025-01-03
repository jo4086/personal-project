import { filterProps } from './util'

import * as a from './styles/customStyled'

const Ul = ({ type = 'ul', display = 'flex', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)



    if (type === 'tr') {
        const filteredProps = filterProps(props, display, true)

        return (
            <a.Ul as={type} $display="table-row" {...filteredProps}>
                {children}
            </a.Ul>
        )
    }

    return (
        <a.Ul as={type} $display={display} {...filteredProps}>
            {children}
        </a.Ul>
    )
}

export default Ul
