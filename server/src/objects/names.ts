import { ItemRarity, ItemWeaponType, ItemSubType } from '../types/item'
import { Choose } from '../types/random'
import { List } from 'immutable'
import { Element } from '../types/element'

export const weaponPrefixes: any = {
    [ItemRarity.Uncommon]:      [ 'Rusty', 'Hard Metal', 'Stone Forged', 'Royal', 'Trusty' ],
    [ItemRarity.Rare]:          [ 'Rare', 'Blessed', 'Magical' ],
    [ItemRarity.Masterwork]:    [ 'Masterwork', 'Legendary', 'Epic' ],
    [ItemRarity.Unique]:        [ 'Unique' ],
}
export const weaponTypes: any = {
    [ItemWeaponType.Greatsword]:    [ 'Greatsword', 'Zweihänder' ],
    [ItemWeaponType.Longsword]:     [ 'Longsword', 'Broadsword' ],
    [ItemWeaponType.Dagger]:        [ 'Dagger', 'Knife', 'Poignard']
}

export const armorPrefixes: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [ 'Uncommon', 'Broken', 'Fading'],
        [ItemSubType.Ring]:     [ 'Uncommon', 'Iron', 'Steel' ],
        [ItemSubType.Head]:     [ 'Uncommon', 'Leather' ],
        [ItemSubType.Body]:     [ 'Uncommon', 'Leather' ],
        [ItemSubType.Footwear]: [ 'Uncommon', 'Leather' ],
        [ItemSubType.Gloves]:   [ 'Uncommon', 'Leather' ],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ 'Rare', 'Blessed', 'Magical', 'Silver' ],
        [ItemSubType.Ring]:     [ 'Rare', 'Blessed', 'Magical', 'Silver' ],
        [ItemSubType.Head]:     [ 'Rare', 'Blessed', 'Magical' ],
        [ItemSubType.Body]:     [ 'Rare', 'Blessed', 'Magical' ],
        [ItemSubType.Footwear]: [ 'Rare', 'Blessed', 'Magical' ],
        [ItemSubType.Gloves]:   [ 'Rare', 'Blessed', 'Magical' ],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ 'Masterwork', 'Epic', 'Lengendary' ],
        [ItemSubType.Ring]:     [ 'Masterwork', 'Epic', 'Lengendary' ],
        [ItemSubType.Head]:     [ 'Masterwork', 'Epic', 'Lengendary' ],
        [ItemSubType.Body]:     [ 'Masterwork', 'Epic', 'Lengendary' ],
        [ItemSubType.Footwear]: [ 'Masterwork', 'Epic', 'Lengendary' ],
        [ItemSubType.Gloves]:   [ 'Masterwork', 'Epic', 'Lengendary' ],
    },
    [ItemRarity.Unique]: {
        [ItemSubType.Charm]:    [ 'Unique' ],
        [ItemSubType.Ring]:     [ 'Unique' ],
        [ItemSubType.Head]:     [ 'Unique' ],
        [ItemSubType.Body]:     [ 'Unique' ],
        [ItemSubType.Footwear]: [ 'Unique' ],
        [ItemSubType.Gloves]:   [ 'Unique' ],
    },
}

export const armorTypes: any = {
    [ItemSubType.Charm]:    [ 'Charm', 'Pendant' ],
    [ItemSubType.Ring]:     [ 'Ring' ],
    [ItemSubType.Head]:     [ 'Helmet', 'Helm' ],
    [ItemSubType.Body]:     [ 'Armor', 'Chest Plate', 'Mail' ],
    [ItemSubType.Footwear]: [ 'Boots', 'Greaves' ],
    [ItemSubType.Gloves]:   [ 'Gloves', 'Gauntlets'],
}

export const getWeaponName = (rarity: ItemRarity, weaponType: ItemWeaponType, elements: List<Element> = List<Element>()) => {
    const prefix = Choose(List(weaponPrefixes[rarity]), 1).first()
    const type = Choose(List(weaponTypes[weaponType]), 1).first()
    if (elements.size > 0) {
        return `${prefix} ${(elements.first() as Element).type} ${type}`
    }
    return `${prefix} ${type}`
}

export const getArmorName = (rarity: ItemRarity, subType: ItemSubType, prefix: string = null, suffix: string = null) => {
    prefix = prefix || Choose(List(armorPrefixes[rarity][subType]), 1).first()
    const type = Choose(List(armorTypes[subType]), 1).first()
    if (suffix) return `${prefix} ${type} ${suffix}`
    return `${prefix} ${type}`
}