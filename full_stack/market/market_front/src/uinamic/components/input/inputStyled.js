import styled from 'styled-components'
import { styledCore } from '../../core'

export const StyledButton = styled.button`
    ${(props) => (props.$styles ? styledCore(props.$styles) : '')}
`
