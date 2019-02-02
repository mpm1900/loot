import React from 'react'
import { DragSource } from 'react-dnd';
import './index.scss'
import { Icon } from '../Icon';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ItemSubType, ItemWeaponType, ItemRarity } from '../../types/item';
import { TypeChip } from '../TypeChip';
import { partyDeleteItem, partyUpdateCharacter } from '../../state/actions/session.actions';



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
                console.log('endDrag', props)
                props.partyUpdateCharacter(props.source.removeItem(item.subType))
            } else {
                props.partyDeleteItem(item.__uuid)
            }
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

export class _PackItem extends React.Component {

    public props: any

    render() {
        const { item, source = null, isDragging, connectDragSource, showDescription = true } = this.props
        return connectDragSource(
            <div className={"PackItem PackItem__rarity--" + item.rarity} style={{opacity: isDragging ? 0.5 : 1}}>
                <div style={{width: '100%', fontSize: '18px', height: '24px', textShadow: '1px 1px 1px rgba(0,0,0,0.4)' }}><strong>{item.name}</strong></div>
                <div style={{display: 'flex'}}>
                    <div className="PackItem__stats--power">
                        {item.stats.power || item.stats.armor}
                        <div style={{padding: '2px 4px 2px 12px'}}>
                            <Icon icon={TypeIconTable[item.subType === ItemSubType.Weapon ? item.weaponType : item.subType]} fill={item.rarity === ItemRarity.Common ? 'black' : 'white'} size={30} />
                        </div>
                    </div>
                    {item.subType === ItemSubType.Weapon ? <div style={{padding: '8px 0', marginLeft: 8, display: 'flex', height: 38, lineHeight: '38px', justifyContent: 'space-evenly'}}>
                        { item.elements ? item.elements.map(element =>
                            <TypeChip size={24} key={element.__uuid} typeString={element.type} power={element.power} fill={'white'} style={{marginRight: 16}} />
                        ): null }
                        
                    </div> : showDescription ? <div style={{lineHeight: 1.5, paddingTop: 10, fontWeight: 'bold'}}>{item.description}</div> : null }
                </div>
                {item.subType === ItemSubType.Weapon ? <div style={{display: 'flex', lineHeight: '24px', minHeight: '24px', flex: 1}}>
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
                </div> : null }
                { item.modifiers && item.modifiers.size > 0 ? 
                    <div className="PackItem__modifiers">
                        { item.modifiers.map(mod => (
                            <div key={mod.__uuid} className={"PackItem__modifier--" + (mod.buff ? 'buff' : 'debuff')}>{mod.description}</div>
                        )) }
                    </div>: null }
                <div style={{flex: 1}}></div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
        partyDeleteItem,
        partyUpdateCharacter
    }, dispatch)
}

const PackItemType = 'PackItem';
export const PackItem = connect(mapStateToProps, mapDispatchToProps)(DragSource(PackItemType, packItemSource, collect)(_PackItem))