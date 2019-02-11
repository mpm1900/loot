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

export const UncommonRing = (level: number) => (Choose(List.of(
    SilverRing(level),
    StrengthRing(level),
), 1)).first()

export const SilverRing = (level: number) => {
    const armorRange = getArmorValue(ItemRarity.Uncommon, ItemSubType.Ring)
    return new Item({
        name: 'Silver Ring',
        description: 'A strange, silver ring.',
        image: '-- IMAGE URL --',
        level,
        type: ItemType.Equipable,
        subType: ItemSubType.Ring,
        rarity: ItemRarity.Uncommon,
        stats: new ItemStats({
            armor: RandInt(armorRange[0], armorRange[1]),
        }),
        modifiers: Choose(List.of<Modifier>(
            ArmorUp(RandInt(1, 10)),
            SpeedUp(RandInt(1, 10)),
            HealthUp(RandInt(1, 10)),
            StrengthUp(RandInt(1, 10)),
            WeaponPowerUp(RandInt(1, 10)),
            PoisonResistanceUp(RandInt(1, 10)),
        ), 2)
    })
}

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