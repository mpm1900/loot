import React from 'react'
import Item from '../Item'
import { EquipItemDropTarget } from './components/EquipItemDropTarget'
import { ItemSubType } from '../../../types/item'
import './index.scss'

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
            <div>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Weapon}>
                    <div className='PackCharacterItemList__weapon'>{character.weapon ? 
                        <Item item={character.withStaticModifiers().weapon} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
            </div>
            <div>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Charm}>
                    <div className='PackCharacterItemList__charm'>{character.charm ? 
                        <Item item={character.withStaticModifiers().charm} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Ring}>
                    <div className='PackCharacterItemList__ring'>{character.ring ? 
                        <Item item={character.withStaticModifiers().ring} source={character} showDescription={true}/>: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
            </div>
            <div>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Head}>   
                    <div className='PackCharacterItemList__head'>{character.head ? 
                        <Item item={character.withStaticModifiers().head} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Body}>
                <div className='PackCharacterItemList__body'>{character.body ? 
                        <Item item={character.withStaticModifiers().body} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
            </div>
            <div>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Footwear}>
                    <div className='PackCharacterItemList__footwear'>{character.footwear ? 
                        <Item item={character.withStaticModifiers().footwear} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
                <EquipItemDropTarget character={character} itemType={ItemSubType.Gloves}>
                    <div className='PackCharacterItemList__gloves'>{character.gloves ? 
                        <Item item={character.withStaticModifiers().gloves} source={character} showDescription={true} />: 
                        <div style={fillerStyle}></div>
                    }</div>
                </EquipItemDropTarget>
            </div>
        </div>
    )
}