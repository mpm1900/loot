import { Choose } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorStats } from '../../stats'
import { getArmorModifiers } from '../../../objects/modifiers'
import { getArmorName } from '../../../objects/names'

export const UncommonCharm = (level: number) => (Choose(List([
    _UncommonCharm(level),
]), 1)).first()

export const _UncommonCharm = (level: number) => {
    const rarity = ItemRarity.Uncommon
    const subType = ItemSubType.Charm
    const stats = new ItemStats(getArmorStats(rarity, subType))
    const name = getArmorName(rarity, subType)
    const modifiers = getArmorModifiers(rarity, subType)
    return new Item({
        type: ItemType.Equipable,
        name,
        description: 'Just a less basic charm',
        level,
        subType,
        rarity,
        stats,
        modifiers,
    })
}