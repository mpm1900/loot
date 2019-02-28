import React from 'react'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable'
import { Character } from '../../../../types/character'
import { EquipItemDropTarget } from '../../../Core/PackCharacterItemList/components/EquipItemDropTarget'
import CharacterDropTarget from './drop-target'
import './index.scss'

interface CharacterSelectPropTypes {
    characters: List<Character>, 
    activeCharacterId: string, 
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    partyAddCharacter: any,
    characterLimit: number,
    history?: any,
    isModal?: boolean,
    viewOnly?: boolean,
}

const ItemDropTarget = ({ character, children, viewOnly }) => (
    viewOnly ?  
        children: 
        <EquipItemDropTarget character={character}>{children}</EquipItemDropTarget>
)

const HeroDropTarget = ({ children, characters, characterLimit, partyAddCharacter, viewOnly }) => (
    viewOnly ?
        children:
        <CharacterDropTarget partyAddCharacter={partyAddCharacter} characters={characters} characterLimit={characterLimit}>{children}</CharacterDropTarget>
)

const CharacterSelect = (props: CharacterSelectPropTypes) => {
    const size = 120
    const { characters, activeCharacterId, partyUpdateActiveCharacterId, partySwapCharacters, partyAddCharacter, characterLimit, viewOnly = false } = props
    const charactersStyle = { padding: 0, width: '100%', height: 'calc(100% - 8px)', minHeight: size + 1, display: 'flex' }
    const characterStyle = { display: 'flex', height: size, width: '16.67%' }

    return (
        <div className='CharacterSelect'>
            <HeroDropTarget characters={characters} characterLimit={characterLimit} partyAddCharacter={partyAddCharacter} viewOnly={viewOnly}>
                <div style={charactersStyle}>
                    {characters.map((character, i) => (
                        <ItemDropTarget key={character.__uuid} character={character} viewOnly={viewOnly}>
                            <div style={characterStyle}>
                                <CharacterAvatar 
                                    size={size}
                                    index={i}
                                    character={character}
                                    activeCharacterId={activeCharacterId} 
                                    partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                                    partySwapCharacters={partySwapCharacters}
                                    viewOnly={viewOnly}
                                />
                            </div>
                        </ItemDropTarget>
                    ))}
                    {characters.size === 6 ? 
                        null : 
                        <div className='CharacterSelect__helper'>
                            + Heros to your party
                        </div>
                    }
                </div>
            </HeroDropTarget>
        </div>
    )
}
export default CharacterSelect