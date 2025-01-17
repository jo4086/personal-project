import { StyledButton } from './inputStyled'
import { filterPropsCore } from '../../core'
import { useTriggerDynamicClass } from '../../utils'

const Button = ({ dynamicType = undefined, display = 'flex', as = 'button', pseudo = undefined, children, ...props }) => {
    const { dynamicClass, filter } = filterPropsCore({ display, as, props, pseudo, dynamicType })

    const { isTriggered, handleDynamicEvent } = useTriggerDynamicClass(dynamicClass)
    return (
        <StyledButton
            as={as}
            {...filter}
            className={isTriggered ? 'dynamic' : ''}
            {...(dynamicType ? { [dynamicType]: handleDynamicEvent } : {})} // 동적 이벤트 바인딩
        >
            {children}
        </StyledButton>
    )
}

export default Button
