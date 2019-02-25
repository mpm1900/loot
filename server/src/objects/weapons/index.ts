import { UniqueWeapon } from './unique'
import { BlackMarketWeapon } from './blackmarket'
import { ItemRarity, getRarity, ItemWeaponType, Item, ItemType, ItemSubType } from '../../types/item'
import { getWeaponStats } from '../stats'
import { getWeaponElements } from '../elements'
import { getWeaponName } from '../names'
import { getWeaponModifiers } from '../modifiers'
import { ItemStats } from '../../types/item/item.stats'
import { getWeaponDescription } from '../descriptions'
import { Choose } from '../../types/random'
import { List } from 'immutable'

export const RandomWeapon = (level: number, rarity: ItemRarity, weaponType: ItemWeaponType) => {
    const stats = new ItemStats(getWeaponStats(rarity, weaponType))
    const elements = getWeaponElements(rarity, weaponType)
    const name = getWeaponName(rarity, weaponType, elements)
    const description = getWeaponDescription(rarity, weaponType)
    const modifiers = getWeaponModifiers(rarity, weaponType)
    return new Item({
        type: ItemType.Equipable,
        subType: ItemSubType.Weapon,
        rarity,
        level,
        weaponType,
        elements,
        modifiers,
        name,
        description,
        stats,
    })
}
export const WeaponTypes = [ItemWeaponType.Greatsword, ItemWeaponType.Longsword, ItemWeaponType.Dagger]
const randomWeaponType = () => Choose(List(WeaponTypes), 1).first()
export const Weapon = (level: number) => {
    let rarity;
    let returnValue;
    while (returnValue == null) {
        rarity = getRarity();
        if (rarity === ItemRarity.Uncommon) returnValue =  RandomWeapon(level, rarity, randomWeaponType())
        if (rarity === ItemRarity.Rare) returnValue = RandomWeapon(level, rarity, randomWeaponType())
        if (rarity === ItemRarity.Masterwork) returnValue = RandomWeapon(level, rarity, randomWeaponType())
        if (rarity === ItemRarity.Unique) returnValue = UniqueWeapon(level)
        if (rarity === ItemRarity.BlackMarket) returnValue = BlackMarketWeapon(level)
    }
    return returnValue;
}

