import { propsFilter,filterProps } from './util'
import * as a from './styles/customStyled'

const Btn = ({ display = 'block', type='button', children, style, ...props }) => {
    const filteredProps = filterProps(props, display, true)

    // const { styledProps, otherProps } = propsFilter(props, display, true)

    // const styledProps = propsFilter(props, display, true)    

    // console.log('btn',props)
    // console.log(styledProps)
    return <a.Button $display={display} {...filteredProps} >{children}</a.Button>
}

export default Btn
