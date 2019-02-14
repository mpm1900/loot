import React, { useState } from 'react'
import { PackItem, ItemRarityColor } from '../../../Core/PackItem'
import { DropTarget } from 'react-dnd'
import { List } from 'immutable'
import { Item, ItemSubTypes, ItemRarities, ItemSubType } from '../../../../types/item'
import { Icon } from '../../../Core/Icon'
import './index.scss'

const itemSelectSidebarTarget = {
    canDrop(props, monitor) {
        const item = monitor.getItem().item
        return !(item.parentId == null)
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

export const ItemSelectSidebar = (props) =>  {
    const { items, party, connectDropTarget = ((cmp) => cmp) } = props
    const [ filters, setFilters ] = useState(List<any>())
    const iconSize = 35

    const applyFilters = (list: List<Item>, filters: List<any>): List<Item> => {
        filters.forEach(filter => {
            list = list.filter(item => item[filter.key] === filter.value)
        })
        return list
            .filter(item => !(party.characterItems.map(i => i.__uuid).contains(item.__uuid)))
            .sort((a, b) => {
                const av = a.stats.armor || a.stats.power
                const bv = b.stats.armor || b.stats.power
                return bv - av
            })
    }

    const resetFilters = () => {
        setFilters(List<any>())
    }

    const addFilter = (key: string, value: any) => {
        setFilters(List([{key, value}]))
    }

    const disabledRarity = rarity => items.filter(item => item.rarity === rarity).size === 0
    const classNameRarity = rarity => filters.map(f => f.value).contains(rarity) ? 'active' : ''
    const disabledType = type => items.filter(item => item.subType === type).size === 0
    const classNameType = type => filters.map(f => f.value).contains(type) ? 'active' : ''

    return connectDropTarget(
        <div className='ItemSelectSidebar'>
            <div className='ItemSelectSidebar__header'>
                <div>
                    <button onClick={() => resetFilters()}>
                        <div>
                            <Icon style={{margin: '0 auto'}} icon='duration' size={42} fill={'rgba(255,255,255,0.54)'} />
                        </div>
                    </button>
                </div>
                {ItemRarities.map(rarity => <div>
                    <button key={rarity} className={classNameRarity(rarity)} disabled={disabledRarity(rarity)} onClick={() => addFilter('rarity', rarity)}>
                        <div style={{ background: ItemRarityColor[rarity]}}></div>
                    </button>
                </div>)}
                {ItemSubTypes.map(type => <div>
                    <button key={type} className={classNameType(type)} disabled={disabledType(type)} onClick={() => addFilter('subType', type)}>
                        <div>
                            <Icon style={{margin: '0 auto'}} icon={typeIconMap[type]} size={iconSize} fill={'rgba(255,255,255,0.42)'} />
                        </div>
                    </button>
                </div>)}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 0px)', flex: 1, padding: 0, overflowY: 'auto', maxHeight: '100%', background: 'rgba(0,0,0,0.24)' }}>
                {applyFilters(items, filters).map(w => (
                    <div key={w.__uuid} className='Pack_Item'>
                        <PackItem item={w} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropTarget('PackItem', itemSelectSidebarTarget, collect)(ItemSelectSidebar)
