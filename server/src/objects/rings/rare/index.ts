import { Choose, RandInt } from '../../../types/random'
import { List } from 'immutable'
import { Item, ItemRarity, ItemType, ItemSubType } from '../../../types/item'
import { ArmorUp } from '../../modifiers/armor.mod'
import { SpeedUp } from '../../modifiers/speed.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { PoisonResistanceUp } from '../../modifiers/status.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { Modifier } from '../../../types/modifier'
import { ItemStats } from '../../../types/item/item.stats'
import { getArmorValue } from '../../stats'
import { SpecialUp } from '../../modifiers/special.mod';

export const RareRing = (level: number) => (Choose(List.of(
    GoldRing(level),
    StrengthRing(level),
    SpecialRing(level),
    SpeedRing(level),
), 1)).first()

export const GoldRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Rare, ItemSubType.Ring)
    return new Item({
        name: 'Gold Ring',
        description: 'A strange, sold ring.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(level, level + 50),
        }),
        modifiers: Choose(List.of<Modifier>(
            ArmorUp(RandInt(1, 20)),
            SpeedUp(RandInt(1, 20)),
            HealthUp(RandInt(1, 20)),
            StrengthUp(RandInt(1, 20)),
            WeaponPowerUp(RandInt(1, 20)),
            PoisonResistanceUp(RandInt(1, 20)),
        ), 2)
    })
}

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
            armor: RandInt(level, level + 20),
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
            armor: RandInt(level, level + 20),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpecialUp(RandInt(1, 35)),
        ), 1)
    })
}


export const SpeedRing = (level: number) => {
    return new Item({
        name: 'Speed Ring',
        description: 'A gold ring, that gives you increased speed.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Rare,
        stats: new ItemStats({
            armor: RandInt(level, level + 20),
        }),
        modifiers: Choose(List.of<Modifier>(
            SpeedUp(RandInt(1, 35)),
        ), 1)
    })
}