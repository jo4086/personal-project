import styleDisplayKeys from './style_displayKeys.js'
import styleCssKeys from './style_cssKeys.js'

const filterStyleProps = (props) => {
    const { stringProps, as, display } = props

    const { attribute, validDisplay } = styleDisplayKeys(as, display)

    const { validCss, strings } = styleCssKeys({ stringProps, as, validDisplay, attribute })

    return {
        validDisplay,
        validCss,
        strings,
    }
}

export default filterStyleProps
