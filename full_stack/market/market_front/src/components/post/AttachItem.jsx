import { Text, Box, Ul, Li, HyperLink } from '../../styles/myUi'
import styled from 'styled-components'


const AttachItem = () => {
    return (
        <>
            <Box>
                <Button type="file" multiple name="이미지" />
            </Box>
        </>
    )
}

export default AttachItem

const Button = styled.input`

`