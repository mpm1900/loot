import React, { CSSProperties } from 'react'
import { getTypeGradientCSS } from '../../../../PartyLoadout.utils'
import { Character } from '../../../../../../types/character'
import { DropTarget, DragSource } from 'react-dnd'
import { characterAvatarTarget } from './drop-target'
import { characterAvatarSource } from './drop-source'
import './index.scss'

interface CharacterAvatarPropTypes {
    character: Character, 
    activeCharacterId?: string, 
    partyUpdateActiveCharacterId?: any,
    index?: number,
    partyMoveCharacter?: any,
    connectDropTarget?: any,
    connectDragSource?: any,
    size?: number,
    reverse?: boolean,
    viewOnly?: boolean,
}

export const CharacterAvatar = (props: CharacterAvatarPropTypes) => {
    let { character, activeCharacterId, partyUpdateActiveCharacterId, connectDragSource, connectDropTarget, reverse, viewOnly } = props
    const pure = ((cmp) => cmp) 
    connectDragSource = viewOnly ? pure : connectDragSource || pure
    connectDropTarget = viewOnly ? pure : connectDropTarget || pure

    const borderStyle = {
        border: '1px solid black',
        boxSizing: 'border-box',
        height: 'calc(100% - 1px)',
        width: '100%',
        display: 'flex'
    }

    const avatarStyle = {
        background: getTypeGradientCSS(character),
        opacity: (activeCharacterId === character.__uuid) ? 1 : 0.4,
    }

    const handleClick = () => {
        if (partyUpdateActiveCharacterId && activeCharacterId !== character.__uuid) 
            partyUpdateActiveCharacterId(character.__uuid)
    }

    const contentStyle = {
        backgroundImage: `url(${character.avatar || character.image})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        zIndex: 3
    }

    return connectDragSource(connectDropTarget(
        <div className='CharacterAvavatarBorder' style={borderStyle as CSSProperties}>
            <div className='CharacterAvatar' onClick={handleClick} style={avatarStyle}>
                <div className={'CharacterAvatar__content' + (reverse ? ' reverse' : '')} style={contentStyle}></div>
            </div>
        </div>
    ))
}

export default DropTarget('CharacterAvatar', characterAvatarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource('CharacterAvatar', characterAvatarSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(CharacterAvatar)
)