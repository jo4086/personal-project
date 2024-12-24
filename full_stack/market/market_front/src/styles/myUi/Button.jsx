import * as a from '../customStyled'

const Button = ({children, padding, paddingTop,paddingBottom,paddingLeft,PaddingRight,paddingSide,paddingVertical, width, boxShadow}) => {
    return (
        <a.Button $padding={padding} $paddingTop={paddingTop} $paddingBottom={paddingBottom} $paddingLeft={paddingLeft} $paddingRight={PaddingRight} $paddingSide={paddingSide} $paddingVertical={paddingVertical} $width={width} $boxShadow={boxShadow}>
            {children}
        </a.Button>
    )
}
export default Button