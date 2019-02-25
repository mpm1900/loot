import { ItemRarity, ItemWeaponType } from '../types/item'
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

export const getWeaponDescription = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    return Choose(List(weaponDescriptions[rarity][weaponType]), 1).first()
}