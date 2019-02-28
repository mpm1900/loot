import { ItemRarity, ItemSubType, Item, ItemType } from '../../types/item'
import { ItemStats } from '../../types/item/item.stats'
import { getArmorStats } from '../stats'
import { getArmorName } from '../names'
import { getArmorModifiers } from '../modifiers'
import { getArmorDescription } from '../descriptions'

export const RandomArmor = (rarity: ItemRarity, subType: ItemSubType, level: number = 100, specialized: boolean = false) => {
    const stats = new ItemStats(getArmorStats(rarity, subType))
    const modifiers = getArmorModifiers(rarity, subType, specialized)
    const prefix = specialized ? ((modifiers.first() || {}).name || '').split(' ')[0] : null
    const name = getArmorName(rarity, subType, prefix)
    const description = getArmorDescription(rarity, subType)
    return new Item({
        type: ItemType.Equipable,
        name,
        description,
        level,
        subType,
        rarity,
        stats,
        modifiers,
    })
}