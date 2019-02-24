import { RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { getWeaponAccuracy, getWeaponPower, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'

const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    modifiers: getModifiers(ItemRarity.Rare, ItemWeaponType.Longsword)
})

const baseStats = (level: number): iItemStats => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Rare, ItemWeaponType.Longsword)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Rare, ItemWeaponType.Longsword)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Rare, ItemWeaponType.Longsword)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Rare, ItemWeaponType.Longsword)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const RareLongsword = (level: number): Item => new Item({
    ...base(level),
    name: getWeaponName(ItemRarity.Rare, ItemWeaponType.Longsword),
    description: 'A long sword, ready for battle, crafted by a master blacksmith',
    stats: new ItemStats({
        ...baseStats(level),
    }),
})