import { ItemRarity, ItemWeaponType, ItemSubType } from '../types/item'
import { Choose } from '../types/random'
import { List } from 'immutable'

export const weaponDescriptions: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ '' ],
        [ItemWeaponType.Longsword]:     [ '' ],
        [ItemWeaponType.Dagger]:        [ '' ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ '' ],
        [ItemWeaponType.Longsword]:     [ '' ],
        [ItemWeaponType.Dagger]:        [ '' ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ '' ],
        [ItemWeaponType.Longsword]:     [ '' ],
        [ItemWeaponType.Dagger]:        [ '' ],
    },
    [ItemRarity.Unique]: {
        [ItemWeaponType.Greatsword]:    [ '' ],
        [ItemWeaponType.Longsword]:     [ '' ],
        [ItemWeaponType.Dagger]:        [ '' ],
    },
}

export const armorDescriptions: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [ 'Just basic charm.' ],
        [ItemSubType.Ring]:     [ 'Just a basic ring.', 'A strange, silver ring.' ],
        [ItemSubType.Head]:     [],
        [ItemSubType.Body]:     [ 'Just some basic armor.' ],
        [ItemSubType.Footwear]: [1, 1],
        [ItemSubType.Gloves]:   [1, 1],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ 'A rare charm.' ],
        [ItemSubType.Ring]:     [ 'A rare ring.', 'A strange, gold ring.'],
        [ItemSubType.Head]:     [2, 2],
        [ItemSubType.Body]:     [ 'Armor pulsing with energy.' ],
        [ItemSubType.Footwear]: [2, 2],
        [ItemSubType.Gloves]:   [2, 2],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ 'A masterfully made charm.' ],
        [ItemSubType.Ring]:     [ 'A fine ring crafted by master jewler.', 'A powerful ring flowing with energy.'],
        [ItemSubType.Head]:     [3, 5],
        [ItemSubType.Body]:     [ 'A piece of masterfully made armor.' ],
        [ItemSubType.Footwear]: [3, 5],
        [ItemSubType.Gloves]:   [3, 5],
    },
}

export const getWeaponDescription = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    return Choose(List(weaponDescriptions[rarity][weaponType]), 1).first()
}

export const getArmorDescription = (rarity: ItemRarity, subType: ItemSubType) => {
    return Choose(List(armorDescriptions[rarity][subType]), 1).first()
}