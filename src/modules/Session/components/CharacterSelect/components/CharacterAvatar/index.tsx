import React, { Component } from 'react'
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
}
export class CharacterAvatar extends Component {
    props: CharacterAvatarPropTypes

    constructor(props: CharacterAvatarPropTypes) {
        super(props)
    }

    render() {
        let { character, activeCharacterId, partyUpdateActiveCharacterId, connectDragSource, connectDropTarget, reverse } = this.props
        connectDragSource = connectDragSource || ((cmp) => cmp) 
        connectDropTarget = connectDropTarget || ((cmp) => cmp) 
        return connectDragSource(connectDropTarget(
            <div className='CharacterAvavatarBorder' style={{border: '1px solid black', boxSizing: 'border-box', height: 'calc(100% - 1px)', width: '100%', display: 'flex'}}>
                <div className='CharacterAvatar' onClick={() => partyUpdateActiveCharacterId && activeCharacterId !== character.__uuid ? partyUpdateActiveCharacterId(character.__uuid) : null} style={{
                    background: getTypeGradientCSS(character),
                    opacity: (activeCharacterId === character.__uuid) ? 1 : 0.4,
                }}>
                    <div className={'CharacterAvatar__content' + (reverse ? ' reverse' : '')} style={{
                        backgroundImage: `url(${character.avatar || character.image})`, 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPositionX: 'center',
                        zIndex: 3
                    }}></div>
                </div>
            </div>
        ))
    }
}

export default DropTarget('CharacterAvatar', characterAvatarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource('CharacterAvatar', characterAvatarSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(CharacterAvatar))