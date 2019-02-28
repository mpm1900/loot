import { Choose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { SpeedUp } from '../../modifiers/speed.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { Modifier } from '../../../types/modifier'
import { ItemStats } from '../../../types/item/item.stats'
import { SpecialUp } from '../../modifiers/special.mod'
import { getArmorValue } from '../../stats'
import { RandomArmor } from '../../../objects/armor'

export const MasterworkRing = (level: number) => (Choose(List.of(
    RandomArmor(ItemRarity.Masterwork, ItemSubType.Ring, level),
    StrengthRing(level),
    SpecialRing(level),
    SpeedRing(level),
), 1)).first()

export const StrengthRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Masterwork, ItemSubType.Ring)
    return new Item({
        name: 'Strength Ring',
        description: 'A powerful ring flowing with strength.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Masterwork,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            StrengthUp(RandInt(1, 75)),
        ), 1)
    })
}

export const SpecialRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Masterwork, ItemSubType.Ring)
    return new Item({
        name: 'Special Ring',
        description: 'A powerful ring flowing with magical energy.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Masterwork,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpecialUp(RandInt(1, 75)),
        ), 1)
    })
}

export const SpeedRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Masterwork, ItemSubType.Ring)
    return new Item({
        name: 'Special Ring',
        description: 'A powerful ring flowing with increased speed.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Masterwork,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpeedUp(RandInt(1, 75)),
        ), 1)
    })
}