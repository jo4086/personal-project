import { Container, Text, Box } from '../styles/myUi'
import { theme } from '../styles/myUi/common'

const PostCreatePage = () => {
    return (
        <Container {...theme} border="1px solid red">
            <Text>게시물 작성 페이지입니다.</Text>
            <Box {...border} {...common}>
                <Text>게시판: </Text>
            </Box>
        </Container>
    )
}
export default PostCreatePage

const border = {
    border: '1px solid black',
}

const common = {
    width: '100%',
    height: '200px',
    userSelect:'none'
}