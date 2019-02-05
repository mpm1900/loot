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
    return (
        <div className='CharacterSelectSidebar'>
            <CharacterDropTarget>
                <div style={{padding: 4 }}>{characters.map((character, i) => (
                    <div key={character.__uuid} style={{display: 'flex', flexDirection: 'column', marginBottom: 0}}>
                        <EquipItemDropTarget character={character}>
                            <div style={{display: 'flex', width: '100%'}}>
                                <CharacterAvatar 
                                    key={character.__uuid} 
                                    index={i}
                                    character={character}
                                    activeCharacterId={activeCharacterId} 
                                    partyUpdateActiveCharacterId={partyUpdateActiveCharacterId}
                                    partySwapCharacters={partySwapCharacters}
                                />
                            </div>
                        </EquipItemDropTarget>
                    </div>
                ))}</div>
            </CharacterDropTarget>
            <div style={{ flex: 1 }}>
            </div>
        </div>
        )
}

export default withRouter(CharacterSelectSidebar)