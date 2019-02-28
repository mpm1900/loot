import { Choose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { StrengthUp } from '../../modifiers/strength.mod'
import { Modifier } from '../../../types/modifier'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorValue } from '../../stats'
import { SpecialUp } from '../../modifiers/special.mod'
import { RandomArmor } from '../../../objects/armor'

export const UncommonRing = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Uncommon, ItemSubType.Ring, level),
    StrengthRing(level),
    SpecialRing(level),
), 1)).first()

export const StrengthRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Ring)
    return new Item({
        name: 'Strength Ring',
        description: 'A silver ring, that gives you strength.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Uncommon,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            StrengthUp(RandInt(1, 15)),
        ), 1)
    })
}

export const SpecialRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Ring)
    return new Item({
        name: 'Special Ring',
        description: 'A silver ring, that gives you magical energy.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Uncommon,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpecialUp(RandInt(1, 15)),
        ), 1)
    })
}