import * as a from '../customStyled'

const Button = ({ onClick, children, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingSide, paddingVertical, width, boxShadow, height, style, margin, ...props }) => {
    return (
        <a.Button
            onClick={onClick}
            $padding={padding}
            $paddingTop={paddingTop}
            $paddingBottom={paddingBottom}
            $paddingLeft={paddingLeft}
            $paddingRight={paddingRight}
            $paddingSide={paddingSide}
            $paddingVertical={paddingVertical}
            $width={width}
            $height={height}
            $boxShadow={boxShadow}
            $margin={margin}
            style={style}
            {...props}>
            {children}
        </a.Button>
    )
}
export default Button
