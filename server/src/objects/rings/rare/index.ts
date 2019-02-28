import { Choose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { SpeedUp } from '../../modifiers/speed.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { Modifier } from '../../../types/modifier'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorValue } from '../../stats'
import { SpecialUp } from '../../modifiers/special.mod'
import { RandomArmor } from '../../../objects/armor'

export const RareRing = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Rare, ItemSubType.Ring, level),
    StrengthRing(level),
    SpecialRing(level),
    SpeedRing(level),
), 1)).first()

export const StrengthRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Rare, ItemSubType.Ring)
    return new Item({
        name: 'Strength Ring',
        description: 'A gold ring, that gives you strength.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            StrengthUp(RandInt(1, 35)),
        ), 1)
    })
}

export const SpecialRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Rare, ItemSubType.Ring)
    return new Item({
        name: 'Special Ring',
        description: 'A gold ring, that gives you magical energy.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpecialUp(RandInt(1, 35)),
        ), 1)
    })
}


export const SpeedRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Rare, ItemSubType.Ring)
    return new Item({
        name: 'Speed Ring',
        description: 'A gold ring, that gives you increased speed.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpeedUp(RandInt(1, 35)),
        ), 1)
    })
}