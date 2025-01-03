import React, { useState, useRef } from 'react'
import { Box, Text } from '../../styles/myUi'
import { IoMdClose } from 'react-icons/io'
import { textAlign } from '@mui/system'

function ImageUploader() {
    const [images, setImages] = useState([]) // 업로드된 이미지 상태
    const fileInputRef = useRef()

    const handleClick = () => {
        fileInputRef.current.click() // 파일 선택창 열기
    }

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files)
        const validFiles = files.map((file, index) => ({
            file,
            id: `${Date.now()}-${index}`, // 고유 ID 생성
            src: URL.createObjectURL(file), // 이미지 미리보기 URL
            // name: file.name,
        }))

        setImages((prev) => [...prev, ...validFiles]) // 기존 이미지에 추가
    }
    const handleRemove = (id) => {
        setImages((prev) => prev.filter((image) => image.id !== id))
    }

    const handleSave = () => {
        // localStorage.setItem('uploadedImages', JSON.stringify(images)) // 이미지 저장
        if (window.opener) {
            window.opener.postMessage(
                {
                    type: 'UPLOAD_IMAGES',
                    payload: images, // 업로드된 이미지 데이터를 부모 창으로 전달
                },
                '*',
            )
        }
        window.close() // 창 닫기
    }
    return (
        <Box {...Container}>
            <Text border="1px solid red" type="h4" display="flex" height="30px" width="100%">
                이미지 업로드
            </Text>
            <Box {...imgGrid}>
                {images.map((image, index) => (
                    <Box key={image.id} {...Item} style={{ position: 'relative' }}>
                        <Box {...imgNum}>{index + 1}</Box>
                        <Box
                            as="img"
                            src={image.src}
                            alt={`이미지-${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            data={image}
                        />
                        <Box {...imgRemove} onClick={() => handleRemove(image.id)}>
                            <IoMdClose size={15} />
                        </Box>
                    </Box>
                ))}
                <Box {...Item} {...fileBox}>
                    <Box {...imgNum}>{images.length + 1}</Box>
                    <Box {...selectButton} onClick={handleClick}>
                        첨부하기
                    </Box>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple hidden accept="image/*" />
                </Box>
            </Box>
            <Box {...saveButton} onClick={handleSave}>
                이미지 등록
            </Box>
        </Box>
    )
}

export default ImageUploader

// 스타일링 설정
const Container = {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    border: '1px solid gray',
    width: '479px',
    height: '479px',
    flexDirection: 'column',
}

const imgGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 100px)',
    gridGap: '10px',
    padding: '10px 20px',
    width: '100%',
    backgroundColor: 'gray',
}

const Item = {
    width: '100%',
    aspectRatio: '1 / 1',
    border: '1px solid rgba(100, 160, 200, 0.77)',
    backgroundColor: 'yellow',
    position: 'relative',
}

const imgNum = {
    width: '20px',
    height: '20px',
    backgroundColor: 'rgb(255, 255, 255)',
    position: 'absolute',
    left: '0px',
    top: '0px',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    borderRight: '1px solid rgba(100, 160, 200, 0.77)',
    borderBottom: '1px solid rgba(100, 160, 200, 0.77)',
    fontSize: '13px',
    boxSizing: 'border-box',
}
const imgRemove = {
    width: '20px',
    height: '20px',
    backgroundColor: 'rgb(255, 42, 42)',
    position: 'absolute',
    right: '0px',
    top: '0px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    boxSizing: 'border-box',
    borderLeft: '1px solid rgba(100, 160, 200, 0.77)',
    borderBottom: '1px solid rgba(100, 160, 200, 0.77)',
    cursor: 'pointer',
}

const fileBox = {
    justifyContent: 'center',
    alignItems: 'center',
}

const selectButton = {
    cursor: 'pointer',
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'rgb(234, 234, 234)',
    padding: '3px 6px',
    fontSize: '14px',
}

const saveButton = {
    width: '200px',
    height: '40px',
    border: '1px solid rgba(199, 209, 253, 0.8)',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '5px auto',
    display: 'flex',
}
