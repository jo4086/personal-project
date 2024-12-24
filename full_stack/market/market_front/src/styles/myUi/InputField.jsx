import filterPropsByLayout from './utils'
import { InputContainer } from '../customStyled'

const InputField = ({ label, multiline = false, fullWidth = false, rows, name, type = 'text', style, display = 'flex', ...props }) => {
    // 스타일 속성 필터링
    const styledProps = filterPropsByLayout(props, display)

    // 입력 필드 선택
    const InputComponent = multiline ? 'textarea' : 'input'

    return (
        <InputContainer $fullWidth={fullWidth} {...styledProps}>
            {label && <label htmlFor={name}>{label}</label>}
            <InputComponent
                id={name}
                name={name}
                rows={multiline ? rows : undefined}
                type={!multiline ? type : undefined}
                style={style}
                {...props} // 추가적인 속성 전달
            />
        </InputContainer>
    )
}

export default InputField
