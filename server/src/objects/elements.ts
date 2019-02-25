import { List } from 'immutable'
import { FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement, Element } from '../types/element'
import { ItemRarity, ItemWeaponType } from '../types/item'
import { Choose, RandInt } from '../types/random'

const elements = List.of(FireElement, WaterElement, ThunderElement, DragonElement, LightElement, DarkElement)
export const weaponRarityCountRanges: any = {
    [ItemRarity.Uncommon]:      [0, 0],
    [ItemRarity.Rare]:          [0, 0],
    [ItemRarity.Masterwork]:    [0, 3],
    [ItemRarity.Unique]:        [1, 3],
}
export const weaponRarityAmountRanges: any = {
    [ItemRarity.Uncommon]:      [0, 0],
    [ItemRarity.Rare]:          [0, 0],
    [ItemRarity.Masterwork]:    [5, 40],
    [ItemRarity.Unique]:        [10, 80],
}

export const getWeaponElements = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    return Choose(
        elements.map((e: any) => e(RandInt(...weaponRarityAmountRanges[rarity] as [number, number]))),
        RandInt(...weaponRarityCountRanges[rarity] as [number, number])
    ).sort((a: Element, b: Element) => {
        return b.power - a.power
    })
}