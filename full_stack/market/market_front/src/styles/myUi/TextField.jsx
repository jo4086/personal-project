import { propsFilter } from './util'
import * as a from './styles/customStyled'

const TextField = ({ display = 'block', value, onChange, label, name, multiline, rows = 4, cols = 30, type = 'text', style, ...props }) => {
    const styledProps = propsFilter(props, display, true)
    const Layout = multiline ? 'textarea' : 'input'

    return (
        <a.TextField {...styledProps}>
            <Layout id={name} name={name} rows={multiline ? rows : undefined} cols={multiline ? cols : undefined} type={!multiline ? type : undefined} style={style} $display={display} value={value} onChange={onChange} />
            {label && (
                <label htmlFor={name} className={value ? 'active' : ''}>
                    {label}
                </label>
            )}
        </a.TextField>
    )
}
export default TextField
