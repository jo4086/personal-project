import { Navigate, useParams } from 'react-router-dom'
import { Box, Button, Container, Text } from '../styles/myUi'
import { theme } from '../styles/myUi/common'
import { Boardbar, Banner } from '../components/shared'
import * as Boards from '../components/board'
import { capitalize } from '../utils'

const BoardSelector = () => {
    const { type } = useParams()

    if (!type) {
        return <Navigate to="/board/free" replace />
    }

    const boardData = {
        free: { title: '자유게시판', posts: ['자유 글 1', '자유 글 2'] },
        notice: { title: '공지사항', posts: ['공지 1', '공지 2'] },
        sell: { title: '판매게시판', posts: ['세일 1', '세일 2'] },
        buy: { title: '구매게시판', posts: ['구매 1', '구매 2'] },
        info: { title: '정보게시판', posts: ['구매 1', '구매 2'] },
    }

    const board = boardData[type]

    const setChar = capitalize(type)
    const SelectBoard = Boards[`${setChar}Board`]

    if (!board || !SelectBoard) {
        return (
            <Container {...theme}>
                <Banner />
                <Boardbar />
                <Text>존재하지 않는 게시판입니다.</Text>
            </Container>
        )
    }

    return (
        <Container {...theme}>
            <Banner />
            <Boardbar />
            <Box backgroundColor="yellow" width="100%" justifyContent="space-between" alignItems="end">
                <Text {...titleStyle}>{board.title}</Text>
                <Button margin="10px" width="100px" height="30px" boxShadow="0 0 1px rgba(0,0,0,0.4)">
                    글쓰기
                </Button>
            </Box>
            <Box marginVertical="3px" width="98%" height="1px" borderTop="1px solid rgba(0,0,0,0.3)" />
            <SelectBoard />
        </Container>
    )
}
export default BoardSelector

const titleStyle = {
    display: 'flex',
    width: '100%',
    height: '40px',
    marginVertical: '20px',
    marginBottom: '10px',
    justifyContent: 'flex-start',
    paddingLeft: '60px',
    lineHeight: '40px',
    type: 'h2',
}
