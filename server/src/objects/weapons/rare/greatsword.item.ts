import { RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats, iItemStats } from '../../../types/item/item.stats'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'

const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Rare,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Greatsword,
    modifiers: getModifiers(ItemRarity.Rare, ItemWeaponType.Greatsword),
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

export const RareGreatsword = (level: number): Item => new Item({
    ...base(level),
    name: getWeaponName(ItemRarity.Rare, ItemWeaponType.Greatsword),
    description: 'Greatsword made from another plane.',
    stats: new ItemStats({ ...baseStats(level) }),
})