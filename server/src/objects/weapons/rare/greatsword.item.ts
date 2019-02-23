import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { HealthUp } from '../../modifiers/health.mod'
import { WeaponPowerUp } from '../../modifiers/weapon.mod'
import { SpeedDown } from '../../modifiers/speed.mod'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'

const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Greatsword,
    modifiers: Choose(
        List.of<Modifier>(
            ArmorUp(RandInt(5, 20)),
            StrengthUp(RandInt(5, 20)),
            WeaponPowerUp(RandInt(5, 20)),
            HealthUp(RandInt(5, 20)),
        ),
        2
    )
    .concat(SpeedDown(RandInt(5, 20)))
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Rare, ItemWeaponType.Greatsword)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Rare, ItemWeaponType.Greatsword)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Rare, ItemWeaponType.Greatsword)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Rare, ItemWeaponType.Greatsword)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const RareGreatsword = (level: number) => new Item({
    ...base(level),
    name: Choose(List.of(
        'Rusty Greatsword',
        'Hard Metal Greatsword',
        'Stone Forged Greatsword',
        'Royal Greatsword',
        'Eternal Greatsword',
    ), 1).first(),
    description: 'Greatsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})