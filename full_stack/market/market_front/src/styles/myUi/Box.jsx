import { filterProps } from './util'
import * as a from './styles/customStyled'

const Box = ({ display = 'flex', children, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // console.log(filteredProps)

    return (
        <>
            <a.Box $display={display} {...filteredProps}>
                {children}
            </a.Box>
        </>
    )
}
export default Box
