import * as a from '../customStyled'
import filterPropsByLayout from './utils'

const Section = ({ display = 'flex', children, style, ...props }) => {
    const styledProps = filterPropsByLayout(props, display)
    return (
        <a.Container $display={display} style={style} {...styledProps}>
            {children}
        </a.Container>
    )
}

export default Section
