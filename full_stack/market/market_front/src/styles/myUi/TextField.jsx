import { propsFilter, camelToKebab } from './util'
import * as a from './styles/customStyled'

const TextField = ({ display = 'flex', value, onChange, label, name, multiline, rows = 4, cols = 30, type = 'text', style, autoComplete, placeholder, className = 'undefined', phrStyles = 'undefined', onBlur, ...props }) => {
    const styledProps = propsFilter(props, display, true)
    const Layout = multiline ? 'textarea' : 'input'

    // console.log(styledProps)
    return (
        <a.TextField {...styledProps}>
            <Layout
                id={name} // input, textarea 지정
                name={name}
                rows={multiline ? rows : undefined}
                cols={multiline ? cols : undefined}
                type={!multiline ? type : undefined}
                style={style}
                display={display}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={className}
            />
            {label && (
                <label htmlFor={name} className={value ? 'active' : ''}>
                    {label}
                </label>
            )}
            {phrStyles && className && (
                <style>{`.${className}::placeholder { ${camelToKebab(phrStyles)} }
            .${className}:focus::placeholder { opacity: 0; }`}</style>
            )}
        </a.TextField>
    )
}
export default TextField
