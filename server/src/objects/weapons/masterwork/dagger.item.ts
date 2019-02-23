import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { Modifier } from '../../../types/modifier'
import { ArmorUp } from '../../modifiers/armor.mod'
import { StrengthUp } from '../../modifiers/strength.mod'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement } from '../../../types/element'
import { SpeedUp } from '../../../objects/modifiers/speed.mod'
import { HealthUp } from '../../../objects/modifiers/health.mod'
import { WeaponPowerUp } from '../../../objects/modifiers/weapon.mod'
import { SpecialUp } from '../../../objects/modifiers/special.mod'
import { PoisonResistanceUp } from '../../../objects/modifiers/status.mod'

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Masterwork,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Dagger,
    elements: Choose(
        List.of(FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement).map(f => f(RandInt(5, 40))),
        RandInt(0, 3)
    ),
    modifiers:
        Choose(
            List.of<Modifier>(
                ArmorUp(RandInt(5, 40)),
                StrengthUp(RandInt(5, 40)),
                HealthUp(RandInt(5, 40)),
                WeaponPowerUp(RandInt(5, 40)),
                SpecialUp(RandInt(5, 40)),
                PoisonResistanceUp(RandInt(5, 40)),
                SpeedUp(RandInt(5, 40))
            ),
            RandInt(3, 5)
        )
        .concat(SpeedUp(RandInt(1, 40)))
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Masterwork, ItemWeaponType.Dagger)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Masterwork, ItemWeaponType.Dagger)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Masterwork, ItemWeaponType.Dagger)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Masterwork, ItemWeaponType.Dagger)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const MasterworkDagger = (level: number) => new Item({
    ...base(level),
    name: 'Masterwork Dagger',
    description: 'Dagger made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})