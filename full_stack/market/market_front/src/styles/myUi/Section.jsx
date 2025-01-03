// import * as a from '../customStyled'
import * as a from './styles/customStyled'
import { filterProps } from './util'

const Section = ({ display = 'flex', children, style, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // const styledProps = filterPropsByLayout(props, display)
    return (
        <a.Container $display={display}  {...filteredProps}>
            {children}
        </a.Container>
    )
}

export default Section
