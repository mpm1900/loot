import React, { Component } from 'react'
import { getTypeGradientCSS } from '../../../../PartyLoadout.utils';
import { Character } from '../../../../../../types/character';
import { EquipItemDropTarget } from '../../../../../../components/PackCharacterItemList/components/EquipItemDropTarget';
import './index.scss'
import { DropTarget, DragSource } from 'react-dnd';
import { characterAvatarTarget } from './drop-target';
import { connect } from 'http2';
import { characterAvatarSource } from './drop-source';

interface CharacterAvatarPropTypes {
    character: Character, 
    activeCharacterId?: string, 
    partyUpdateActiveCharacterId?: any,
    index?: number,
    partyMoveCharacter?: any,
    connectDropTarget?: any,
    connectDragSource?: any,
}
export class CharacterAvatar extends Component {
    props: CharacterAvatarPropTypes

    constructor(props: CharacterAvatarPropTypes) {
        super(props)
    }

    render() {
        const { character, activeCharacterId, partyUpdateActiveCharacterId, connectDragSource, connectDropTarget } = this.props
        return connectDragSource(connectDropTarget(
            <div className='CharacterAvatar' onClick={() => partyUpdateActiveCharacterId && activeCharacterId !== character.__uuid ? partyUpdateActiveCharacterId(character.__uuid) : null} style={{
                background: getTypeGradientCSS(character),
                opacity: (activeCharacterId === character.__uuid) ? 1 : 0.4,
            }}>
                <div className='CharacterAvatar__content' style={{
                    backgroundImage: `url(${character.avatar || character.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPositionX: 'center',
                    zIndex: 3
                }}></div>
            </div>
        ))
    }
}

export default DropTarget('Character', characterAvatarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource('Character', characterAvatarSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(CharacterAvatar))