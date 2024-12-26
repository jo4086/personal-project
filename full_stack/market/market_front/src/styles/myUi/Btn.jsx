import { propsFilter } from './util'
import * as a from './styles/customStyled'

const Btn = ({ display = 'block', type='button', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)    

    return <a.Button $display={display} type={type} style={style} {...styledProps}>{children}</a.Button>
}

export default Btn
