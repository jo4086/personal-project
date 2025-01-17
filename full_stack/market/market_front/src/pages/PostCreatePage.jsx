import { Container, Text, Box, Ul, Li, Divider, InputField, TextField } from '../styles/myUi'
import { theme, dropdownBox, dropdownItems, dropdownItem, postform } from '../styles/myUi/common'
import React, { useState, useRef, useEffect, useCallback } from 'react'
// import CatrgoryItem from '../components/post/CatrgoryItem'
// import GoodsItem from '../components/post/GoodsItem'
import AttachItem from '../components/post/AttachItem'
import { ContentItems, GoodsItem, CategoryItem } from '../components/post'
import Button from '../uinamic/components/input/Button'

// 카테고리, 품목
// const [goods, setgoods] = useState('')

const PostCreatePage = () => {
    const [selectedBoard, setSelectedBoard] = useState('자유게시판')
    const [isBoardDropdownOpen, setBoardDropdownOpen] = useState(false)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const boardOptions = ['자유게시판', '판매게시판', '구매게시판', '정보게시판']

    const dropdownRef = useRef(null)

    const toggleBoardDropdown = () => {
        setBoardDropdownOpen((prev) => !prev)
    }
    // console.log(isBoardDropdownOpen)

    const handleSelectBoard = (board, e) => {
        e.stopPropagation() // 이벤트 전파 중단
        setSelectedBoard(board)
        setBoardDropdownOpen(false)
    }

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setBoardDropdownOpen(false) // 드롭다운 외부 클릭 시 닫기
        }
    }

    const handleSubmit = useCallback(() => {

    })

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown)
        return () => {
            document.removeEventListener('mousedown', closeDropdown)
        }
    }, [])

    return (
        <Container {...theme} border="1px solid red">
            <Text>게시물 작성 페이지입니다.</Text>
            <form style={{ width: '100%' }}>
                <Box {...common} {...titleBox} flexDirection="column" gap="10px">
                    <Ul {...ul}>
                        <Li {...categoryCommon} {...li}>
                            게시판
                            <Box {...categoryCommon} {...dropdownBox} width="100px" onClick={toggleBoardDropdown} ref={dropdownRef}>
                                {selectedBoard}
                                {isBoardDropdownOpen && (
                                    <Ul {...dropdownItems} width="100px" zIndex="2000" backgroundColor="white">
                                        {boardOptions.map((board, idx) => (
                                            <React.Fragment key={board}>
                                                <Li onClick={(e) => handleSelectBoard(board, e)} {...categoryCommon} {...dropdownItem}>
                                                    {board}
                                                </Li>
                                            </React.Fragment>
                                        ))}
                                    </Ul>
                                )}
                            </Box>
                        </Li>
                        {selectedBoard !== '자유게시판' && (
                            <Li {...categoryCommon} {...li}>
                                카테고리 <CategoryItem selectedBoard={selectedBoard} onCategorySelect={setCategory} />
                            </Li>
                        )}
                        {selectedBoard !== '자유게시판' && category && (
                            <Li {...categoryCommon} {...li}>
                                품목 <GoodsItem selectedBoard={selectedBoard} category={category} />
                            </Li>
                        )}
                    </Ul>

                    <Box {...postform} display="flex">
                        <TextField
                            label="제목"
                            className="1"
                            borderBreak
                            labelTop="5px"
                            fsLabelTop="-6px"
                            fsLabelLeft="15px"
                            fsFontSize="12px"
                            atvAfterWidth="40px"
                            atvAfterLeft="8px"
                            padding="10px"
                            width="100%"
                            height="30px"
                            type="text"
                            name="title"
                            value={title}
                            borderRadius="4px"
                            border="1px solid rgba(0,0,0,0.7)"
                            autoComplete="off"
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    </Box>

                    <Box {...postform} display="flex" border="1px solid black" backgroundColor="pink">
                        <ContentItems />
                        {/* <TextField multiline {...textArea} /
                        > */}
                    </Box>

                    <Button type="submit" {...submitStyle}>등록</Button>
                </Box>
            </form>
        </Container>
    )
}
export default PostCreatePage

const submitStyle = {
    width: '100px',
    margin: '0px 30px 10px auto',
    padding: '5px',
    border: '1px solid rgba(0,0,0,0.5)',
    borderRadius: '5px',
    backgroundColor: 'rgba(10,100,190,0.5)',
    cursor: 'pointer',
    justifyContent: 'center',
    hover: {
        backgroundColor: 'rgba(10,100,190,0.6)'
    }
}

const common = {
    width: '100%',
    // height: '200px',
    userSelect: 'none',
}
const titleBox = {
    border: '1px solid black',
}
const categoryCommon = {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    width: 'auto',
    margin: '0 5px 0 5px',
    // paddingSide: '20px',
}

const ul = {
    backgroundColor: 'gray',
    width: '100%',
    height: '30px',
    borderRadius: '0',
    justifyContent: 'start',
}

const li = {
    height: '100%',
    backgroundColor: 'lightblue',
    paddingSide: '20px',
}

const textArea = {
    // width: '100%',
    height: 'auto',
    type: 'text',
    padding: '10px',
}

/* <TextField
    label="글내용"
    width="100%"
    height="100%"
    multiline
    rows="30"
    type="text"
    fsFontSize="12px"
    atvAfterWidth="50px"
    atvAfterLeft="8px"
    name="title"
    value={content}
    className="1"
    borderBreak
    padding="10px"
    labelTop="10px"
    fsLabelTop="-7px"
    fsLabelLeft="15px"
    borderRadius="4px"
    border="1px solid rgba(0,0,0,0.7)"
    autoComplete="off"
    onChange={(e) => {
        setContent(e.target.value)
    }}
/> */
