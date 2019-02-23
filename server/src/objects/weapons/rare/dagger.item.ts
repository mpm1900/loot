import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { SpeedUp } from '../../../objects/modifiers/speed.mod'
import { HealthUp } from '../../../objects/modifiers/health.mod'
import { WeaponPowerUp } from '../../../objects/modifiers/weapon.mod'
import { SpecialUp } from '../../../objects/modifiers/special.mod'
import { PoisonResistanceUp } from '../../../objects/modifiers/status.mod'

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Dagger,
    modifiers:
        Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(5, 20)),
                StrengthUp(RandInt(5, 20)),
                HealthUp(RandInt(5, 20)),
                WeaponPowerUp(RandInt(5, 20)),
                SpecialUp(RandInt(5, 20)),
                PoisonResistanceUp(RandInt(5, 20)),
                SpeedUp(RandInt(5, 20))
            ),
            2
        )
        .concat(SpeedUp(RandInt(1, 20)))
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Rare, ItemWeaponType.Dagger)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Rare, ItemWeaponType.Dagger)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Rare, ItemWeaponType.Dagger)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Rare, ItemWeaponType.Dagger)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const RareDagger = (level: number) => new Item({
    ...base(level),
    name: 'Rare Dagger',
    description: 'Dagger made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})