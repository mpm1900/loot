import React, { Component } from 'react'
import { getTypeGradientCSS } from '../../../../PartyLoadout.utils';
import { Character } from '../../../../../../types/character';
import { EquipItemDropTarget } from '../../../../../../components/PackCharacterItemList/components/EquipItemDropTarget';
import './index.scss'

interface CharacterAvatarPropTypes {
    character: Character, 
    activeCharacterId?: string, 
    partyUpdateActiveCharacterId?: any,
}
export class CharacterAvatar extends Component {
    props: CharacterAvatarPropTypes

    constructor(props: CharacterAvatarPropTypes) {
        super(props)
    }

    render() {
        const { character, activeCharacterId, partyUpdateActiveCharacterId } = this.props
        return (
            <div className='CharacterAvatar' onClick={() => partyUpdateActiveCharacterId && activeCharacterId !== character.__uuid ? partyUpdateActiveCharacterId(character.__uuid) : null} style={{
                background: getTypeGradientCSS(character),
                opacity: (activeCharacterId === character.__uuid) ? 1 : 0.5,
            }}>
                <div className='CharacterAvatar__content' style={{
                    backgroundImage: `url(${character.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPositionX: 'center',
                    zIndex: 3
                }}>
                    
                </div>
            </div>
        )
    }
}

export default CharacterAvatar