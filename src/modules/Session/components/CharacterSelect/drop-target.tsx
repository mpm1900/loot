import React from 'react'
import { DropTarget } from 'react-dnd'
import { render } from 'react-dom';

const CharacterDropTarget = (props) => {
    const { children, connectDropTarget } = props
    return connectDropTarget(children)
}

const characterDropTargetTarget = {
    canDrop(props) {
        return props.characters.size < props.characterLimit
    },
    drop(props, monitor, component) {
        const sourceObject = monitor.getItem()
        props.partyAddCharacter(sourceObject.id)
    }
}

export default DropTarget('CharacterChip', characterDropTargetTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(CharacterDropTarget)