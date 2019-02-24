import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement } from '../../../types/element'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'

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
    modifiers: getModifiers(ItemRarity.Masterwork, ItemWeaponType.Dagger)
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
    name: getWeaponName(ItemRarity.Masterwork, ItemWeaponType.Dagger),
    description: 'Dagger made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})