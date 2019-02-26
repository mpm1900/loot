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
        [ItemSubType.Charm]:    [ 'Just a basic charm.' ],
        [ItemSubType.Ring]:     [ 'Just a basic ring.', 'A strange, silver ring.' ],
        [ItemSubType.Head]:     [ 'Just a basic helmet.' ],
        [ItemSubType.Body]:     [ 'Just some basic armor.' ],
        [ItemSubType.Footwear]: [ 'Just some basic boots.'],
        [ItemSubType.Gloves]:   [ 'Just some basic gloves.' ],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ 'A rare charm.', 'A strange, gold charm' ],
        [ItemSubType.Ring]:     [ 'A rare ring.', 'A strange, gold ring.'],
        [ItemSubType.Head]:     [ 'A rare helmet.', 'A helmet pulsing with energy.' ],
        [ItemSubType.Body]:     [ 'A rare chest plate.', 'Armor pulsing with energy.' ],
        [ItemSubType.Footwear]: [ 'A rare set of boots.', 'Boots pulsing with energy.' ],
        [ItemSubType.Gloves]:   [ 'A rare set of gloves.', 'Gloves plusing with energy.' ],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ 'A masterfully made charm.' ],
        [ItemSubType.Ring]:     [ 'A fine ring crafted by master jewler.', 'A powerful ring flowing with energy.'],
        [ItemSubType.Head]:     [ 'A masterfully made helmet.' ],
        [ItemSubType.Body]:     [ 'A piece of masterfully made armor.' ],
        [ItemSubType.Footwear]: [ 'Masterfully made greaves'],
        [ItemSubType.Gloves]:   [ 'Masterfully made gauntlets' ],
    },
}

export const getWeaponDescription = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    return Choose(List(weaponDescriptions[rarity][weaponType]), 1).first()
}

export const getArmorDescription = (rarity: ItemRarity, subType: ItemSubType) => {
    return Choose(List(armorDescriptions[rarity][subType]), 1).first()
}