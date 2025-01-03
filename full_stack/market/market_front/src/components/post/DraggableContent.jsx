function DraggableContent({ item, index, moveItem, addTextField }) {
    const ref = React.useRef()

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index)
                draggedItem.index = index
            }
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
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
                cursor: 'move',
                marginBottom: '10px',
            }}>
            {item.type === 'image' && (
                <div>
                    <img src={item.src} alt="Uploaded" style={styles.image} onDoubleClick={() => addTextField(index)} />
                </div>
            )}
            {item.type === 'text' && <textarea value={item.text} onChange={(e) => (item.text = e.target.value)} placeholder="Enter your text here" style={styles.textField} />}
        </div>
    )
}

export default DraggableContent