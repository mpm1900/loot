import React from 'react'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable'
import { Character } from '../../../../types/character'
import { withRouter } from 'react-router-dom'
import { EquipItemDropTarget } from '../../../../components/PackCharacterItemList/components/EquipItemDropTarget'
import CharacterDropTarget from './drop-target'
import './index.scss'

interface CharacterSelectSidebarPropTypes {
    characters: List<Character>, 
    activeCharacterId: string, 
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    history: any,
    isModal: boolean,
}

const CharacterSelectSidebar = (props: CharacterSelectSidebarPropTypes) => {
    const { characters, activeCharacterId, partyUpdateActiveCharacterId, partySwapCharacters } = props
    const size = 120
    return (
        <div className='CharacterSelectSidebar'>
            <CharacterDropTarget>
                <div style={{padding: 0, width: '100%', height: 'calc(100% - 8px)', display: 'flex' }}>{characters.map((character, i) => (
                    <EquipItemDropTarget key={character.__uuid} character={character}>
                        <div style={{display: 'flex', height: size, width: '20%'}}>
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

export default withRouter(CharacterSelectSidebar)