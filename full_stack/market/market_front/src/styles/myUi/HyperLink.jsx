import { propsFilter, filterProps } from './util'
import * as a from './styles/customStyled'

const HyperLink = ({  children, display = 'inline',  ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // console.log(props)
    // const styledProps = propsFilter(props, display, true)
    const { styledProps, otherProps } = propsFilter(props, display, true)

    // console.log(styledProps)

    return (
        <a.HyperLink $display={display} {...filteredProps}>
            {children}
        </a.HyperLink>
    )
}
export default HyperLink
