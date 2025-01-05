import React, { useRef, useState, useEffect } from 'react'

const DynamicTextField = ({ value, onChange }) => {
    const [height, setHeight] = useState('auto')
    const textareaRef = useRef(null)
    const hiddenTextareaRef = useRef(null)

    useEffect(() => {
        adjustHeight() // 초기 렌더링 시 높이 조정
    }, [value]) // value 변경 시 재조정

    const adjustHeight = () => {
        const hiddenTextarea = hiddenTextareaRef.current
        const textarea = textareaRef.current

        if (hiddenTextarea) {
            hiddenTextarea.value = textarea.value // 숨겨진 textarea에 값 복사
            hiddenTextarea.style.height = '24px' // 높이 초기화
            const newHeight = hiddenTextarea.scrollHeight // 숨겨진 textarea의 스크롤 높이 계산
            setHeight(`${newHeight}px`) // 새 높이 설정
        }
    }

    const handleChange = (e) => {
        onChange(e.target.value) // 부모 컴포넌트로 변경된 값 전달
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* 숨겨진 textarea */}
            <textarea
                ref={hiddenTextareaRef}
                readOnly
                style={{
                    // visibility: 'hidden',
                    position: 'absolute',
                    overflow: 'hidden',
                    height: '0',
                    zIndex: '-1',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    lineHeight: '24px',
                    width: '100%',
                    padding: '8px',
                    // top: '300px',
                }}
            />
            {/* 실제 사용자의 textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                style={{
                    // visibility: 'hidden',
                    resize: 'none',
                    overflow: 'hidden',
                    height: height, // 동적 높이 적용
                    lineHeight: '24px',
                    width: '100%',
                    outline: 'none',
                    border: '1px solid #ccc',
                    padding: '8px',
                    boxSizing: 'border-box',
                }}
            />
        </div>
    )
}

export default DynamicTextField