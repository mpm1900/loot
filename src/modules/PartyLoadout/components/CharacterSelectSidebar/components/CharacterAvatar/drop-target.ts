import { findDOMNode } from "react-dom";

export const characterAvatarTarget = {
    hover(props, monitor, component) {
        /*
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        
        if (dragIndex === hoverIndex) return

        const hoverBoundingRect = (findDOMNode(component) as Element).getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
        props.partyMoveCharacter(dragIndex, hoverIndex)
        */
    },

    drop(props, monitor) {
        const item = monitor.getItem()
        if (item.index !== props.index) {
            props.partySwapCharacters(item.index, props.index)
        }
    }
}