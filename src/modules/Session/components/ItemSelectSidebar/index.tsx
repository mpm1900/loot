import React, { useState, CSSProperties } from 'react'
import ItemComponent, { ItemRarityColor } from '../../../Core/Item'
import { DropTarget } from 'react-dnd'
import { List } from 'immutable'
import { Item, ItemSubTypes, ItemRarities, ItemSubType, ItemRarity } from '../../../../types/item'
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
    const [ showHover, setShowHover ] = useState(false)
    const [ hoverItem, setHoverItem ] = useState(null)
    const [ hoverY, setHoverY ] = useState(0)
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
    const getItemBg = (i: Item): string => {
        switch (i.rarity) {
            case ItemRarity.Uncommon: return 'hsl(106, 23%, 33%)'
            case ItemRarity.Rare: return 'hsl(220, 44%, 40%)'
            case ItemRarity.Masterwork: return 'hsl(268, 45%, 30%)'
            case ItemRarity.Unique: return 'hsl(40, 100%, 30%)'
            case ItemRarity.BlackMarket: return '#222'
        }
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100% ',
        height: 'calc(100vh - 224px)',
        flex: 1, padding: 0, overflowY: 'auto',
        maxHeight: '100%',
        background: 'rgba(0,0,0,0.24)'
    }

    const iconStyle = { margin: '0 auto' }

    return connectDropTarget(
        <div className='ItemSelectSidebar'>
            <div className='ItemSelectSidebar__header'>
                <div>
                    <button onClick={() => resetFilters()}>
                        <div>
                            <Icon style={iconStyle} icon='duration' size={42} fill={'rgba(255,255,255,0.54)'} />
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
                            <Icon style={iconStyle} icon={typeIconMap[type]} size={iconSize} fill={'rgba(255,255,255,0.42)'} />
                        </div>
                    </button>
                </div>)}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={style as CSSProperties}>
                    {applyFilters(items, filters).map(w => (
                        <div key={w.__uuid} className='Item'>
                            <ItemComponent item={w} />
                        </div>
                    ))}
                </div>
                <div style={{ width: 32, display: 'flex', flexDirection: 'column', border: '1px solid black', boxSizing: 'border-box', height: 'calc(100% - 1px)' }} onMouseEnter={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)}>
                    {applyFilters(items, filters).map(w => (
                        <div onMouseEnter={(event) => {
                            const bottom = window.innerHeight - ((event.target as any).offsetTop + 50)
                            setHoverItem(w)
                            setHoverY(bottom < 0 ? 1 : bottom)
                        }} style={{ width: '100%', backgroundColor: getItemBg(w), height: '100%', border: '1px solid rgba(255,255,255,0.32)', borderBottom: 'none', boxSizing: 'border-box' }}></div>
                    ))}
                    { hoverY !== 0 && showHover ? <div style={{position: 'absolute', bottom: hoverY, right: 32, width: 360, background: 'white' }}>
                        {(hoverItem) ? <ItemComponent item={hoverItem} /> : null }
                    </div> : null }
                </div>
            </div>
        </div>
    )
}

export default DropTarget('PackItem', itemSelectSidebarTarget, collect)(ItemSelectSidebar)