import { propsFilter, camelToKebab, filterProps } from './util'
import * as a from './styles/customStyled'

const Divider = ({ display = 'flex',margin="auto 3px", style, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // const { styledProps, otherProps } = propsFilter(props, display, true)
    // const styledProps = propsFilter(props, display, false)

    return (
        <>
            <a.Divider $display={display}{...filteredProps}></a.Divider>
        </>
    )
}

export default Divider
