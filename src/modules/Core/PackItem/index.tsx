import React, { CSSProperties } from 'react'
import { DragSource } from 'react-dnd'
import { Icon } from '../Icon'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ItemSubType, ItemWeaponType, ItemRarity } from '../../../types/item'
import { TypeChip } from '../TypeChip'
import { partyUpdateCharacter } from '../../../state/actions/session.actions'
import './index.scss'

const TypeIconTable = {
    [ItemSubType.Charm]: 'gem-pendant',
    [ItemSubType.Ring]: 'diamond-ring',
    [ItemSubType.Head]: 'closed-barbute',
    [ItemSubType.Body]: 'leather-vest',
    [ItemSubType.Footwear]: 'leather-boot',
    [ItemSubType.Gloves]: 'gauntlet',
    [ItemWeaponType.Greatsword]: 'relic-blade',
    [ItemWeaponType.Longsword]: 'gladius',
}

export const ItemRarityColor = {
    [ItemRarity.Common]: '#f2f2f2',
    [ItemRarity.Uncommon]: '#4a6741',
    [ItemRarity.Rare]: '#3A5894',
    [ItemRarity.Masterwork]: '#380474',
    [ItemRarity.Unique]: 'rgb(134, 90, 7)',
    [ItemRarity.BlackMarket]: 'black'
}

const packItemSource = {
    beginDrag(props, monitor, component) {
        return {
            ...props
        }
    },

    endDrag(props, monitor, component) {
        if (monitor.didDrop()) {
            const item = monitor.getItem().item
            if (props.source) {
                props.partyUpdateCharacter(props.source.removeItem(item.subType))
            }
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

export const EquipItem = (props: any) => {
    const { item, isDragging, connectDragSource = (() => null), showDescription = true } = props
    const borderStyle = {border: '1px solid black', boxSizing: 'border-box', height: '100%' }
    const nameStyle = {width: '100%', fontSize: '18px', height: '24px', textShadow: '1px 1px 1px rgba(0,0,0,0.4)' }
    const elementsStyle = {padding: '8px 0', marginLeft: 8, display: 'flex', height: 38, lineHeight: '38px', justifyContent: 'space-evenly'}
    const weaponStatsStyle = {display: 'flex', lineHeight: '24px', minHeight: '24px', flex: 1}
    
    return connectDragSource(
        <div style={borderStyle as CSSProperties}>
            <div className={"PackItem PackItem__rarity--" + item.rarity} style={{opacity: isDragging ? 0.5 : 1}}>
                <div style={nameStyle}>
                    <strong>{item.name}</strong>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="PackItem__stats--power">
                        {item.stats.power || item.stats.armor}
                        <div style={{padding: '2px 4px 2px 12px'}}>
                            <Icon icon={TypeIconTable[item.subType === ItemSubType.Weapon ? item.weaponType : item.subType]} 
                                fill={'white'} 
                                size={30} 
                            />
                        </div>
                    </div>
                    {item.subType === ItemSubType.Weapon ? 
                        <div style={elementsStyle}>
                            { item.elements ? 
                                item.elements.map(element =>
                                    <TypeChip size={24} key={element.__uuid} typeString={element.type} power={element.power} fill={'white'} style={{marginRight: 16}} />
                                ): 
                                null 
                            }
                        </div>: 
                        showDescription ? 
                            <div style={{lineHeight: 1.5, paddingTop: 10, fontWeight: 'bold'}}>{item.description}</div> : 
                            null 
                    }
                </div>
                {item.subType === ItemSubType.Weapon ? 
                    <div style={weaponStatsStyle}>
                        <div className="StatChip">
                            <Icon icon='crosshair' fill='white' size={24} />
                            <span style={{marginLeft: 4, fontSize: 18}}>{Math.round(item.stats.accuracy * 100)}%</span>
                        </div>
                        <div className="StatChip">
                            <Icon icon='lightning-bow' fill='white' size={24} />
                            <span style={{marginLeft: 4, fontSize: 18}}>{Math.round(item.stats.affinity * 100)}%</span>
                        </div>
                        <div className="StatChip">
                            <Icon icon='spiky-explosion' fill='white' size={24} />
                            <span style={{marginLeft: 4, fontSize: 18}}>{Math.round(item.stats.criticalRatio * 100)}%</span>
                        </div>
                    </div>:
                    null
                }
                <div style={{flex: 1}}></div>
                {/* item.modifiers && item.modifiers.size > 0 ? 
                <div className="PackItem__modifiers">
                    { item.modifiers.map(mod => (
                        <div key={mod.__uuid} className={"PackItem__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                    )) }
                    { item.triggers && item.triggers.size > 0 ? 
                        <div style={{
                            paddingTop: 8,
                            marginTop: 8,
                            borderTop: '1px solid rgba(0,0,0,0.36)'
                        }}>{ item.triggers.map(trigger => (
                            <div key={trigger.__uuid} className={"PackItem__modifier--" + (trigger.buff ? 'buff' : 'debuff')}>({(trigger.chance * 100).toFixed()}%) {trigger.description}</div>
                        )) }</div>: 
                        null 
                    }
                </div>: null */}
                {<div style={{ display: 'flex' }}>
                    { item.modifiers && item.modifiers.size > 0 ? 
                    <div className="PackItem__modifiers" style={{marginRight: item.triggers.size > 0 ? 4 : 0}}>
                        { item.modifiers.map(mod => (
                            <div key={mod.__uuid} className={"PackItem__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                        )) }
                    </div>: null }
                    { item.triggers && item.triggers.size > 0 ? 
                        <div className="PackItem__modifiers">
                            {item.triggers.map(trigger => (
                                <div key={trigger.__uuid} className={"PackItem__modifier--" + (trigger.buff ? 'buff' : 'debuff')}>
                                    ({(trigger.chance * 100).toFixed()}%) {trigger.description}
                                </div>
                            ))}
                        </div>: 
                        null 
                    }
                </div>}
                <div style={{flex: 1}}></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        partyUpdateCharacter
    }, dispatch)
}
const PackItemType = 'PackItem';
export const PackItem = connect(mapStateToProps, mapDispatchToProps)(DragSource(PackItemType, packItemSource, collect)(EquipItem))