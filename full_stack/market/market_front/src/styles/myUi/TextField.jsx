import { camelToKebab, filterProps } from './util'
import * as a from './styles/customStyled'

const TextField = ({ display = 'flex', value, borderBreak, onChange, label, name, multiline, rows = 4, cols = 30, type = 'text', autoComplete, placeholder, className = 'undefined', phrStyles = 'undefined', onFocus, onBlur,style, ...props }) => {
    const filteredProps = filterProps(props, display, true)
    const Layout = multiline ? 'textarea' : 'input'

    console.log(rows)
    return (
        <a.TextField {...filteredProps} className={borderBreak && value ? 'active' : ''}>
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
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={className && value ? 'active' : className}
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
