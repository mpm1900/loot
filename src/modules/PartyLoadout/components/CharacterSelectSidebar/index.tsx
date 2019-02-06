import React from 'react'
import './index.scss'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable';
import { Character } from '../../../../types/character';
import { ItemRarity } from '../../../../types/item';
import { withRouter } from 'react-router-dom'
import { EquipItemDropTarget } from '../../../../components/PackCharacterItemList/components/EquipItemDropTarget';
import { Button } from '../../../../components/Button';
import CharacterDropTarget from './drop-target'

interface CharacterSelectSidebarPropTypes {
    characters: List<Character>, 
    activeCharacterId: string, 
    partyUpdateActiveCharacterId: any,
    partySwapCharacters: any,
    history: any,
    isModal: boolean,
}

const rarityColors = {
    [ItemRarity.Default]:'white',
    [ItemRarity.Common]: 'white',
    [ItemRarity.Uncommon]: 'white',
    [ItemRarity.Rare]: 'white',
    [ItemRarity.Masterwork]: 'white',
    [ItemRarity.Unique]: 'white',
    [ItemRarity.BlackMarket]: 'white'
}

const CharacterSelectSidebar = (props: CharacterSelectSidebarPropTypes) => {
    const { characters, activeCharacterId, partyUpdateActiveCharacterId, partySwapCharacters } = props
    const onMove = (...args) => {
        console.log(args)
    }
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