import React from 'react'
import { PackItem, ItemRarityColor } from '../../../../components/PackItem'
import { DropTarget } from 'react-dnd';
import { List } from 'immutable';
import { Item, ItemSubTypes, ItemRarities, ItemSubType } from '../../../../types/item';
import './index.scss'
import { Icon } from '../../../../components/Icon';

const itemSelectSidebarTarget = {
    canDrop(props, monitor) {
        const item = monitor.getItem().item
        return !(item.parentId == null)
    },

    drop(props, monitor, component) {
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        itemType: monitor.getItemType(),
    }
}

export const typeIconMap = {
    [ItemSubType.Weapon]: 'battered-axe',
    [ItemSubType.Charm]: 'gem-pendant',
    [ItemSubType.Ring]: 'diamond-ring',
    [ItemSubType.Head]: 'closed-barbute',
    [ItemSubType.Body]: 'leather-vest',
    [ItemSubType.Footwear]: 'leather-boot',
    [ItemSubType.Gloves]: 'gauntlet',
}

interface ItemSelectSidebarState {
    filters: List<any>
}
export class ItemSelectSidebar extends React.Component {
    props: any
    state: ItemSelectSidebarState

    constructor(props: any) {
        super(props)
        this.state = {
            filters: List<any>()
        }
    }

    applyFilters(list: List<Item>, filters: List<any>): List<Item> {
        filters.forEach(filter => {
            list = list.filter(item => item[filter.key] === filter.value)
        })
        return list
            .filter(item => {
                return (!this.props.party.characterItems.map(i => i.__uuid).contains(item.__uuid))
            })
            .sort((a, b) => {
                const av = a.stats.armor || a.stats.power
                const bv = b.stats.armor || b.stats.power
                return bv - av
            })
    }

    resetFilters() {
        this.setState({ filters: List<any>() })
    }

    addFilter(key: string, value: any) {
        this.setState({
            filters: List([{key, value}])
        })
    }

    render() { 
        const { items } = this.props
        const iconSize = 35
        return this.props.connectDropTarget(
            <div className='ItemSelectSidebar'>
                <div style={{display: 'flex', flexWrap: 'wrap', padding: '8px 0', borderBottom: '1px solid black'}}>
                    <button onClick={() => this.resetFilters()}><Icon style={{margin: '0 auto'}} icon='duration' size={42} fill={'rgba(255,255,255,0.54)'} /></button>
                    {ItemRarities.map(rarity => 
                        <button key={rarity} className={this.state.filters.map(f => f.value).contains(rarity) ? 'active' : ''} disabled={items.filter(item => item.rarity === rarity).size === 0} onClick={() => this.addFilter('rarity', rarity)}>
                            <div style={{margin: '0 auto', height: iconSize - 2, width: iconSize - 2, border: '1px solid black', background: ItemRarityColor[rarity]}}></div>
                        </button>
                    )}
                    {ItemSubTypes.map(type => 
                        <button key={type} className={this.state.filters.map(f => f.value).contains(type) ? 'active' : ''} disabled={(items.filter(item => item.subType === type).size === 0)} onClick={() => this.addFilter('subType', type)}>
                            <Icon style={{margin: '0 auto'}} icon={typeIconMap[type]} size={iconSize} fill={'rgba(255,255,255,0.54)'} />
                        </button>
                    )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', flex: 1, overflowY: 'auto', maxHeight: '100%', background: 'rgba(255,255,255,0.12)' }}>
                    {this.applyFilters(items, this.state.filters).map(w => (
                        <div key={w.__uuid} className='Pack_Item'>
                            <PackItem item={w} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default (DropTarget('PackItem', itemSelectSidebarTarget, collect)(ItemSelectSidebar))
