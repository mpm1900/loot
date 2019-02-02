import { List } from 'immutable';
import { Choose, RandInt, RandFloat, RangeFuncChoose } from '../../../types/random';
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item';
import { ItemStats } from '../../../types/item/item.stats';
import { Modifier } from '../../../types/modifier';
import { ArmorUp } from '../../modifiers/armor.mod';
import { StrengthUp } from '../../modifiers/strength.mod';
import { HealthUp } from '../../modifiers/health.mod';
import { WeaponPowerUp } from '../../modifiers/weapon.mod';
import { SpeedUp, SpeedDown } from '../../modifiers/speed.mod';
import { PoisonResistanceUp } from '../../modifiers/status.mod'

const base = (level): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Common,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    modifiers: List<Modifier>()
})

const baseStats = (level) => ({
    power: RandInt(level, level + 10),
    range: 1.5,
    accuracy: RandFloat(0.8, 0.95),
    affinity: RandFloat(0, 0.4),
    criticalRatio: RandFloat(1, 1.5)
})

export const RustyLongsword = (level) => new Item({
    ...base(level),
    name: 'Rusty Longsword',
    description: 'An old, forgotten sword',
    stats: new ItemStats({
        ...baseStats(level),
        affinity: 0,
        criticalRatio: 1
    }),
})

export const HardMetalLongsword = (level) => new Item({
    ...base(level),
    name: 'Hard Metal Longsword',
    description: 'Could be used for a grand adventure.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const StoneForgedLongsword = (level) => new Item({
    ...base(level),
    name: 'Stone Forged Longsword',
    description: 'Longsword forged in a hot flame.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const RoyalLongsword = (level) => new Item({
    ...base(level),
    name: 'Royal Longsword',
    description: 'Longsword used by the Kings guard.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const EternalLongsword = (level) => new Item({
    ...base(level),
    name: 'Eternal Longsword',
    description: 'Longsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const CommonLongsword = (level) => {
    if (level <= 10) return RustyLongsword(level)
    if (level <= 20) return HardMetalLongsword(level)
    if (level <= 30) return StoneForgedLongsword(level)
    if (level <= 40) return RoyalLongsword(level)
    if (level >= 41) return EternalLongsword(level)
}