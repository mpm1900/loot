import { List } from 'immutable'
import { Choose, RandInt, RandFloat } from '../../../types/random'
import { Item, ItemRarity, ItemType, ItemSubType, iItem, ItemWeaponType } from '../../../types/item'
import { ItemStats } from '../../../types/item/item.stats'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement } from '../../../types/element'
import { getWeaponPower, getWeaponAccuracy, getWeaponAffinity, getWeaponCriticalRatio } from '../../../objects/stats'
import { getModifiers } from '../../../objects/modifiers'
import { getWeaponName } from '../../../objects/names'


const base = (level: number): iItem => ({
    image: '-- IMAGE URL --',
    rarity: ItemRarity.Masterwork,
    level,
    type: ItemType.Equipable,
    subType: ItemSubType.Weapon,
    weaponType: ItemWeaponType.Greatsword,
    elements: Choose(
        List.of(FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement).map(f => f(RandInt(5, 40))),
        RandInt(0, 3)
    ),
    modifiers: getModifiers(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
})

const baseStats = (level: number) => {
    const powerRange: [number, number] = getWeaponPower(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
    const accuracyRange: [number, number] = getWeaponAccuracy(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
    const affinityRange: [number, number] = getWeaponAffinity(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
    const criticalRatioRange: [number, number] = getWeaponCriticalRatio(ItemRarity.Masterwork, ItemWeaponType.Greatsword)
    return {
        power: RandInt(...powerRange),
        accuracy: RandFloat(...accuracyRange),
        affinity: RandFloat(...affinityRange),
        criticalRatio: RandFloat(...criticalRatioRange)
    }
}

export const MasterworkGreatword = (level: number) => new Item({
    ...base(level),
    name: getWeaponName(ItemRarity.Masterwork, ItemWeaponType.Greatsword),
    description: 'A brute sword, crafted by a master blacksmith',
    stats: new ItemStats({
        ...baseStats(level),
    }),
})