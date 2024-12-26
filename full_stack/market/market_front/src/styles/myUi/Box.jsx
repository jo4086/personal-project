import { propsFilter } from './util'
import * as a from './styles/customStyled'

const Box = ({ display = 'flex', children, style, ...props }) => {
    const styledProps = propsFilter(props, display)

    // console.log(styledProps)
    return (
        <>
            <a.Box $display={display} style={style} {...styledProps}>
                {children}
            </a.Box>
        </>
    )
}
export default Box
