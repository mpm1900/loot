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
import { SpecialUp } from '../../modifiers/special.mod'


export const MasterworkRing = (level: number) => (Choose(List.of(
    _MasterworkRing(level),
    StrengthRing(level),
    SpecialRing(level)
), 1)).first()

export const _MasterworkRing = (level: number) => new Item({
    name: 'Masterwork Ring',
    description: 'A fine ring crafted by master jewler.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Masterwork,
    stats: new ItemStats({
        armor: RandInt(level, level + 70),
    }),
    modifiers: Choose(List.of<Modifier>(
        ArmorUp(RandInt(1, 40)),
        SpeedUp(RandInt(1, 40)),
        HealthUp(RandInt(1, 40)),
        StrengthUp(RandInt(1, 40)),
        SpecialUp(RandInt(1, 40)),
        WeaponPowerUp(RandInt(1, 40)),
        PoisonResistanceUp(RandInt(1, 40)),
    ), 3)
})

export const StrengthRing = (level: number) => new Item({
    name: 'Strength Ring',
    description: 'A powerful ring flowing with strength.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Masterwork,
    stats: new ItemStats({
        armor: RandInt(level, level + 60),
    }),
    modifiers: Choose(List.of<Modifier>(
        StrengthUp(RandInt(1, 75)),
    ), 1)
})

export const SpecialRing = (level: number) => new Item({
    name: 'Special Ring',
    description: 'A powerful ring flowing with strength.',
    image: '-- IMAGE URL --',
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Ring,
    rarity: ItemRarity.Masterwork,
    stats: new ItemStats({
        armor: RandInt(level, level + 60),
    }),
    modifiers: Choose(List.of<Modifier>(
        SpecialUp(RandInt(1, 75)),
    ), 1)
})