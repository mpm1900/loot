import React from 'react'
import * as Dnd from 'react-dnd'

const dragSourceSource = {
    beginDrag(props) {
        return {
            text: props.text
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DragSource extends React.Component {
    render() {
        return (
            <div style={{height: 100, width: 100, backgroundColor: 'gold'}}></div>
        )
    }
}

export default Dnd.DragSource('DragSource', dragSourceSource, collect)(DragSource)