import { propsFilter,filterProps } from './util'
import * as a from './styles/customStyled'

// import * as a from '../customStyled'
// import filterPropsByLayout from './utils'

const Container = ({ display="flex", children, style, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // console.log(filteredProps)
    // const { styledProps, otherProps } = propsFilter(props, display, true)

    // const styledProps = propsFilter(props, display)
    return (
        <a.Container $display={display}  {...filteredProps}>
            {children}
        </a.Container>
    )
}

export default Container
