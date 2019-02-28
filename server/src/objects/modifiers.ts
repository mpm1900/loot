import { List } from 'immutable'
import { ItemRarity, ItemWeaponType, ItemSubType } from '../types/item'
import { ArmorUp } from './modifiers/armor.mod'
import { StrengthUp } from './modifiers/strength.mod'
import { SpeedDown, SpeedUp } from './modifiers/speed.mod'
import { Choose, RandInt } from '../types/random'
import { WeaponPowerUp } from './modifiers/weapon.mod'
import { HealthUp } from './modifiers/health.mod'
import { SpecialUp } from './modifiers/special.mod'

export const randomWeaponModifiers: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp, SpeedUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp ],
        [ItemWeaponType.Longsword]:     [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp, SpeedUp ],
        [ItemWeaponType.Dagger]:        [ ArmorUp, StrengthUp, WeaponPowerUp, HealthUp, SpecialUp ],
    }
}
export const randomWeaponRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ [1, 20], [1, 20] ],
        [ItemWeaponType.Longsword]:     [ [1, 20], [1, 20] ],
        [ItemWeaponType.Dagger]:        [ [1, 20], [1, 20] ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20], [5, 20], [5, 20], [5, 20] ],
        [ItemWeaponType.Longsword]:     [ [5, 20], [5, 20], [5, 20], [5, 20], [5, 20], [5, 20] ],
        [ItemWeaponType.Dagger]:        [ [5, 20], [5, 20], [5, 20], [5, 20], [5, 20] ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ [10, 40], [10, 40], [10, 40], [10, 40] ],
        [ItemWeaponType.Longsword]:     [ [10, 40], [10, 40], [10, 40], [10, 40], [10, 40], [10, 40] ],
        [ItemWeaponType.Dagger]:        [ [10, 40], [10, 40], [10, 40], [10, 40], [10, 40] ],
    },
}
export const randomWeaponCountRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [1, 1],
        [ItemWeaponType.Longsword]:     [1, 1],
        [ItemWeaponType.Dagger]:        [1, 1],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [2, 2],
        [ItemWeaponType.Longsword]:     [2, 2],
        [ItemWeaponType.Dagger]:        [2, 2],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [3, 4],
        [ItemWeaponType.Longsword]:     [3, 5],
        [ItemWeaponType.Dagger]:        [3, 5],
    },
}
export const staticWeaponModifers: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ SpeedDown ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ SpeedUp ],
    },
}
export const staticWeaponRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20] ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ [5, 20] ],
    },
    [ItemRarity.Rare]: {
        [ItemWeaponType.Greatsword]:    [ [5, 20] ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ [5, 20] ],
    },
    [ItemRarity.Masterwork]: {
        [ItemWeaponType.Greatsword]:    [ [5, 40] ],
        [ItemWeaponType.Longsword]:     [],
        [ItemWeaponType.Dagger]:        [ [5, 40] ],
    },
}

export const randomArmorModifiers: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Ring]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Head]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Body]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Footwear]: [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Gloves]:   [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp ],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Ring]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Head]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Body]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Footwear]: [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Gloves]:   [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Ring]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Head]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Body]:     [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Footwear]: [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
        [ItemSubType.Gloves]:   [ ArmorUp, SpeedUp, HealthUp, StrengthUp, SpecialUp, WeaponPowerUp ],
    },
}
export const randomArmorRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Ring]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Head]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Body]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Footwear]: [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Gloves]:   [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Ring]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Head]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Body]:     [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Footwear]: [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
        [ItemSubType.Gloves]:   [ [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20] ],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
        [ItemSubType.Ring]:     [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
        [ItemSubType.Head]:     [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
        [ItemSubType.Body]:     [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
        [ItemSubType.Footwear]: [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
        [ItemSubType.Gloves]:   [ [5, 40], [5, 40], [5, 40], [5, 40], [5, 40], [5, 40] ],
    },
}
export const randomArmorCountRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [1, 1],
        [ItemSubType.Ring]:     [1, 1],
        [ItemSubType.Head]:     [1, 1],
        [ItemSubType.Body]:     [1, 1],
        [ItemSubType.Footwear]: [1, 1],
        [ItemSubType.Gloves]:   [1, 1],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [2, 2],
        [ItemSubType.Ring]:     [2, 2],
        [ItemSubType.Head]:     [2, 2],
        [ItemSubType.Body]:     [2, 2],
        [ItemSubType.Footwear]: [2, 2],
        [ItemSubType.Gloves]:   [2, 2],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [3, 5],
        [ItemSubType.Ring]:     [3, 5],
        [ItemSubType.Head]:     [3, 5],
        [ItemSubType.Body]:     [3, 5],
        [ItemSubType.Footwear]: [3, 5],
        [ItemSubType.Gloves]:   [3, 5],
    },
}
export const specializedArmorModifiers: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Ring]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Head]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Body]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Footwear]: [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Gloves]:   [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Ring]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Head]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Body]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Footwear]: [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Gloves]:   [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Ring]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Head]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Body]:     [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Footwear]: [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
        [ItemSubType.Gloves]:   [ SpeedUp, HealthUp, StrengthUp, SpecialUp ],
    },
}
export const specializedArmorRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [5, 25],
        [ItemSubType.Ring]:     [5, 25],
        [ItemSubType.Head]:     [5, 25],
        [ItemSubType.Body]:     [5, 25],
        [ItemSubType.Footwear]: [5, 25],
        [ItemSubType.Gloves]:   [5, 25],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [5, 35],
        [ItemSubType.Ring]:     [5, 35],
        [ItemSubType.Head]:     [5, 35],
        [ItemSubType.Body]:     [5, 35],
        [ItemSubType.Footwear]: [5, 35],
        [ItemSubType.Gloves]:   [5, 35],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [5, 75],
        [ItemSubType.Ring]:     [5, 75],
        [ItemSubType.Head]:     [5, 75],
        [ItemSubType.Body]:     [5, 75],
        [ItemSubType.Footwear]: [5, 75],
        [ItemSubType.Gloves]:   [5, 75],
    },
}
export const specializedArmorCountRanges: any = {
    [ItemRarity.Uncommon]: {
        [ItemSubType.Charm]:    [1, 1],
        [ItemSubType.Ring]:     [1, 1],
        [ItemSubType.Head]:     [1, 1],
        [ItemSubType.Body]:     [1, 1],
        [ItemSubType.Footwear]: [1, 1],
        [ItemSubType.Gloves]:   [1, 1],
    },
    [ItemRarity.Rare]: {
        [ItemSubType.Charm]:    [1, 1],
        [ItemSubType.Ring]:     [1, 1],
        [ItemSubType.Head]:     [1, 1],
        [ItemSubType.Body]:     [1, 1],
        [ItemSubType.Footwear]: [1, 1],
        [ItemSubType.Gloves]:   [1, 1],
    },
    [ItemRarity.Masterwork]: {
        [ItemSubType.Charm]:    [1, 1],
        [ItemSubType.Ring]:     [1, 1],
        [ItemSubType.Head]:     [1, 1],
        [ItemSubType.Body]:     [1, 1],
        [ItemSubType.Footwear]: [1, 1],
        [ItemSubType.Gloves]:   [1, 1],
    },
}

export const getWeaponModifiers = (rarity: ItemRarity, weaponType: ItemWeaponType) => {
    const randomModifiers = Choose(
        List(randomWeaponModifiers[rarity][weaponType].map((f: Function, i: number) => (
            f(RandInt(...(randomWeaponRanges[rarity][weaponType][i] as [number, number])))
        ))),
        RandInt(...randomWeaponCountRanges[rarity][weaponType] as [number, number])
    )
    const staticModifiers = List(staticWeaponModifers[rarity][weaponType].map((f: any, i: number) => (
        f(RandInt(...(staticWeaponRanges[rarity][weaponType][i] as [number, number])))
    )))
    return randomModifiers.concat(staticModifiers)
}

export const getArmorModifiers = (rarity: ItemRarity, subType: ItemSubType, specialized: boolean = false) => {
    const mods = specialized ? specializedArmorModifiers : randomArmorModifiers
    const ranges = specialized ? specializedArmorRanges : randomArmorRanges
    const countRanges = specialized ? specializedArmorCountRanges : randomArmorCountRanges
    const randomModifiers = Choose(
        List(mods[rarity][subType].map((f: Function, i: number) => (
            f(RandInt(...((specialized ? ranges[rarity][subType] : ranges[rarity][subType][i]) as [number, number])))
        ))),
        RandInt(...countRanges[rarity][subType] as [number, number])
    )
    return randomModifiers
}