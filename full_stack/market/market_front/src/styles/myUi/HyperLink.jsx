import { propsFilter } from './util'
import * as a from './styles/customStyled'

const HyperLink = ({ to = '/auth', children, display = 'inline', style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    return (
        <a.HyperLink display={display} style={style} to={to} {...styledProps}>
            {children}
        </a.HyperLink>
    )
}
export default HyperLink
