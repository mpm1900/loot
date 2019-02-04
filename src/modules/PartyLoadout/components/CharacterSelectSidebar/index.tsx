import React from 'react'
import './index.scss'
import CharacterAvatar from './components/CharacterAvatar'
import { List } from 'immutable';
import { Character } from '../../../../types/character';
import { ItemRarity } from '../../../../types/item';
import { withRouter } from 'react-router-dom'
import { EquipItemDropTarget } from '../../../../components/PackCharacterItemList/components/EquipItemDropTarget';
import { Button } from '../../../../components/Button';


interface CharacterSelectSidebarPropTypes {
    characters: List<Character>, 
    activeCharacterId: string, 
    partyUpdateActiveCharacterId: any,
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
    const { characters, activeCharacterId, partyUpdateActiveCharacterId } = props
    return (
        <div className='CharacterSelectSidebar'>
            <div style={{padding: 4 }}>{characters.map(character => (
                <div key={character.__uuid} style={{display: 'flex', flexDirection: 'column', marginBottom: 0}}>
                    <EquipItemDropTarget character={character}>
                        <div style={{display: 'flex', width: '100%'}}><CharacterAvatar key={character.__uuid} character={character} activeCharacterId={activeCharacterId} partyUpdateActiveCharacterId={partyUpdateActiveCharacterId} /></div>
                    </EquipItemDropTarget>
                    {/*
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div style={{ opacity: character.weapon == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.charm == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.ring == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.head == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.body == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.footwear == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                        <div style={{ opacity: character.gloves == null ? 0.2 : 1 }}><div className='CharacterSelectSidebar__dot'></div></div>
                    </div> */}
                </div>
            ))}</div>
            <div style={{ flex: 1 }}>
            </div>
        </div>
        )
}

export default withRouter(CharacterSelectSidebar)