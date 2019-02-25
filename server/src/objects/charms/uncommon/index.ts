import { Choose, RangeFuncChoose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorValue } from '../../stats'
import { getArmorModifiers } from '../../../objects/modifiers'

export const UncommonCharm = (level: number) => (Choose(List([
    _UncommonCharm(level),
]), 1)).first()

export const _UncommonCharm = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Charm)
    return new Item({
        name: Choose(List.of('Uncommon Charm', 'Broken Charm', 'Fading Charm'), 1).first(),
        description: 'Just a less basic charm',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Charm,
        rarity: ItemRarity.Uncommon,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: getArmorModifiers(ItemRarity.Uncommon, ItemSubType.Charm)
    })
}