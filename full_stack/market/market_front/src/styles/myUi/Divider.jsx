import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const Divider = ({ display = 'flex',margin="auto 3px", style, ...props }) => {
    const styledProps = propsFilter(props, display, false)

    return (
        <>
            <a.Divider $display={display} $margin={margin} style={style} {...styledProps}></a.Divider>
        </>
    )
}

export default Divider
