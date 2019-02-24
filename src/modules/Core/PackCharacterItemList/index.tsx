import React from 'react'
import ItemComponent from '../Item'
import { EquipItemDropTarget } from './components/EquipItemDropTarget'
import { ItemSubType, Item } from '../../../types/item'
import { Character } from '../../../types/character'
import './index.scss'

const itemTypes = [ItemSubType.Weapon, ItemSubType.Charm, ItemSubType.Ring, ItemSubType.Head, ItemSubType.Body, ItemSubType.Footwear, ItemSubType.Gloves]
const getItem = (type: ItemSubType, character: Character): Item => {
    character = character.withStaticModifiers()
    switch(type) {
        case ItemSubType.Weapon: return character.weapon
        case ItemSubType.Charm: return character.charm
        case ItemSubType.Ring: return character.ring
        case ItemSubType.Head: return character.head
        case ItemSubType.Body: return character.body
        case ItemSubType.Footwear: return character.footwear
        case ItemSubType.Gloves: return character.gloves
        default: return null
    }
}

type CharacterItemListProps = {
    character: any,
}
export const CharacterItemList = (props: CharacterItemListProps) => {
    const { character } = props
    const fillerStyle = {
        margin: 4,
        backgroundColor: 'rgba(255,255,255,0.12)',
        border: '1px dashed rgba(255,255,255,0.24)',
        height: 'calc(100% - 8px)', 
        width: 'calc(100% - 8px)',
        boxShadow: '0px 0px 2px rgba(0,0,0,1) inset',
    }
    return (
        <div className='PackCharacterItemList'>
            {itemTypes.map(type => (
                <div style={{ width: type === ItemSubType.Weapon ? '100%' : '50%'}}>
                    <EquipItemDropTarget character={character} itemType={type}>
                        <div className='PackCharacterItemList__weapon'>
                            {getItem(type, character) ? 
                                <ItemComponent item={getItem(type, character)} source={character} showDescription={true} />: 
                                <div style={fillerStyle}></div>
                            }
                        </div>
                    </EquipItemDropTarget>
                </div>
            ))}
        </div>
    )
}