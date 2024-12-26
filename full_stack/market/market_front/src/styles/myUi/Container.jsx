import { propsFilter } from './util'
import * as a from './styles/customStyled'

// import * as a from '../customStyled'
// import filterPropsByLayout from './utils'

const Container = ({ display="flex", children, style, ...props }) => {
    const styledProps = propsFilter(props, display)
    return (
        <a.Container $display={display} style={style} {...styledProps}>
            {children}
        </a.Container>
    )
}

export default Container
