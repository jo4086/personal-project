import { propsFilter } from './util'
import * as a from './styles/customStyled'

const HyperLink = ({ to = '/auth', children, display = 'inline', style, ...props }) => {
    // console.log(props)
    const styledProps = propsFilter(props, display, true)
    // console.log(styledProps)

    return (
        <a.HyperLink $display={display} style={style} to={to} {...styledProps}>
            {children}
        </a.HyperLink>
    )
}
export default HyperLink
