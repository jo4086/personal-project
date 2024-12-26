import { propsFilter } from './util'
import * as a from './styles/customStyled'

const Text = ({ display = 'block', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)    
    return (
        <a.Text $display={display} style={style} {...styledProps}>
            {children}
        </a.Text>
    )
}

export default Text