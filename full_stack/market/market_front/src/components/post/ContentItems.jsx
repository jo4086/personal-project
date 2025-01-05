import React, { useState, useEffect } from 'react'
import { Box } from '../../styles/myUi'
import { FaImages } from 'react-icons/fa'
import DynamicTextField from '../shared/DynamicTextField'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ItemType = 'CONTENT'

const ContentItems = () => {
    const [blocks, setBlocks] = useState([{ id: '1', type: 'text', content: '' }])
    const [focusedIndex, setFocusedIndex] = useState(null) // 포커싱된 텍스트 필드

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'UPLOAD_IMAGES') {
                const newBlocks = event.data.payload.map((fileData) => ({
                    id: fileData.id,
                    type: 'image',
                    src: fileData.src,
                }))
                insertImages(newBlocks)
            }
        }

        window.addEventListener('message', handleMessage)
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [focusedIndex, blocks])

    const insertImages = (newImages) => {
        setBlocks((prev) => {
            if (focusedIndex !== null) {
                // 2-1: 포커싱된 텍스트 필드 위에 삽입
                const updatedBlocks = [...prev]
                updatedBlocks.splice(focusedIndex, 0, ...newImages)
                return updatedBlocks
            }

            // 2-2: 포커싱이 없으면 최상단에 삽입
            const firstImageIndex = prev.findIndex((block) => block.type === 'image')
            if (firstImageIndex === -1) {
                return [...newImages, ...prev]
            }

            // 2-3: 이미지가 존재하면 해당 이미지 뒤에 삽입
            const updatedBlocks = [...prev]
            updatedBlocks.splice(firstImageIndex + 1, 0, ...newImages)
            return updatedBlocks
        })
    }

    const handleTextChange = (index, newText) => {
        const updatedBlocks = [...blocks]
        updatedBlocks[index].content = newText
        setBlocks(updatedBlocks)

        // 4. 연속된 빈 텍스트 필드 관리
        cleanEmptyTextFields()
    }

    const cleanEmptyTextFields = () => {
        setBlocks((prev) => {
            let hasEmptyText = false
            return prev.filter((block) => {
                if (block.type === 'text' && block.content === '') {
                    if (hasEmptyText) return false // 첫 빈 텍스트 필드를 제외하고 제거
                    hasEmptyText = true
                }
                return true
            })
        })
    }

    const moveBlock = (dragIndex, hoverIndex) => {
        const updatedBlocks = [...blocks]
        const [removed] = updatedBlocks.splice(dragIndex, 1)
        updatedBlocks.splice(hoverIndex, 0, removed)
        setBlocks(updatedBlocks)
    }

    const handleDrop = () => {
        console.log('handleDrop triggered')
        setBlocks((prev) => {
            console.log('Previous blocks in handleDrop:', prev)
            const lastBlock = prev[prev.length - 1]

            // 마지막 블록이 이미지인지 확인
            if (lastBlock?.type === 'image') {
                console.log('Last block is an image, adding a text block')
                const newTextBlock = { id: Date.now().toString(), type: 'text', content: '' }

                // 마지막 블록이 이미 텍스트 필드라면 중복 생성 방지
                if (prev[prev.length - 1]?.type === 'text') {
                    console.log('Last block is already a text block, skipping creation')
                    return prev
                }

                return [...prev, newTextBlock]
            }

            console.log('Last block is not an image, no text block added')
            return prev
        })
    }

    const handleAddTextBetween = (index) => {
        const newTextBlock = { id: Date.now().toString(), type: 'text', content: '' }
        const updatedBlocks = [...blocks]
        updatedBlocks.splice(index + 1, 0, newTextBlock) // 이미지 뒤에 텍스트 추가
        setBlocks(updatedBlocks)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Box {...Container}>
                <Box {...utilBar}>
                    <FaImages size="25" onClick={() => window.open('/image-uploader', '_blank', 'width=500,height=500')} style={imgIconStyle} />
                </Box>
                <Box width="100%" padding="10px 20px" flexDirection="column">
                    {blocks.map((block, index) => (
                        <React.Fragment key={block.id}>
                            <Block
                                block={block}
                                index={index}
                                onTextChange={handleTextChange}
                                moveBlock={moveBlock}
                                handleDrop={handleDrop}
                                setFocusedIndex={setFocusedIndex} // 포커싱 상태 전달
                            />
                            {block.type === 'image' && blocks[index + 1]?.type === 'image' && (
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        padding: '10px',
                                        backgroundColor: '#f0f0f0',
                                        margin: '5px 0',
                                    }}
                                    onClick={() => handleAddTextBetween(index)}>
                                    + Add Text Here
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </DndProvider>
    )
}
const Block = ({ block, index, onTextChange, moveBlock, handleDrop }) => {
    const ref = React.useRef(null)

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index === index) return
            moveBlock(draggedItem.index, index)
            draggedItem.index = index
        },
        drop: () => {
            // 부모의 handleDrop 호출
            handleDrop()
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        end: () => {
            // 드래그가 종료된 후에도 부모의 handleDrop 호출
            handleDrop()
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
                marginBottom: '10px',
            }}>
            {block.type === 'image' && (
                <img
                    src={block.src}
                    alt="Uploaded"
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        height: 'auto',
                        margin: '5px 0',
                    }}
                />
            )}
            {block.type === 'text' && <DynamicTextField value={block.content} onChange={(newValue) => onTextChange(index, newValue)} />}
        </div>
    )
}
export default ContentItems

const Container = {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'yellowgreen',
}
const utilBar = {
    width: '100%',
    gap: '10px',
}
const imgIconStyle = {
    border: '1px solid black',
    padding: '2px',
    borderRadius: '2px',
    backgroundColor: 'white',
    color: 'gray',
    cursor: 'pointer',
}
