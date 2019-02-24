import { ItemRarity, ItemWeaponType } from '../types/item'
import { Choose } from '../types/random';
import { List } from 'immutable';

export const weaponPrefixes: any = {
    [ItemRarity.Uncommon]:      [ 'Rusty', 'Hard Metal', 'Stone Forged', 'Royal', 'Trusy' ],
    [ItemRarity.Rare]:          [ 'Rare', 'Blessed', 'Magical' ],
    [ItemRarity.Masterwork]:    [ 'Masterwork', 'Legendary', 'Epic' ],
}

export const weaponTypes: any = {
    [ItemWeaponType.Greatsword]:    [ 'Greatsword', 'Zweihänder' ],
    [ItemWeaponType.Longsword]:     [ 'Longsword', 'Broadsword' ],
    [ItemWeaponType.Dagger]:        [ 'Dagger', 'Knife', 'Poignard']
}

export const getWeaponName = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    const prefix = Choose(List(weaponPrefixes[rarity]), 1).first()
    const type = Choose(List(weaponTypes[weaponType]), 1).first()
    return `${prefix} ${type}`
}