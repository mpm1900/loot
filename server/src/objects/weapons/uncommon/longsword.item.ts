import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Uncommon,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    modifiers:
        Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(1, 20)),
                StrengthUp(RandInt(1, 20)),
            ),
            1
        )
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Uncommon, ItemWeaponType.Longsword)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Uncommon, ItemWeaponType.Longsword)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Uncommon, ItemWeaponType.Longsword)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Uncommon, ItemWeaponType.Longsword)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const UncommonLongsword = (level: number) => new Item({
    ...base(level),
    name: Choose(List.of(
        'Rusty Longsword',
        'Hard Metal Longsword',
        'Stone Forged Longsword',
        'Royal Longsword',
        'Eternal Longsword',
    ), 1).first(),
    description: 'Longsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})