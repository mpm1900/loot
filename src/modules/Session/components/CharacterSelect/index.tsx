import React from 'react'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable'
import { Character } from '../../../../types/character'
import { EquipItemDropTarget } from '../../../Core/PackCharacterItemList/components/EquipItemDropTarget'
import CharacterDropTarget from './drop-target'
import './index.scss'

interface CharacterSelectSidebarPropTypes {
    characters: List<Character>, 
    activeCharacterId: string, 
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    partyAddCharacter: any,
    characterLimit: number,
    history?: any,
    isModal?: boolean,
}

const CharacterSelectSidebar = (props: CharacterSelectSidebarPropTypes) => {
    const size = 120
    const { characters, activeCharacterId, partyUpdateActiveCharacterId, partySwapCharacters, partyAddCharacter, characterLimit } = props
    const charactersStyle = { padding: 0, width: '100%', height: 'calc(100% - 8px)', minHeight: size + 1, display: 'flex' }
    const characterStyle = { display: 'flex', height: size, width: '16.67%' }
    return (
        <div className='CharacterSelect'>
            <CharacterDropTarget partyAddCharacter={partyAddCharacter} characters={characters} characterLimit={characterLimit}>
                <div style={charactersStyle}>{characters.map((character, i) => (
                    <EquipItemDropTarget key={character.__uuid} character={character}>
                        <div style={characterStyle}>
                            <CharacterAvatar 
                                size={size}
                                index={i}
                                character={character}
                                activeCharacterId={activeCharacterId} 
                                partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                                partySwapCharacters={partySwapCharacters}
                            />
                        </div>
                    </EquipItemDropTarget>
                ))}{characters.size === 6 ? null : <div className='CharacterSelect__helper'></div>}</div>
            </CharacterDropTarget>
        </div>
    )
}
export default CharacterSelectSidebar