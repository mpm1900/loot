import React from 'react'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable'
import { Character } from '../../../../types/character'
import { EquipItemDropTarget } from '../../../../components/PackCharacterItemList/components/EquipItemDropTarget'
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
    const { characters, activeCharacterId, partyUpdateActiveCharacterId, partySwapCharacters, partyAddCharacter, characterLimit } = props
    const size = 120
    return (
        <div className='CharacterSelectSidebar'>
            <CharacterDropTarget partyAddCharacter={partyAddCharacter} characters={characters} characterLimit={characterLimit} >
                <div style={{padding: 0, width: '100%', height: 'calc(100% - 8px)', minHeight: 121, display: 'flex' }}>{characters.map((character, i) => (
                    <EquipItemDropTarget key={character.__uuid} character={character}>
                        <div style={{display: 'flex', height: size, width: '16.67%'}}>
                            <CharacterAvatar 
                                key={character.__uuid} 
                                size={size}
                                index={i}
                                character={character}
                                activeCharacterId={activeCharacterId} 
                                partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                                partySwapCharacters={partySwapCharacters}
                            />
                        </div>
                    </EquipItemDropTarget>
                ))}</div>
            </CharacterDropTarget>
        </div>
    )
}
export default CharacterSelectSidebar