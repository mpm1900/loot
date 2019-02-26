import { ItemRarity, ItemSubType, Item, ItemType } from '../../types/item'
import { ItemStats } from '../../types/item/item.stats'
import { getArmorStats } from '../stats'
import { getArmorName } from '../names'
import { getArmorModifiers } from '../modifiers'
import { getArmorDescription } from '../descriptions'

export const RandomArmor = (rarity: ItemRarity, subType: ItemSubType, level: number = 100) => {
    const stats = new ItemStats(getArmorStats(rarity, subType))
    const name = getArmorName(rarity, subType)
    const modifiers = getArmorModifiers(rarity, subType)
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