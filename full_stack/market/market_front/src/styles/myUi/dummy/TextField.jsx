// import * as a from '../customStyled'
import filterPropsByLayout from './utils'
import * as a from './styles/customStyled'

const TextField = ({ display = 'block', label, name, multiline, rows = 4, cols = 30, type = 'text', style, ...props }) => {
    const styledProps = filterPropsByLayout(props, display, true)
    const Layout = multiline ? 'textarea' : 'input'

    console.log(styledProps)
    return (
        <a.TextField {...styledProps}>
            {label && <label htmlFor={name}>{label}</label>}
            <Layout id={name} name={name} rows={multiline ? rows : undefined} cols={multiline ? cols : undefined} type={!multiline ? type : undefined} style={style} />
        </a.TextField>
    )
}
export default TextField
