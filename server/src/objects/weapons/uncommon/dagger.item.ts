import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { SpeedUp } from '../../../objects/modifiers/speed.mod';

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Uncommon,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Dagger,
    modifiers:
        Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(1, 20)),
                StrengthUp(RandInt(1, 20)),
            ),
            1
        )
        .concat(SpeedUp(RandInt(1, 20)))
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Uncommon, ItemWeaponType.Dagger)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Uncommon, ItemWeaponType.Dagger)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Uncommon, ItemWeaponType.Dagger)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Uncommon, ItemWeaponType.Dagger)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const UncommonDagger = (level: number) => new Item({
    ...base(level),
    name: Choose(List.of(
        'Rusty Dagger',
        'Hard Metal Dagger',
        'Stone Forged Dagger',
        'Royal Dagger',
        'Eternal Dagger',
    ), 1).first(),
    description: 'Dagger made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})