import { propsFilter } from './util'
import * as a from './styles/customStyled'
const Box = ({ onClick,ref, display = 'flex', children, style, ...props }) => {
    const styledProps = propsFilter(props, display, true)

    return (
        <>
            <a.Box $display={display} onClick={onClick} ref={ref} style={style} {...styledProps}>
                {children}
            </a.Box>
        </>
    )
}
export default Box
