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
    weaponType: ItemWeaponType.Greatsword,
    modifiers: RangeFuncChoose(5, 20, SpeedDown, 1)
})

const baseStats = (level) => ({
    power: RandInt(level+5, level+25),
    range: 2,
    accuracy: RandFloat(0.7, 0.85),
    affinity: RandFloat(0, 0.3),
    criticalRatio: RandFloat(1, 2.5)
})

export const RustyGreatword = (level) => new Item({
    ...base(level),
    name: 'Rusty Greatsword',
    description: 'Just a big ol rusty sword',
    stats: new ItemStats({
        ...baseStats(level),
        power: level,
        accuracy: RandFloat(0.7, 0.85),
        affinity: 0,
        criticalRatio: 1
    }),
})

export const HardMetalGreatword = (level) => new Item({
    ...base(level),
    name: 'Hard Metal Greatsword',
    description: 'Could be used to hunt some monsters',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const StoneForgedGreatword = (level) => new Item({
    ...base(level),
    name: 'Stone Forged Greatsword',
    description: 'Greatsword forged in a hot flame.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const RoyalGreatword = (level) => new Item({
    ...base(level),
    name: 'Royal Greatsword',
    description: 'Greatsword used by the Kings guard.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const EternalGreatword = (level) => new Item({
    ...base(level),
    name: 'Eternal Greatsword',
    description: 'Greatsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})

export const CommonGreatsword = (level) => {
    if (level <= 10) return RustyGreatword(level)
    if (level <= 20) return HardMetalGreatword(level)
    if (level <= 30) return StoneForgedGreatword(level)
    if (level <= 40) return RoyalGreatword(level)
    if (level >= 41) return EternalGreatword(level)
}