import { Container, Text, Box } from '../styles/myUi'
import { theme } from '../styles/myUi/common'

const PostCreatePage = () => {
    return (
        <Container {...theme} border="1px solid red">
            <Text>게시물 작성 페이지입니다.</Text>
            <Box {...border} {...common} {...titleBox}>
                <Box {...boardCategoryContainer}>
                    <Text {...categoryItems}>게시판: </Text>
                </Box>
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
    userSelect: 'none',
}
const titleBox = {
    backgroundColor: 'yellow',
    // justifyContent: '',
}
const boardCategoryContainer = {
    className: 'board_category_container',
    border: '1px solid black',
    display: ' flex',
    width: '100%',
    height: '25px',
    marginVertical: '2px',
    gap: '20px',
    justifyContent: 'start',
    display: 'flex',
}

const categoryItems = {
    type: 'span',
    backgroundColor: 'gray',
    display: 'flex',
    width: 'auto',
    marginSide: '10px',
}

const boardSelector = {}
