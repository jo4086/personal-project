import { propsFilter } from './util'
import * as a from './styles/customStyled'


const Text = ({ type = 'p', fontSize, display = 'block', children, style, ...props }) => {
    console.log('fontSize', fontSize)
   const chooseFontSize = (fontSize ?? props.fontSize).replace('px', '')

   const reSizeFontSize = `${chooseFontSize * (DEFAULT_FONT_SIZES[type] || 1)}px`
   props.fontSize = reSizeFontSize

   const styledProps = propsFilter(props, display, true)

   if (!ALLOWED_TAGS.includes(type)) {
      throw new Error(`Invalid type "${type}" provided to <Text />. Supported types are: [ ${ALLOWED_TAGS.map((tag) => `"${tag}"`).join(', ')} ]`)
   }
   return (
      <a.Text as={type} $display={display} style={style} {...styledProps}>
         {children}
      </a.Text>
   )
}

export default Text

const ALLOWED_TAGS = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const DEFAULT_FONT_SIZES = {
   h1: 2, // 기본 비율 2배
   h2: 1.5, // 기본 비율 1.5배
   h3: 1.17, // 기본 비율 1.17배
   h4: 1, // 기본 비율 1배
   h5: 0.83, // 기본 비율 0.83배
   h6: 0.67, // 기본 비율 0.67배
   p: 1, // 기본 비율 1배
   span: 1, // 기본 비율 유지
}