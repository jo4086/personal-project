import React, { useState, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Box, Button, Text } from '../../styles/myUi'

// File 객체의 3가지 속성
// file.name, file.size, file.type

const ImageUploader = ({ onClose, onSave }) => {
    const [images, setImages] = useState([])
    const fileInputRef = useRef()
    console.log(images)
     const handleClick = () => {
         // useRef로 연결된 input 클릭
         fileInputRef.current.click()
     }

    
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files)
        const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']
        const MAX_FILES = 5

        // 업로드 가능한 최대 파일 수 확인
        if (images.length + files.length > MAX_FILES) {
            alert(`최대 ${MAX_FILES}개의 파일만 업로드 가능합니다.`)
            return
        }

        const validFiles = files.filter((file) => {
            // 파일 크기 제한
            if (file.size > MAX_FILE_SIZE) {
                alert(`${file.name} 파일이 너무 큽니다. (최대 5MB 허용)`)
                return false
            }
            // 파일 형식 제한
            if (!ALLOWED_TYPES.includes(file.type)) {
                alert(`${file.name} 파일 형식이 지원되지 않습니다.`)
                return false
            }
            return true
        })

        // 유효한 파일만 상태에 추가
        setImages((prev) => [
            ...prev,
            ...validFiles.map((file) => ({
                id: Date.now() + Math.random(),
                src: URL.createObjectURL(file),
                file,
            })),
        ])
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return

        const reorderedImages = Array.from(images)
        const [movedImage] = reorderedImages.splice(result.source.index, 1)
        reorderedImages.splice(result.destination.index, 0, movedImage)
        setImages(reorderedImages)
    }
    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((image) => image.id !== id))
    }

    return (
        <Box {...Container}>
            <Text border="1px solid red" type="h4" display="flex" height="30px" width="100%">
                이미지 업로드
            </Text>
            <Box {...imgGrid}>
                {/* <Box {...Items}> */}
                <Box {...Item} {...fileBox}>
                    <Box {...boxNum}>1</Box>
                    <Box {...selectButton} onClick={handleClick}>
                        첨부하기
                    </Box>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple hidden accept="image/*" />
                </Box>
                {/* <Box {...Item}></Box> */}
                {/* <Box {...Item}></Box> */}
                {/* </Box> */}
                {/* <Box {...Items}> */}
                {/* <Box {...Item}></Box> */}
                {/* <Box {...Item}></Box> */}
                {/* <Box {...Item}></Box> */}
                {/* </Box>{' '} */}
                {/* <Box {...Items}> */}
                {/* <Box {...Item}></Box> */}
                {/* <Box {...Item}></Box> */}
                {/* <Box {...Item}></Box> */}
                {/* </Box> */}
            </Box>
        </Box>
    )
}

export default ImageUploader

const Container = {
    boxSizing: 'border-box',
    // padding: '20px',
    backgroundColor: 'white',
    border: '1px solid gray',
    width: '479px',
    height: '479px',
    flexDirection: 'column',
    // padding:'30px',
}
const imgGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3열 균등 배치
    gridGap: '10px', // 이미지 간 간격
    padding: '10px 20px',
    width: '100%',
    backgroundColor: 'gray',
}

const Items = {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    // paddingSide: '30px',
    gap: '10px',
}

const Item = {
    width: '100%', // 그리드 셀 크기에 맞게 조정
    aspectRatio: '1 / 1', // 정사각형 비율 유지
    border: '1px solid rgba(100, 160, 200, 0.77)',
    backgroundColor: 'yellow',
    position:'relative',
}
const boxNum = {
    width: '20px',
    height: '20px',
    backgroundColor: 'rgb(119, 190, 245)',
    position: 'absolute',
    top: '-1px',
    right: '-1px',
    justifyContent: 'center',
    lineHeight: '13px',
    border: '1px solid black',
    fontSize: '12px',
    boxSizing: 'border-box',
}
const fileBox = {
    justifyContent: 'center',
    alignItems:'center'
}
const selectButton = {
    cursor: 'pointer',
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'rgb(234, 234, 234)',
    padding: '3px 6px',
    fontSize: '14px'
}

// <Box {...Container}>
//     <h2>이미지 삽입</h2>
//     <input type="file" multiple accept="image/*" onChange={handleFileUpload} />
//     <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="images">
//             {(provided) => (
//                 <Box ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', flexWrap: 'wrap' }}>
//                     {images.map((image, index) => (
//                         <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
//                             {(provided) => (
//                                 <Box
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     style={{
//                                         margin: '10px',
//                                         border: '1px solid lightgray',
//                                         borderRadius: '5px',
//                                         padding: '10px',
//                                         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//                                         backgroundColor: 'white',
//                                     }}>
//                                     <img src={image.src} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px', borderRadius: '5px' }} />
//                                     <button onClick={() => handleRemoveImage(image.id)} style={{ marginTop: '5px' }}>
//                                         삭제
//                                     </button>
//                                 </Box>
//                             )}
//                         </Draggable>
//                     ))}
//                     {provided.placeholder}
//                 </Box>
//             )}
//         </Droppable>
//     </DragDropContext>
//     <button onClick={() => onSave(images)}>등록하기</button>
//     <button onClick={onClose}>닫기</button>
// </Box>
