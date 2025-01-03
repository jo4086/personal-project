import React, { useRef, useState } from 'react'
import { TextField } from '../../styles/myUi'

const DynamicTextField = ({ value, onChange }) => {
    const [rows, setRows] = useState(1)
    const textareaRef = useRef(null)

    const handleChange = (event) => {
        const textareaLineHeight = 24 // 줄 높이
        const textarea = textareaRef.current
        const previousRows = textarea.rows

        textarea.rows = 1 // 높이 초기화
        const currentRows = Math.floor(textarea.scrollHeight / textareaLineHeight)

        if (currentRows === previousRows) {
            textarea.rows = currentRows
        }

        setRows(currentRows > 30 ? 30 : currentRows) // 최대 줄 수 제한
        onChange(event.target.value) // 부모로 변경된 값 전달
    }

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            rows={rows}
            style={{
                resize: 'none',
                overflow: 'hidden',
                lineHeight: '24px',
                height: `${rows * 24}px`,
                width: '100%',
                outline: 'none',
                border: ' none',
                margin: '5px 0',
            }}
        />
    )
}

export default DynamicTextField

const sty = {
    outline: 'none',
}
