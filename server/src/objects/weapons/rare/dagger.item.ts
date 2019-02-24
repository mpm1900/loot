import { RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Dagger,
    modifiers: getModifiers(ItemRarity.Rare, ItemWeaponType.Dagger)
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
    name: getWeaponName(ItemRarity.Rare, ItemWeaponType.Dagger),
    description: 'Dagger made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})