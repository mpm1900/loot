import { RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'

const base = (level: number) => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Uncommon,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Longsword,
    modifiers: getModifiers(ItemRarity.Uncommon, ItemWeaponType.Longsword)
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
    name: getWeaponName(ItemRarity.Uncommon, ItemWeaponType.Longsword),
    description: 'Longsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})