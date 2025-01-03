import { useState, useEffect } from 'react'
import { Text, Box, Ul, Li, TextField } from '../../styles/myUi'
import ImageUploader from '../media/ImageUploader'
import { FaImages } from 'react-icons/fa'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DynamicTextField from '../shared/DynamicTextField'

const ItemType = 'CONTENT'

const ContentItems = ({ onBlocksChange }) => {
    const [blocks, setBlocks] = useState([{ id: '1', type: 'text', content: '' }])

    // 메시지를 통해 이미지를 blocks에 추가
   useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === 'UPLOAD_IMAGES') {
            const newBlocks = event.data.payload.map((fileData) => ({
                id: fileData.id, // Unique ID
                type: 'image',
                src: fileData.src, // Object URL for preview
                file: fileData.file, // Original File for backend
            }));
            setBlocks((prev) => [...newBlocks, ...prev]); // 맨 위에 추가
        }
    };

    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('message', handleMessage);
    };
}, []);

    const handleTextChange = (index, newText, newRows) => {
        const updatedBlocks = [...blocks]
        updatedBlocks[index].content = newText
        updatedBlocks[index].rows = newRows
        setBlocks(updatedBlocks)
    }

    const handleAddTextBlock = () => {
        setBlocks((prev) => [...prev, { id: Date.now().toString(), type: 'text', content: '', rows: 1 }])
    }
    const handleOpenUploader = () => {
        window.open('/image-uploader', '_blank', 'width=500,height=500')
    }

    return (
        <>
            <Box {...Container}>
                <Box {...utilBar}>
                    <FaImages size="25" onClick={handleOpenUploader} style={imgIconStyle} />
                </Box>
                <Box width="100%" padding="10px 20px" flexDirection="column" >
                    {blocks.map((block, index) => (
                        <Box width="100%" key={block.id}>
                            {block.type === 'image' && (
                                <img
                                    src={block.src}
                                    alt="Uploaded"
                                    style={{
                                        maxWidth: '500px',
                                        width: '100%',
                                        height: 'auto',
                                        margin:'5px 0',
                                    }}
                                />
                            )}
                            {block.type === 'text' && <DynamicTextField value={block.content} onChange={(newValue) => handleTextChange(index, newValue)} />}
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
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
    // border: '1px solid black',
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

const text = {
    width: '100%',
    height: 'auto',
}

//  <div>
//                 {blocks.map((block) =>
//                     block.type === 'text' ? <textarea key={block.id} value={block.content} onFocus={() => handleFocus(block.id)} onChange={(e) => setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, content: e.target.value } : b)))} /> : <img key={block.id} src={block.src} alt="Uploaded" />,
//                 )}
//             </div>

/*
const handleFocus = (blockId) => {
        setFocusedBlockId(blockId)
    }
    const handleAddImage = (imageFile) => {
        const newImageBlock = {
            id: Date.now().toString(),
            type: 'image',
            src: URL.createObjectURL(imageFile),
        }

        const updatedBlocks = blocks.reduce((acc, block) => {
            acc.push(block)
            if (block.id === focusedBlockId) {
                acc.push(newImageBlock) // 포커싱된 블록 뒤에 이미지 삽입
            }
            return acc
        }, [])

        setBlocks(updatedBlocks)
        onBlocksChange(updatedBlocks) // 부모 컴포넌트로 업데이트 전달
    }

    // 새로운 텍스트 블록 삽입
    const addTextBlockBetween = (blockId) => {
        const newTextBlock = { id: Date.now().toString(), type: 'text', content: '' }

        const updatedBlocks = blocks.reduce((acc, block) => {
            acc.push(block)
            if (block.id === blockId) {
                acc.push(newTextBlock) // 클릭된 블록 뒤에 텍스트 삽입
            }
            return acc
        }, [])

        setBlocks(updatedBlocks)
        onBlocksChange(updatedBlocks)
    }

    const handleSaveImages = (images) => {
        setUploadedImages(images) // 업로드된 이미지를 상태에 저장
        console.log('저장된 이미지:', images)
    }



*/
