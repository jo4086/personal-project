import * as a from '../customStyled'
import filterPropsByLayout from './utils'

const Li = ({ children, justifyContent, alignItems, padding, width, height, margin }) => {
    const styledProps = filterPropsByLayout(props, layout)
    
    return (
        
        <a.Li $justifyContent={justifyContent} $alignItems={alignItems} $padding={padding} $width={width} $height={height} $margin={margin}>
            {children}
        </a.Li>
    )
}

export default Li