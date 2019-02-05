import React from 'react'
import { DropTarget } from 'react-dnd'
import { render } from 'react-dom';

class CharacterDropTarget extends React.Component {
    props: any


    render() {
        return this.props.children
    }
}

const characterDropTargetTarget = {
    drop(props, monitor, component) {
        const sourceObject = monitor.getItem()
        console.log('source', sourceObject)
        console.log('props', props)
    }
}

export default DropTarget('Character', characterDropTargetTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(CharacterDropTarget)